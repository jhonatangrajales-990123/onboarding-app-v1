// ══════════════════════════════════════════════════════════════
//  ONBOARDING ALEGRA  |  Code.gs  — VERSIÓN 2
//  Sheet ID: 1SioQbF9ORJteTbeAqeutHq6yFT5pj7zBj5Bs8QoAFKM
//
//  Estructura del sheet:
//  A=email | B=NIT | C=userType | D-I=pasos 1-6 | J=rating
//  K=comentarios | L=país | M=fecha_registro
// ══════════════════════════════════════════════════════════════

const SHEET_ID = '1SioQbF9ORJteTbeAqeutHq6yFT5pj7zBj5Bs8QoAFKM';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Onboarding Alegra')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;

    if (data.action === 'registerOrGetUser') {
      result = registerOrGetUser(data.email, data.nit, data.userType, data.country);
    } else if (data.action === 'saveProgress') {
      result = saveProgress(data.email, data.stepNumber, data.dateISO);
    } else if (data.action === 'saveCountry') {
      result = saveCountry(data.email, data.country);
    } else if (data.action === 'saveFeedback') {
      result = saveFeedback(data.email, data.rating, data.comments);
    } else {
      result = { error: 'Acción desconocida: ' + data.action };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Registra usuario nuevo o devuelve progreso del existente ─
function registerOrGetUser(email, nit, userType, country) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();

  const emailNorm = (email || '').trim().toLowerCase();

  for (let i = 0; i < data.length; i++) {
    const rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
    if (!rowEmail) continue;

    if (rowEmail === emailNorm) {
      // Usuario ya existe → devolver su progreso
      return {
        found:    true,
        isNew:    false,
        progress: {
          step1: data[i][3] !== '',
          step2: data[i][4] !== '',
          step3: data[i][5] !== '',
          step4: data[i][6] !== '',
          step5: data[i][7] !== '',
          step6: data[i][8] !== ''
        },
        rating:   data[i][9]  || '',
        comments: data[i][10] || '',
        country:  data[i][11] || '',
        userType: data[i][2]  || ''
      };
    }
  }

  // Usuario nuevo → crear fila
  const now = Utilities.formatDate(new Date(), 'America/Bogota', 'dd/MM/yyyy HH:mm:ss');
  sheet.appendRow([
    emailNorm,      // A: email
    nit || '',      // B: NIT
    userType || '', // C: userType
    '', '', '', '', '', '', // D-I: pasos 1-6 (vacíos)
    '',             // J: rating
    '',             // K: comentarios
    country || '',  // L: país
    now,            // M: fecha_registro
  ]);

  return {
    found:    true,
    isNew:    true,
    progress: { step1: false, step2: false, step3: false, step4: false, step5: false, step6: false },
    rating:   '',
    comments: '',
    country:  country || '',
    userType: userType || ''
  };
}

// ── Guarda fecha de completado de un paso (columnas D-I) ─────
// paso 1 → col D (índice 4), paso 6 → col I (índice 9)
function saveProgress(email, stepNumber, dateISO) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();

  const formattedDate = Utilities.formatDate(
    new Date(dateISO), 'America/Bogota', 'dd/MM/yyyy HH:mm:ss'
  );

  for (let i = 0; i < data.length; i++) {
    const rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
    if (!rowEmail) continue;
    if (rowEmail === (email || '').trim().toLowerCase()) {
      sheet.getRange(i + 1, stepNumber + 3).setValue(formattedDate);
      return { success: true };
    }
  }
  return { success: false, error: 'Usuario no encontrado.' };
}

// ── Actualiza el país (columna L = 12) ───────────────────────
function saveCountry(email, country) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    const rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
    if (!rowEmail) continue;
    if (rowEmail === (email || '').trim().toLowerCase()) {
      sheet.getRange(i + 1, 12).setValue(country);
      return { success: true };
    }
  }
  return { success: false, error: 'Usuario no encontrado.' };
}

// ── Guarda calificación y comentarios (cols J=10, K=11) ──────
function saveFeedback(email, rating, comments) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) {
    const rowEmail = (data[i][0] || '').toString().trim().toLowerCase();
    if (!rowEmail) continue;
    if (rowEmail === (email || '').trim().toLowerCase()) {
      sheet.getRange(i + 1, 10).setValue(rating);
      sheet.getRange(i + 1, 11).setValue(comments);
      return { success: true };
    }
  }
  return { success: false, error: 'Usuario no encontrado.' };
}
