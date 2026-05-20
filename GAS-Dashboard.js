// ══════════════════════════════════════════════════════════════
//  ONBOARDING ALEGRA  |  Dashboard.gs
//  Pega este código en el mismo proyecto de Apps Script que ya tienes.
//  Luego ve a Extensiones → Apps Script y corre "configurarTodo()"
//  UNA SOLA VEZ para aplicar todo el formato.
// ══════════════════════════════════════════════════════════════

const TEAL      = '#30aba9';
const TEAL_DARK = '#1d8785';
const TEAL_SOFT = '#e8f7f7';
const WHITE     = '#ffffff';
const GRAY_BG   = '#f4f3ef';
const GRAY_CELL = '#f0ede8';
const GREEN     = '#16a34a';
const GREEN_SOFT= '#dcfce7';
const ORANGE    = '#d97706';
const ORANGE_S  = '#fef3c7';
const RED       = '#dc2626';
const RED_SOFT  = '#fee2e2';
const DARK_TEXT = '#1a1916';
const MUTED     = '#6b6a65';

// Nombres de los pasos (ajustar si cambian en content.js)
const STEP_NAMES = [
  'Configura tu empresa',
  'Importa contactos',
  'Activa facturación electrónica',
  'Configura productos/servicios',
  'Crea tu primera factura',
  'Listo / Cierre',
];

const COUNTRY_LABELS = {
  colombia:   '🇨🇴 Colombia',
  costarica:  '🇨🇷 Costa Rica',
  dominicana: '🇩🇴 Rep. Dominicana',
  mexico:     '🇲🇽 México',
};

// ── Menú personalizado ──────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📊 Dashboard Adopción')
    .addItem('🎨 Formatear hoja de datos', 'formatearHojaDatos')
    .addItem('📈 Actualizar dashboard', 'actualizarDashboard')
    .addSeparator()
    .addItem('⚡ Configurar todo (primera vez)', 'configurarTodo')
    .addToUi();
}

// ── Función principal: corre todo de una vez ────────────────
function configurarTodo() {
  formatearHojaDatos();
  actualizarDashboard();
  SpreadsheetApp.getUi().alert(
    '✅ Listo',
    'La hoja de datos fue formateada y el dashboard fue creado/actualizado.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

// ══════════════════════════════════════════════════════════════
//  FORMATEAR HOJA DE DATOS
// ══════════════════════════════════════════════════════════════
function formatearHojaDatos() {
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheets()[0];

  sheet.setName('📋 Datos');

  // Nueva estructura:
  // A=email B=NIT C=userType D-I=pasos1-6 J=rating K=comentarios L=país M=fecha_registro N=%avance O=estado
  const TOTAL_COLS = 15;
  if (sheet.getLastColumn() < TOTAL_COLS) sheet.insertColumnsAfter(sheet.getLastColumn(), TOTAL_COLS - sheet.getLastColumn());

  // ── Encabezados ────────────────────────────────────────────
  const headers = [
    ['Email', 'NIT / RUC', 'Tipo', 'Paso 1', 'Paso 2', 'Paso 3', 'Paso 4', 'Paso 5', 'Paso 6',
     'Calificación', 'Comentarios', 'País', 'Fecha registro', '% Avance', 'Estado'],
  ];
  const subHeaders = [
    ['', '', '', ...STEP_NAMES.slice(0, 6), '', '', '', '', '', ''],
  ];

  // Fila 1: encabezados principales
  sheet.getRange(1, 1, 1, TOTAL_COLS).setValues(headers);
  sheet.getRange(1, 1, 1, TOTAL_COLS)
    .setBackground(TEAL)
    .setFontColor(WHITE)
    .setFontWeight('bold')
    .setFontSize(11)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 36);

  // Fila 2: sub-encabezados
  sheet.getRange(2, 1, 1, TOTAL_COLS).setValues(subHeaders);
  sheet.getRange(2, 1, 1, TOTAL_COLS)
    .setBackground(TEAL_DARK)
    .setFontColor('rgba(255,255,255,0.85)')
    .setFontSize(9)
    .setItalic(true)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(2, 24);

  // Congelar las 2 primeras filas
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(1);

  // ── Anchos de columna ──────────────────────────────────────
  sheet.setColumnWidth(1, 220);  // email
  sheet.setColumnWidth(2, 120);  // NIT
  sheet.setColumnWidth(3, 90);   // tipo
  for (let c = 4; c <= 9; c++) sheet.setColumnWidth(c, 130); // pasos
  sheet.setColumnWidth(10, 100); // rating
  sheet.setColumnWidth(11, 200); // comentarios
  sheet.setColumnWidth(12, 110); // país
  sheet.setColumnWidth(13, 130); // fecha registro
  sheet.setColumnWidth(14, 80);  // % avance
  sheet.setColumnWidth(15, 100); // estado

  // ── Datos existentes (fila 3 en adelante) ─────────────────
  const dataRange = sheet.getDataRange();
  const allData   = dataRange.getValues();
  const numRows   = allData.length;

  if (numRows < 3) {
    // No hay datos aún
    _applyHeaderBorders(sheet);
    return;
  }

  // Calcular y escribir % avance (col N=14) y estado (col O=15)
  // Índices: email[0] NIT[1] tipo[2] pasos[3-8] rating[9] comentarios[10] país[11] fecha[12]
  for (let i = 2; i < numRows; i++) {
    const row   = allData[i];
    const email = (row[0] || '').toString().trim();
    if (!email) continue;

    const steps     = [row[3], row[4], row[5], row[6], row[7], row[8]];
    const completed = steps.filter(v => v !== '').length;
    const pct       = Math.round((completed / 6) * 100);
    const rating    = (row[9] || '').toString().trim();

    let estado;
    if (completed === 6 && rating) {
      estado = '✅ Completo';
    } else if (completed === 6) {
      estado = '🏁 Terminó';
    } else if (completed === 0) {
      estado = '⏳ Sin iniciar';
    } else {
      const lastDate  = _lastCompletedDate(steps);
      const daysSince = lastDate ? Math.floor((Date.now() - lastDate) / 86400000) : null;
      estado = (daysSince !== null && daysSince >= 7) ? '🔴 Estancado' : '🔵 En progreso';
    }

    sheet.getRange(i + 1, 14).setValue(pct + '%'); // col N
    sheet.getRange(i + 1, 15).setValue(estado);     // col O
  }

  // ── Formato de filas de datos ──────────────────────────────
  for (let i = 2; i < numRows; i++) {
    const row   = allData[i];
    const email = (row[0] || '').toString().trim();
    if (!email) continue;

    const rowNum = i + 1;
    const isEven = i % 2 === 0;
    const rowBg  = isEven ? WHITE : GRAY_BG;

    // Fila base (15 columnas)
    sheet.getRange(rowNum, 1, 1, 15)
      .setBackground(rowBg)
      .setFontSize(10)
      .setFontColor(DARK_TEXT)
      .setVerticalAlignment('middle');
    sheet.setRowHeight(rowNum, 30);

    // Email (col A): muted, izquierda
    sheet.getRange(rowNum, 1).setFontColor(MUTED).setHorizontalAlignment('left');

    // NIT (col B): muted, izquierda
    sheet.getRange(rowNum, 2).setFontColor(MUTED).setHorizontalAlignment('left');

    // Tipo (col C): centrado
    sheet.getRange(rowNum, 3).setHorizontalAlignment('center');

    // Pasos 1-6 (cols D-I = 4-9): verde si completado, gris si vacío
    for (let c = 4; c <= 9; c++) {
      const cell = sheet.getRange(rowNum, c);
      const val  = (row[c - 1] || '').toString().trim();
      if (val) {
        cell.setBackground(GREEN_SOFT).setFontColor(GREEN).setHorizontalAlignment('center');
      } else {
        cell.setBackground(isEven ? '#f9f8f5' : GRAY_CELL)
          .setFontColor('#ccc').setValue('—').setHorizontalAlignment('center');
      }
    }

    // Rating (col J = 10): color según valor
    const rating = (row[9] || '').toString().trim();
    const rCell  = sheet.getRange(rowNum, 10);
    rCell.setHorizontalAlignment('center');
    if (rating === 'Excelente') {
      rCell.setBackground(GREEN_SOFT).setFontColor(GREEN).setFontWeight('bold');
    } else if (rating === 'Regular') {
      rCell.setBackground(ORANGE_S).setFontColor(ORANGE).setFontWeight('bold');
    } else if (rating === 'Difícil') {
      rCell.setBackground(RED_SOFT).setFontColor(RED).setFontWeight('bold');
    } else {
      rCell.setBackground(isEven ? '#f9f8f5' : GRAY_CELL).setFontColor('#ccc').setValue('—');
    }

    // Comentarios (col K = 11): izquierda, gris si vacío
    const comments = (row[10] || '').toString().trim();
    const cCell = sheet.getRange(rowNum, 11);
    cCell.setHorizontalAlignment('left');
    if (!comments) cCell.setFontColor('#ccc').setValue('—');

    // País (col L = 12): con emoji, centrado
    const country = (row[11] || '').toString().trim();
    const pCell   = sheet.getRange(rowNum, 12);
    pCell.setHorizontalAlignment('center');
    pCell.setValue(country ? (COUNTRY_LABELS[country] || country) : '—');
    if (!country) pCell.setFontColor('#ccc');

    // Fecha registro (col M = 13): centrado
    sheet.getRange(rowNum, 13).setHorizontalAlignment('center').setFontColor(MUTED);

    // % Avance (col N = 14): color según valor
    const pctCell = sheet.getRange(rowNum, 14);
    pctCell.setHorizontalAlignment('center').setFontWeight('bold');
    const pctStr = (row[13] || '').toString();
    const pctVal = parseInt(pctStr) || 0;
    pctCell.setFontColor(pctVal === 100 ? GREEN : pctVal >= 50 ? ORANGE : RED);

    // Estado (col O = 15): centrado
    sheet.getRange(rowNum, 15).setHorizontalAlignment('center');
  }

  _applyHeaderBorders(sheet);
  SpreadsheetApp.flush();
}

function _lastCompletedDate(steps) {
  let latest = null;
  for (const v of steps) {
    if (!v) continue;
    const d = (v instanceof Date) ? v : new Date(v);
    if (!isNaN(d) && (!latest || d > latest)) latest = d;
  }
  return latest ? latest.getTime() : null;
}

function _applyHeaderBorders(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 3);
  sheet.getRange(1, 1, lastRow, 15)
    .setBorder(true, true, true, true, true, true,
      '#ddd', SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(2, 1, 1, 15)
    .setBorder(null, null, true, null, null, null,
      TEAL_DARK, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
}

// ══════════════════════════════════════════════════════════════
//  DASHBOARD DE RESUMEN
// ══════════════════════════════════════════════════════════════
function actualizarDashboard() {
  const ss        = SpreadsheetApp.openById(SHEET_ID);
  const dataSheet = ss.getSheets()[0];

  // Crear o limpiar hoja Dashboard
  let dash = ss.getSheetByName('📊 Dashboard');
  if (!dash) {
    dash = ss.insertSheet('📊 Dashboard', 1);
  } else {
    dash.clearContents();
    dash.clearFormats();
  }

  // Mover dashboard a la segunda posición
  ss.setActiveSheet(dash);
  ss.moveActiveSheet(2);

  // Recopilar datos
  const raw     = dataSheet.getDataRange().getValues();
  const rows    = raw.slice(2).filter(r => (r[0] || '').toString().trim());
  const total   = rows.length;

  if (total === 0) {
    dash.getRange(1, 1).setValue('No hay datos todavía.');
    return;
  }

  // Calcular métricas globales
  let completados = 0, sinIniciar = 0, estancados = 0, enProgreso = 0;
  const stepCounts    = [0, 0, 0, 0, 0, 0];
  const countryCounts = {};
  const ratings       = { Excelente: 0, Regular: 0, 'Difícil': 0 };
  const stuckUsers    = [];
  const recentUsers   = [];

  for (const row of rows) {
    const email    = row[0].toString().trim();
    const steps    = [row[3], row[4], row[5], row[6], row[7], row[8]]; // D-I
    const done     = steps.filter(v => v !== '').length;
    const country  = (row[11] || '').toString().trim(); // col L
    const rating   = (row[9]  || '').toString().trim(); // col J

    if (done === 6) completados++;
    else if (done === 0) sinIniciar++;
    else {
      const lastDate  = _lastCompletedDate(steps);
      const daysSince = lastDate ? Math.floor((Date.now() - lastDate) / 86400000) : 999;
      if (daysSince >= 7) {
        estancados++;
        stuckUsers.push({ email, done, daysSince, country });
      } else {
        enProgreso++;
        recentUsers.push({ email, done, country });
      }
    }

    for (let s = 0; s < 6; s++) {
      if (steps[s] !== '') stepCounts[s]++;
    }

    if (country) {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }

    if (rating && ratings[rating] !== undefined) ratings[rating]++;
  }

  const pctCompleto = Math.round((completados / total) * 100);

  // ── Escribir dashboard ─────────────────────────────────────
  let r = 1; // fila actual

  // Título principal
  _writeCell(dash, r, 1, '📊 Dashboard de Activación — Alegra', {
    bg: TEAL, fc: WHITE, bold: true, size: 16, merge: [r, 1, r, 8],
    align: 'center', height: 48,
  });
  r++;

  // Subtítulo con fecha de actualización
  const now = Utilities.formatDate(new Date(), 'America/Bogota', "dd/MM/yyyy 'a las' HH:mm");
  _writeCell(dash, r, 1, `Actualizado: ${now}  ·  ${total} usuarios en la base`, {
    bg: TEAL_DARK, fc: 'rgba(255,255,255,0.82)', size: 10, merge: [r, 1, r, 8],
    align: 'center', height: 22, italic: true,
  });
  r += 2;

  // ── Tarjetas de resumen (fila de métricas) ─────────────────
  _writeCell(dash, r, 1, '📌 Resumen general', {
    bg: WHITE, fc: DARK_TEXT, bold: true, size: 13, merge: [r, 1, r, 8],
    height: 28, border: false,
  });
  r++;

  const cards = [
    { label: 'Total usuarios', value: total,        color: TEAL,   icon: '👥' },
    { label: 'Completaron',    value: completados,   color: GREEN,  icon: '✅' },
    { label: '% Completado',   value: pctCompleto+'%', color: TEAL, icon: '📈' },
    { label: 'En progreso',    value: enProgreso,    color: ORANGE, icon: '🔵' },
    { label: 'Estancados',     value: estancados,    color: RED,    icon: '🔴' },
    { label: 'Sin iniciar',    value: sinIniciar,    color: MUTED,  icon: '⏳' },
  ];

  for (let ci = 0; ci < cards.length; ci++) {
    const col = ci + 1;
    const card = cards[ci];
    _writeCell(dash, r, col, card.icon + ' ' + card.label, {
      bg: GRAY_BG, fc: MUTED, size: 9, align: 'center',
      border: true, height: 20, bold: false,
    });
    _writeCell(dash, r + 1, col, card.value, {
      bg: WHITE, fc: card.color, bold: true, size: 22, align: 'center',
      border: true, height: 40,
    });
  }
  r += 3;

  // ── Progreso por paso ──────────────────────────────────────
  _writeCell(dash, r, 1, '📋 Usuarios que completaron cada paso', {
    bg: WHITE, fc: DARK_TEXT, bold: true, size: 13, merge: [r, 1, r, 8],
    height: 28, border: false,
  });
  r++;

  _writeCell(dash, r, 1, 'Paso', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  _writeCell(dash, r, 2, 'Nombre del paso', { bg: TEAL, fc: WHITE, bold: true, size: 10, height: 24 });
  _writeCell(dash, r, 3, 'Usuarios', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  _writeCell(dash, r, 4, '% del total', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  _writeCell(dash, r, 5, 'Barra visual', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'left', height: 24, merge: [r, 5, r, 8] });
  r++;

  for (let s = 0; s < 6; s++) {
    const count    = stepCounts[s];
    const pct      = total > 0 ? Math.round((count / total) * 100) : 0;
    const barLen   = Math.round(pct / 5); // max 20 chars → 100%
    const bar      = '█'.repeat(barLen) + '░'.repeat(20 - barLen);
    const rowBg    = s % 2 === 0 ? WHITE : GRAY_BG;
    const fc       = pct >= 80 ? GREEN : pct >= 50 ? ORANGE : RED;

    _writeCell(dash, r, 1, `Paso ${s + 1}`, { bg: rowBg, fc: MUTED, size: 10, align: 'center', height: 26 });
    _writeCell(dash, r, 2, STEP_NAMES[s], { bg: rowBg, fc: DARK_TEXT, size: 10, height: 26 });
    _writeCell(dash, r, 3, count, { bg: rowBg, fc: fc, bold: true, size: 11, align: 'center', height: 26 });
    _writeCell(dash, r, 4, pct + '%', { bg: rowBg, fc: fc, bold: true, size: 11, align: 'center', height: 26 });
    _writeCell(dash, r, 5, bar, {
      bg: rowBg, fc: fc, size: 9, align: 'left', height: 26,
      merge: [r, 5, r, 8], font: 'Courier New',
    });
    r++;
  }
  r++;

  // ── Distribución por país ──────────────────────────────────
  _writeCell(dash, r, 1, '🌎 Distribución por país', {
    bg: WHITE, fc: DARK_TEXT, bold: true, size: 13, merge: [r, 1, r, 8],
    height: 28, border: false,
  });
  r++;

  _writeCell(dash, r, 1, 'País', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  _writeCell(dash, r, 2, 'Usuarios', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  _writeCell(dash, r, 3, '% del total', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
  r++;

  const countryOrder = ['colombia', 'costarica', 'dominicana', 'mexico'];
  for (let ci = 0; ci < countryOrder.length; ci++) {
    const c     = countryOrder[ci];
    const count = countryCounts[c] || 0;
    const pct   = total > 0 ? Math.round((count / total) * 100) : 0;
    const rowBg = ci % 2 === 0 ? WHITE : GRAY_BG;
    _writeCell(dash, r, 1, COUNTRY_LABELS[c] || c, { bg: rowBg, fc: DARK_TEXT, size: 10, align: 'center', height: 26 });
    _writeCell(dash, r, 2, count, { bg: rowBg, fc: TEAL, bold: true, size: 11, align: 'center', height: 26 });
    _writeCell(dash, r, 3, pct + '%', { bg: rowBg, fc: MUTED, size: 10, align: 'center', height: 26 });
    r++;
  }
  r++;

  // ── Calificaciones finales ─────────────────────────────────
  const totalRatings = ratings.Excelente + ratings.Regular + ratings['Difícil'];
  if (totalRatings > 0) {
    _writeCell(dash, r, 1, '⭐ Calificaciones del proceso', {
      bg: WHITE, fc: DARK_TEXT, bold: true, size: 13, merge: [r, 1, r, 8],
      height: 28, border: false,
    });
    r++;

    const ratingData = [
      { label: '😊 Excelente', count: ratings.Excelente, color: GREEN, bg: GREEN_SOFT },
      { label: '😐 Regular',   count: ratings.Regular,   color: ORANGE, bg: ORANGE_S },
      { label: '😟 Difícil',   count: ratings['Difícil'], color: RED,   bg: RED_SOFT },
    ];
    for (let ri = 0; ri < ratingData.length; ri++) {
      const rd  = ratingData[ri];
      const pct = Math.round((rd.count / totalRatings) * 100);
      _writeCell(dash, r, 1, rd.label, { bg: rd.bg, fc: rd.color, bold: true, size: 11, align: 'center', height: 30, merge: [r, 1, r, 2] });
      _writeCell(dash, r, 3, rd.count + ' usuarios (' + pct + '%)', { bg: rd.bg, fc: rd.color, size: 10, align: 'center', height: 30, merge: [r, 3, r, 5] });
      r++;
    }
    r++;
  }

  // ── Usuarios estancados ────────────────────────────────────
  if (stuckUsers.length > 0) {
    _writeCell(dash, r, 1, '🔴 Usuarios estancados (sin avance en +7 días)', {
      bg: RED_SOFT, fc: RED, bold: true, size: 13, merge: [r, 1, r, 8],
      height: 32, border: false,
    });
    r++;

    _writeCell(dash, r, 1, 'Email', { bg: '#fca5a5', fc: WHITE, bold: true, size: 10, height: 24 });
    _writeCell(dash, r, 2, 'País', { bg: '#fca5a5', fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
    _writeCell(dash, r, 3, 'Pasos completados', { bg: '#fca5a5', fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
    _writeCell(dash, r, 4, 'Días sin avanzar', { bg: '#fca5a5', fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
    r++;

    for (let ui = 0; ui < Math.min(stuckUsers.length, 20); ui++) {
      const u     = stuckUsers[ui];
      const rowBg = ui % 2 === 0 ? WHITE : '#fff7f7';
      _writeCell(dash, r, 1, u.email, { bg: rowBg, fc: MUTED, size: 10, height: 26 });
      _writeCell(dash, r, 2, COUNTRY_LABELS[u.country] || u.country || '—', { bg: rowBg, fc: DARK_TEXT, size: 10, align: 'center', height: 26 });
      _writeCell(dash, r, 3, `${u.done} / 6`, { bg: rowBg, fc: RED, bold: true, size: 10, align: 'center', height: 26 });
      _writeCell(dash, r, 4, `${u.daysSince} días`, { bg: rowBg, fc: RED, bold: true, size: 10, align: 'center', height: 26 });
      r++;
    }
    r++;
  }

  // ── Usuarios en progreso activo ────────────────────────────
  if (recentUsers.length > 0) {
    _writeCell(dash, r, 1, '🔵 Activos esta semana', {
      bg: TEAL_SOFT, fc: TEAL_DARK, bold: true, size: 13, merge: [r, 1, r, 8],
      height: 32, border: false,
    });
    r++;

    _writeCell(dash, r, 1, 'Email', { bg: TEAL, fc: WHITE, bold: true, size: 10, height: 24 });
    _writeCell(dash, r, 2, 'País', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
    _writeCell(dash, r, 3, 'Pasos completados', { bg: TEAL, fc: WHITE, bold: true, size: 10, align: 'center', height: 24 });
    r++;

    for (let ui = 0; ui < Math.min(recentUsers.length, 20); ui++) {
      const u     = recentUsers[ui];
      const rowBg = ui % 2 === 0 ? WHITE : TEAL_SOFT;
      _writeCell(dash, r, 1, u.email, { bg: rowBg, fc: MUTED, size: 10, height: 26 });
      _writeCell(dash, r, 2, COUNTRY_LABELS[u.country] || u.country || '—', { bg: rowBg, fc: DARK_TEXT, size: 10, align: 'center', height: 26 });
      _writeCell(dash, r, 3, `${u.done} / 6`, { bg: rowBg, fc: TEAL, bold: true, size: 10, align: 'center', height: 26 });
      r++;
    }
  }

  // ── Anchos de columna del dashboard ───────────────────────
  dash.setColumnWidth(1, 240);
  dash.setColumnWidth(2, 120);
  dash.setColumnWidth(3, 100);
  dash.setColumnWidth(4, 100);
  for (let c = 5; c <= 8; c++) dash.setColumnWidth(c, 80);

  SpreadsheetApp.flush();
}

// ── Helper: escribir celda con opciones de formato ──────────
function _writeCell(sheet, row, col, value, opts = {}) {
  const range = (opts.merge && opts.merge.length === 4)
    ? sheet.getRange(opts.merge[0], opts.merge[1], opts.merge[2] - opts.merge[0] + 1, opts.merge[3] - opts.merge[1] + 1)
    : sheet.getRange(row, col);

  if (opts.merge) range.merge();

  range.setValue(value);

  if (opts.bg)    range.setBackground(opts.bg);
  if (opts.fc)    range.setFontColor(opts.fc);
  if (opts.bold !== undefined) range.setFontWeight(opts.bold ? 'bold' : 'normal');
  if (opts.size)  range.setFontSize(opts.size);
  if (opts.italic) range.setFontStyle('italic');
  if (opts.align) range.setHorizontalAlignment(opts.align);
  if (opts.font)  range.setFontFamily(opts.font);
  range.setVerticalAlignment('middle');

  if (opts.height) sheet.setRowHeight(row, opts.height);

  if (opts.border !== false) {
    range.setBorder(true, true, true, true, false, false, '#ddd', SpreadsheetApp.BorderStyle.SOLID);
  }
}
