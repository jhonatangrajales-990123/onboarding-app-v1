// ─────────────────────────────────────────────────────────────
// Contenido del onboarding por país
// Cada step tiene: id, sidebarTitle, tag, heading, body (JSX string),
//   mediaType ('video'|'image'), mediaSrc, helpLink, progressStep,
//   displayNumber, statusLabel (solo para pasos sin número)
// ─────────────────────────────────────────────────────────────

export const COUNTRY_META = {
  colombia: {
    name: 'Colombia',
    flag: '🇨🇴',
    flagClass: 'flag-colombia',
  },
  costarica: {
    name: 'Costa Rica',
    flag: '🇨🇷',
    flagClass: 'flag-costarica',
  },
  dominicana: {
    name: 'Rep. Dominicana',
    flag: '🇩🇴',
    flagClass: 'flag-dominicana',
  },
  mexico: {
    name: 'México',
    flag: '🇲🇽',
    flagClass: 'flag-mexico',
  },
};

// ── COLOMBIA ────────────────────────────────────────────────
const COLOMBIA_STEPS = [
  {
    id: 'col-espacio',
    sidebarTitle: 'Espacio Contador',
    statusLabel: 'Comienza aquí',
    displayNumber: null,
    progressStep: null,
    tag: 'Solo para contadores',
    heading: 'Tu centro de comando para todos tus clientes',
    body: `<p>El <strong>Espacio Contador</strong> es tu panel centralizado desde donde puedes acceder y gestionar la contabilidad de todas tus empresas cliente en un solo lugar, sin necesidad de múltiples cuentas ni contraseñas.</p>
<p><strong>¿Qué puedes hacer desde aquí?</strong></p>
<ul>
  <li>Agregar clientes individualmente o de forma masiva con un archivo CSV.</li>
  <li>Cambiar entre cuentas de tus clientes con un solo clic usando <strong>Multiempresa</strong>.</li>
  <li>Ver indicadores estratégicos de cada empresa: ingresos, gastos, estado de cartera.</li>
  <li>Usar el gestor de tareas para hacer seguimiento de pendientes contables.</li>
</ul>
<p><strong>¿Cómo añadir un cliente?</strong></p>
<ol>
  <li>Ve a <strong>Alegra Contabilidad → Espacio Contador → Clientes</strong>.</li>
  <li>Haz clic en <strong>"Añadir cliente"</strong> e ingresa sus datos.</li>
  <li>El sistema enviará automáticamente una invitación al correo del cliente.</li>
</ol>`,
    tip: 'Asegúrate de ingresar el <strong>correo electrónico válido</strong> de cada cliente. Sin él, no podrán acceder a su propia contabilidad ni aceptar la vinculación.',
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/COL_AC_Boton%20multiempresa.mp4?hsLang=es',
    helpLink: { text: 'Gestión contable desde Espacio Contador', url: 'https://ayuda.alegra.com/int/gestion-contable-desde-espacio-contador' },
    isIntro: true,
  },
  {
    id: 'col-1',
    sidebarTitle: 'Configuración empresa',
    displayNumber: 1,
    progressStep: 1,
    tag: 'Información base de tu empresa',
    estimatedMinutes: 10,
    heading: 'Configura la información de tu empresa en Alegra',
    body: `<p>Este es el primer paso y el más importante: define los datos legales y fiscales de tu empresa que aparecerán en todas tus facturas, notas crédito y documentos oficiales.</p>
<p><strong>¿Dónde hacerlo?</strong> Ve a <strong>Configuración → Empresa</strong> en tu menú principal.</p>
<p><strong>Qué debes completar:</strong></p>
<ol>
  <li><strong>Nombre o razón social</strong> — tal como aparece en el RUT.</li>
  <li><strong>NIT</strong> — número de identificación tributaria con dígito de verificación.</li>
  <li><strong>Régimen tributario</strong> — responsable de IVA o no responsable.</li>
  <li><strong>Dirección, teléfono y correo electrónico</strong> de la empresa.</li>
  <li><strong>País, zona horaria y moneda</strong> — Colombia, Bogotá, COP.</li>
  <li><strong>Sector económico</strong> — clasifica tu actividad principal.</li>
  <li><strong>Logo</strong> (opcional) — aparecerá en tus facturas. Máximo 2 MB.</li>
</ol>`,
    tip: 'Revisa que el NIT y la razón social coincidan exactamente con tu RUT actualizado. Cualquier discrepancia puede generar rechazos en la DIAN al habilitar facturación electrónica.',
    helpLink: { text: 'Ver guía completa de configuración', url: 'https://ayuda.alegra.com/int/configura-la-informaci%C3%B3n-de-tu-empresa-en-alegra-contabilidad' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Conf.%20Empresa_INT.mp4?hsLang=es',
  },
  {
    id: 'col-2',
    sidebarTitle: 'Catálogo de cuentas',
    displayNumber: 2,
    progressStep: 2,
    tag: 'Estructura contable',
    estimatedMinutes: 15,
    heading: 'Elige y configura tu catálogo de cuentas contables',
    body: `<p>El catálogo de cuentas es la columna vertebral de tu contabilidad. Define cómo se clasifican todos tus ingresos, gastos, activos y pasivos. <strong>Esta elección es permanente</strong>, así que hazla con cuidado.</p>
<p><strong>¿Qué marco contable aplica a tu empresa?</strong></p>
<ul>
  <li><strong>NIIF Microempresas</strong> — para empresas muy pequeñas (la más común).</li>
  <li><strong>NIIF Pymes</strong> — para pymes de tamaño mediano.</li>
  <li><strong>NIIF Plenas</strong> — para grandes empresas o grupos.</li>
  <li><strong>PUC</strong> — sector público o entidades que lo requieran.</li>
</ul>
<p><strong>¿Cómo seleccionarlo?</strong></p>
<ol>
  <li>Ve a <strong>Contabilidad → Catálogo de cuentas</strong>.</li>
  <li>Selecciona el marco contable que corresponde a tu empresa.</li>
  <li>Si necesitas cuentas adicionales, puedes crearlas manualmente o importar un catálogo personalizado.</li>
</ol>`,
    tip: 'Si tienes dudas sobre qué marco contable usar, consulta con tu revisor fiscal o contador antes de continuar. Cambiar el catálogo después de registrar movimientos es muy complejo.',
    helpLink: { text: '¿Cómo elegir tu catálogo de cuentas?', url: 'https://ayuda.alegra.com/col/elegir-catalogo-de-cuentas' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/COL_AC_Elecci%C3%B3n%20de%20catalogo%20NIIF%20PUC.mp4?hsLang=es',
  },
  {
    id: 'col-3',
    sidebarTitle: 'Contactos',
    displayNumber: 3,
    progressStep: 3,
    tag: 'Clientes y proveedores',
    estimatedMinutes: 20,
    heading: 'Importa tus contactos: clientes y proveedores',
    body: `<p>Los contactos son las personas o empresas con quienes haces negocios. Tenerlos cargados te permite facturar, registrar compras y hacer seguimiento de cartera desde el primer momento.</p>
<p><strong>Opción 1 — Importación masiva (recomendada si tienes más de 10 contactos):</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Importar contactos</strong> y descarga la plantilla Excel.</li>
  <li>Completa los datos: nombre, NIT o cédula, correo electrónico y tipo (cliente, proveedor o ambos).</li>
  <li>Sube el archivo. El sistema te indicará si hay errores a corregir antes de guardar.</li>
</ol>
<p><strong>Opción 2 — Creación manual (para pocos contactos):</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Nuevo contacto</strong>.</li>
  <li>Ingresa los datos y guarda.</li>
</ol>`,
    tip: 'El campo de <strong>correo electrónico</strong> es clave: Alegra lo usa para enviar facturas y notificaciones directamente a tus clientes.',
    helpLink: { text: 'Crear o importar clientes y proveedores', url: 'https://ayuda.alegra.com/col/crear-o-importar-clientes-y/o-proveedores#P5' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/INT_AC_Crear%20e%20importar%20contactos%202.mp4?hsLang=es',
  },
  {
    id: 'col-4',
    sidebarTitle: 'Productos y servicios',
    displayNumber: 4,
    progressStep: 4,
    tag: 'Inventario y catálogo',
    estimatedMinutes: 20,
    heading: 'Carga tus productos y servicios en Alegra',
    body: `<p>Con tu catálogo de productos y servicios listo, podrás facturar en segundos sin tener que escribir cada ítem a mano. También activa el control de inventario automático si vendes productos físicos.</p>
<p><strong>¿Cómo importarlos?</strong></p>
<ol>
  <li>Ve a <strong>Inventario → Gestión de artículos → Importar artículos</strong>.</li>
  <li>Descarga la plantilla Excel y completa los campos requeridos:<br/>
    — <strong>Nombre</strong> del producto o servicio.<br/>
    — <strong>Precio de venta</strong> (precio general).<br/>
    — <strong>Impuesto</strong> aplicable (IVA 19%, exento, etc.).<br/>
    — <strong>Costo unitario</strong> y <strong>cantidad inicial</strong> (solo para productos con inventario).</li>
  <li>Sube el archivo y selecciona el tipo: <strong>Inventariable</strong> o <strong>No inventariable / Servicio</strong>.</li>
</ol>`,
    note: 'La <strong>primera fila de tu archivo</strong> (encabezados) no se importa. Además, si un producto tiene inventario, asegúrate de ingresar el costo unitario y la cantidad inicial para que el sistema calcule el costo de ventas correctamente.',
    helpLink: { text: 'Importa tus productos y servicios', url: 'https://ayuda.alegra.com/int/importa-tus-productos-y-servicios-a-alegra' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Nuevo%20producto%20-%20AC%20CRI%20-%204.mp4?hsLang=es',
  },
  {
    id: 'col-5',
    sidebarTitle: 'Habilitación DIAN',
    displayNumber: 5,
    progressStep: 5,
    tag: 'Requisito legal — DIAN',
    estimatedMinutes: 30,
    heading: 'Habilítate como facturador electrónico ante la DIAN',
    body: `<p>A partir de 2024, toda empresa en Colombia debe emitir <strong>facturas electrónicas</strong> con validez ante la DIAN. Este paso conecta tu cuenta de Alegra con el sistema de la DIAN para que tus facturas sean válidas legalmente.</p>
<p><strong>Requisitos previos:</strong></p>
<ul>
  <li>RUT actualizado con la actividad económica correcta.</li>
  <li>Responsabilidades tributarias al día.</li>
  <li>Cuenta activa en el portal de la DIAN (MiRUT o MUISCA).</li>
</ul>
<p><strong>Pasos para habilitarte:</strong></p>
<ol>
  <li>Ingresa al portal de la DIAN y registra a <strong>Alegra como tu proveedor tecnológico</strong>.</li>
  <li>En Alegra, ve a <strong>Configuración → Facturación electrónica</strong> y completa los datos solicitados.</li>
  <li>Realiza el <strong>set de pruebas</strong> que exige la DIAN (mínimo 3 facturas de prueba).</li>
  <li>Una vez aprobadas las pruebas, solicita la <strong>habilitación en producción</strong>.</li>
</ol>`,
    note: 'Este paso puede tomar entre 1 y 3 días hábiles dependiendo de la respuesta de la DIAN. Si tienes inconvenientes en el portal de la DIAN, contacta directamente a su línea de soporte.',
    helpLink: { text: 'Guía de habilitación DIAN paso a paso', url: 'https://ayuda.alegra.com/col/pasos-habilitacion-facturador-electronico-dian' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Pasos%20FECO%20-%201-2.mp4?hsLang=es',
    badges: ['Alegra', 'DIAN'],
  },
  {
    id: 'col-6',
    sidebarTitle: 'Saldos iniciales',
    displayNumber: 6,
    progressStep: 6,
    tag: 'Cierre de migración contable',
    estimatedMinutes: 25,
    heading: 'Ingresa los saldos iniciales de tus cuentas contables',
    body: `<p>Los saldos iniciales son el punto de partida de tu contabilidad en Alegra: los valores con los que cierras tu sistema anterior y abres en el nuevo. Sin este paso, tus estados financieros no serán correctos.</p>
<p><strong>¿Dónde hacerlo?</strong></p>
<p>Ve a <strong>Contabilidad → Catálogo de cuentas → Saldos iniciales</strong>.</p>
<p><strong>¿Cómo ingresar los saldos?</strong></p>
<ol>
  <li>Selecciona la <strong>fecha de corte</strong> (el último día de tu período anterior).</li>
  <li>Ingresa los saldos cuenta por cuenta, o usa la opción de importación por Excel para volúmenes grandes.</li>
  <li>Valida que se cumpla la <strong>ecuación patrimonial: Activos = Pasivos + Patrimonio</strong>.</li>
  <li>Guarda los cambios. Puedes editar y ajustar mientras no hayas cerrado el período.</li>
</ol>`,
    note: 'Si ya registraste saldos de Bancos e Inventario directamente en sus módulos, <strong>ingresa esos mismos valores en negativo en Patrimonio</strong> para evitar duplicación. Consulta la guía si tienes cuentas por cobrar o por pagar con documentos específicos.',
    helpLink: { text: 'Guía de saldos iniciales', url: 'https://ayuda.alegra.com/int/ingresa-los-saldos-iniciales-de-tus-cuentas-contables' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/INT_AC_saldos-iniciales_1.mp4?hsLang=es',
  },
];

// ── COSTA RICA ──────────────────────────────────────────────
const COSTA_RICA_STEPS = [
  {
    id: 'cri-espacio',
    sidebarTitle: 'Espacio Contador',
    statusLabel: 'Comienza aquí',
    displayNumber: null,
    progressStep: null,
    tag: 'Solo para contadores',
    heading: 'Tu centro de comando para todos tus clientes',
    body: `<p>El <strong>Espacio Contador</strong> es tu panel centralizado desde donde puedes gestionar la contabilidad de todas tus empresas cliente en Costa Rica sin necesidad de múltiples cuentas ni contraseñas.</p>
<p><strong>¿Qué puedes hacer desde aquí?</strong></p>
<ul>
  <li>Añadir clientes individualmente o de forma masiva con archivo CSV.</li>
  <li>Cambiar entre cuentas de tus clientes con un solo clic usando <strong>Multiempresa</strong>.</li>
  <li>Ver indicadores estratégicos: ingresos, gastos y estado de cada empresa.</li>
  <li>Gestionar tareas contables pendientes de cada cliente.</li>
</ul>
<p><strong>¿Cómo añadir un cliente?</strong></p>
<ol>
  <li>Ve a <strong>Alegra Contabilidad → Espacio Contador → Clientes</strong>.</li>
  <li>Haz clic en <strong>"Añadir cliente"</strong> e ingresa sus datos.</li>
  <li>El sistema envía automáticamente la invitación al correo del cliente.</li>
</ol>`,
    tip: 'Asegúrate de ingresar el <strong>correo electrónico válido</strong> de cada cliente. Sin él, no podrán acceder a su propia contabilidad ni aceptar la vinculación.',
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/CRI_AC_Espacio_contador%202.mp4?hsLang=es',
    helpLink: { text: 'Gestión contable desde Espacio Contador', url: 'https://ayuda.alegra.com/int/gestion-contable-desde-espacio-contador' },
    isIntro: true,
  },
  {
    id: 'cri-1',
    sidebarTitle: 'Configuración empresa',
    displayNumber: 1,
    progressStep: 1,
    tag: 'Información base de tu empresa',
    estimatedMinutes: 10,
    heading: 'Configura la información de tu empresa en Alegra',
    body: `<p>La configuración de empresa define los datos legales y fiscales que aparecerán en todos tus comprobantes electrónicos emitidos ante Hacienda.</p>
<p><strong>¿Dónde hacerlo?</strong> Ve a <strong>Configuración → Empresa</strong>.</p>
<p><strong>Qué debes completar:</strong></p>
<ol>
  <li><strong>Nombre o razón social</strong> — tal como aparece ante el Registro Nacional.</li>
  <li><strong>Cédula Jurídica o Física</strong> — número de identificación tributaria.</li>
  <li><strong>Actividad(es) económica(s)</strong> — selecciona la principal y las secundarias si aplica. Se usa para clasificar ingresos y gastos en los comprobantes.</li>
  <li><strong>Dirección, teléfono y correo electrónico</strong>.</li>
  <li><strong>Logo</strong> (opcional) — aparecerá en tus facturas. Máximo 2 MB.</li>
</ol>`,
    tip: 'Puedes agregar <strong>varias actividades económicas</strong> y marcar una como favorita. La actividad favorita se usará automáticamente al emitir cada factura.',
    helpLink: { text: 'Configura la información de tu negocio en Costa Rica', url: 'https://ayuda.alegra.com/int/configura-la-informaci%C3%B3n-de-tu-negocio-en-alegra-costa-rica' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Configurar%20info%20de%20empresa%20CRI.mp4?hsLang=es',
  },
  {
    id: 'cri-2',
    sidebarTitle: 'Catálogo de cuentas',
    displayNumber: 2,
    progressStep: 2,
    tag: 'Estructura contable',
    estimatedMinutes: 20,
    heading: 'Importa tu catálogo de cuentas contables',
    body: `<p>El catálogo de cuentas clasifica todos tus movimientos financieros y permite generar estados financieros correctos. En Costa Rica generalmente se importa desde una plantilla Excel.</p>
<p><strong>¿Cómo importarlo?</strong></p>
<ol>
  <li>Ve a <strong>Contabilidad → Catálogo de cuentas → Importar</strong>.</li>
  <li>Descarga la plantilla de ejemplo que ofrece el sistema.</li>
  <li>Completa la plantilla respetando el orden y las columnas — no elimines ni reordenes columnas.</li>
  <li>Sube el archivo. La plantilla soporta hasta <strong>2.300 cuentas</strong>.</li>
  <li>Verifica que todas las cuentas quedaron bien organizadas.</li>
</ol>`,
    tip: 'Este proceso debe hacerlo alguien con conocimientos contables o con el acompañamiento de tu contador. Un catálogo mal estructurado afecta todos los reportes posteriores.',
    helpLink: { text: 'Importa el catálogo de cuentas contables', url: 'https://ayuda.alegra.com/int/aprenda-a-importar-el-catalogo-de-cuentas-contables-en-alegra-costa-rica' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/CRI_AC_Importar%20Catalogo.mp4?hsLang=es',
  },
  {
    id: 'cri-3',
    sidebarTitle: 'Contactos',
    displayNumber: 3,
    progressStep: 3,
    tag: 'Clientes y proveedores',
    estimatedMinutes: 15,
    heading: 'Importa tus contactos: clientes y proveedores',
    body: `<p>Los contactos son las personas o empresas con quienes haces negocios. Con ellos cargados podrás facturar y registrar compras desde el primer momento.</p>
<p><strong>Opción 1 — Importación masiva:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Importar contactos</strong> y descarga la plantilla.</li>
  <li>Completa: nombre, <strong>Cédula Física o Jurídica</strong>, correo y tipo (cliente, proveedor o ambos).</li>
  <li>Sube el archivo y corrige los errores que señale el sistema.</li>
</ol>
<p><strong>Opción 2 — Creación manual:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Nuevo contacto</strong> e ingresa los datos uno a uno.</li>
</ol>`,
    tip: 'El correo electrónico del contacto es fundamental para que Alegra envíe las facturas directamente al cliente sin que tengas que reenviarlas manualmente.',
    helpLink: { text: 'Crear o importar contactos en Costa Rica', url: 'https://ayuda.alegra.com/int/c%C3%B3mo-crear-o-importar-clientes-y-o-proveedores-en-alegra-costa-rica#P1' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/CRI_AC__contact_importar.mp4?hsLang=es',
  },
  {
    id: 'cri-4',
    sidebarTitle: 'Productos y servicios',
    displayNumber: 4,
    progressStep: 4,
    tag: 'Inventario y catálogo',
    estimatedMinutes: 20,
    heading: 'Carga tus productos y servicios en Alegra',
    body: `<p>Con tu catálogo listo, podrás facturar en segundos seleccionando directamente el producto o servicio, con sus precios e impuestos ya configurados.</p>
<p><strong>¿Cómo importarlos?</strong></p>
<ol>
  <li>Ve a <strong>Inventario → Gestión de artículos → Importar artículos</strong>.</li>
  <li>Descarga la plantilla y completa: nombre, precio de venta, impuesto (IVA 13% u otro) y costo unitario.</li>
  <li>Para productos físicos con inventario, agrega también la <strong>cantidad inicial</strong>.</li>
  <li>Sube el archivo y selecciona si es <strong>Inventariable</strong> o <strong>No inventariable / Servicio</strong>.</li>
</ol>`,
    note: 'La <strong>primera fila del archivo</strong> (encabezados) no se importa. Clasifica cada ítem correctamente: los productos inventariables activan el control de stock; los servicios no.',
    helpLink: { text: 'Importa tus productos y servicios en Costa Rica', url: 'https://ayuda.alegra.com/int/importa-tus-productos-y-servicios-a-alegra-costa-rica' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Nuevo%20producto%20-%20AC%20CRI%20-%204.mp4?hsLang=es',
  },
  {
    id: 'cri-5',
    sidebarTitle: 'Habilitación Hacienda',
    displayNumber: 5,
    progressStep: 5,
    tag: 'Requisito legal — Hacienda',
    estimatedMinutes: 30,
    heading: 'Actívate en facturación electrónica ante Hacienda',
    body: `<p>Para emitir comprobantes electrónicos válidos en Costa Rica necesitas conectar Alegra con el sistema del Ministerio de Hacienda a través del portal <strong>ATV</strong>.</p>
<p><strong>Paso 1 — Obtén tus credenciales en ATV:</strong></p>
<ol>
  <li>Ingresa al portal ATV (Administración Tributaria Virtual) con tu usuario y contraseña.</li>
  <li>Genera un <strong>usuario técnico</strong> para la integración con Alegra.</li>
  <li>Descarga tu <strong>llave criptográfica (.p12)</strong> — este archivo firma digitalmente cada comprobante.</li>
</ol>
<p><strong>Paso 2 — Configura Alegra:</strong></p>
<ol>
  <li>Ve a <strong>Configuración → Facturación Electrónica</strong>.</li>
  <li>Ingresa tu usuario ATV, contraseña y sube el archivo .p12 con su PIN.</li>
  <li>Emite una <strong>factura de prueba</strong> para confirmar que la integración funciona.</li>
</ol>`,
    note: 'Guarda el archivo .p12 en un lugar seguro y recuerda su PIN. Sin ellos no podrás firmar comprobantes ni reconfigurar la integración.',
    helpLink: { text: 'Actívate en Facturación Electrónica — Costa Rica', url: 'https://ayuda.alegra.com/int/activese-en-facturacion-electronica-cri' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/CRI_AC_habilitar_FE.mp4?hsLang=es',
    badges: ['Alegra', 'Hacienda'],
  },
  {
    id: 'cri-6',
    sidebarTitle: 'Saldos iniciales',
    displayNumber: 6,
    progressStep: 6,
    tag: 'Cierre de migración contable',
    estimatedMinutes: 25,
    heading: 'Ingresa los saldos iniciales de tus cuentas contables',
    body: `<p>Los saldos iniciales son el puente entre tu sistema anterior y Alegra. Aseguran que tu contabilidad arranque con los valores correctos y tus estados financieros sean precisos desde el primer día.</p>
<p><strong>¿Dónde hacerlo?</strong></p>
<p>Ve a <strong>Contabilidad → Catálogo de cuentas → Saldos iniciales</strong>.</p>
<p><strong>¿Cómo ingresarlos?</strong></p>
<ol>
  <li>Selecciona la <strong>fecha de corte</strong> (último día de tu período anterior).</li>
  <li>Ingresa los saldos manualmente o impórtalos desde Excel para volúmenes grandes.</li>
  <li>Verifica que se cumpla: <strong>Activos = Pasivos + Patrimonio</strong>.</li>
  <li>Guarda los cambios y consulta el balance de comprobación para validar.</li>
</ol>`,
    note: 'Si ya ingresaste saldos de Bancos e Inventario directamente en sus módulos, <strong>ingresa esos mismos valores en negativo en Patrimonio</strong> para evitar duplicación contable.',
    helpLink: { text: 'Guía de saldos iniciales — Costa Rica', url: 'https://ayuda.alegra.com/int/ingrese-los-saldos-iniciales-de-sus-cuentas-contables-cri' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/CRI_AC_saldos-iniciales_1.mp4?hsLang=es',
  },
];

// ── REPÚBLICA DOMINICANA ────────────────────────────────────
const DOMINICANA_STEPS = [
  {
    id: 'dom-espacio',
    sidebarTitle: 'Espacio Contador',
    statusLabel: 'Comienza aquí',
    displayNumber: null,
    progressStep: null,
    tag: 'Solo para contadores',
    heading: 'Tu centro de comando para todos tus clientes',
    body: `<p>El <strong>Espacio Contador</strong> de Alegra te permite gestionar la contabilidad de todas tus empresas cliente en República Dominicana desde un solo panel, sin cambiar de cuenta ni contraseña.</p>
<p><strong>¿Qué puedes hacer desde aquí?</strong></p>
<ul>
  <li>Añadir clientes individualmente o de forma masiva con archivo CSV.</li>
  <li>Cambiar entre cuentas de tus clientes con un solo clic.</li>
  <li>Ver indicadores clave de cada empresa: ingresos, gastos, cartera.</li>
  <li>Hacer seguimiento de tareas contables pendientes.</li>
</ul>
<p><strong>¿Cómo añadir un cliente?</strong></p>
<ol>
  <li>Ve a <strong>Alegra Contabilidad → Espacio Contador → Clientes</strong>.</li>
  <li>Haz clic en <strong>"Añadir cliente"</strong> e ingresa sus datos.</li>
  <li>El sistema envía la invitación automáticamente al correo del cliente.</li>
</ol>`,
    tip: 'Asegúrate de ingresar el <strong>correo electrónico válido</strong> de cada cliente. Sin él, no podrán acceder a su contabilidad ni aceptar la vinculación.',
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/COL_AC_Boton%20multiempresa.mp4?hsLang=es',
    helpLink: { text: 'Gestión contable desde Espacio Contador', url: 'https://ayuda.alegra.com/int/multiempresas-rdom' },
    isIntro: true,
  },
  {
    id: 'dom-1',
    sidebarTitle: 'Configuración empresa',
    displayNumber: 1,
    progressStep: 1,
    tag: 'Información base de tu empresa',
    estimatedMinutes: 10,
    heading: 'Configura la información fiscal de tu empresa',
    body: `<p>Esta configuración define los datos legales que aparecerán en todos tus comprobantes fiscales emitidos ante la DGII.</p>
<p><strong>¿Dónde hacerlo?</strong> Ve a <strong>Configuración → Empresa</strong>.</p>
<p><strong>Qué debes completar:</strong></p>
<ol>
  <li><strong>Nombre o razón social</strong> — tal como aparece en tu registro fiscal.</li>
  <li><strong>RNC</strong> — Registro Nacional del Contribuyente.</li>
  <li><strong>Actividad económica</strong> — clasifica tu negocio ante la DGII.</li>
  <li><strong>Dirección, teléfono y correo electrónico</strong>.</li>
  <li><strong>Logo</strong> (opcional) — aparece en tus facturas. Máximo 2 MB.</li>
</ol>`,
    tip: 'El RNC debe coincidir exactamente con el registro en la DGII. Un error aquí puede causar rechazos al emitir comprobantes fiscales.',
    helpLink: { text: 'Configurar información de la empresa', url: 'https://ayuda.alegra.com/int/configura-la-informaci%C3%B3n-de-tu-empresa-en-alegra-contabilidad-dom' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/DOM_AC_Configurar%20empresa_1.mp4?hsLang=es',
  },
  {
    id: 'dom-2',
    sidebarTitle: 'Catálogo de cuentas',
    displayNumber: 2,
    progressStep: 2,
    tag: 'Estructura contable',
    estimatedMinutes: 15,
    heading: 'Organiza la estructura contable de tu empresa',
    body: `<p>El catálogo de cuentas es la base de toda tu contabilidad. Clasifica ingresos, gastos, activos y pasivos para que tus reportes financieros sean correctos.</p>
<p><strong>¿Cómo configurarlo?</strong></p>
<ol>
  <li>Ve a <strong>Contabilidad → Catálogo de cuentas</strong>.</li>
  <li>Revisa el catálogo sugerido por el sistema y valida que aplica a tu negocio.</li>
  <li>Crea cuentas adicionales si tu empresa las necesita.</li>
  <li>Ajusta nombres o clasificaciones según tu contabilidad interna.</li>
</ol>`,
    tip: 'Personaliza el catálogo <strong>antes</strong> de registrar cualquier movimiento contable. Modificarlo después puede requerir reclasificar transacciones ya registradas.',
    helpLink: { text: 'Personalizar catálogo de cuentas', url: 'https://ayuda.alegra.com/int/personaliza-tu-catalogo-de-cuentas-y-genera-reportes' },
    mediaType: 'image',
    mediaSrc: 'https://ayuda.alegra.com/hs-fs/hubfs/Im%C3%A1genes%20ayudas/Catalogo%20de%20cuentas%20-%20PER%20-%201.gif?width=1005&height=566&name=Catalogo%20de%20cuentas%20-%20PER%20-%201.gif',
  },
  {
    id: 'dom-3',
    sidebarTitle: 'Contactos',
    displayNumber: 3,
    progressStep: 3,
    tag: 'Clientes y proveedores',
    estimatedMinutes: 15,
    heading: 'Importa tus contactos: clientes y proveedores',
    body: `<p>Con tus contactos cargados podrás emitir comprobantes fiscales, registrar compras y hacer seguimiento de cartera desde el primer día.</p>
<p><strong>Opción 1 — Importación masiva:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Importar contactos</strong> y descarga la plantilla.</li>
  <li>Completa: nombre, <strong>RNC o Cédula</strong>, correo y tipo (cliente, proveedor o ambos).</li>
  <li>Sube el archivo y corrige los errores señalados.</li>
</ol>
<p><strong>Opción 2 — Creación manual:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Nuevo contacto</strong> e ingresa los datos.</li>
</ol>`,
    tip: 'El correo electrónico del contacto permite a Alegra enviar los comprobantes fiscales directamente al cliente de forma automática.',
    helpLink: { text: 'Crear o importar contactos — Rep. Dominicana', url: 'https://ayuda.alegra.com/int/crea-contactos-para-agilizar-la-facturaci%C3%B3n-de-tu-negocio-alegra-republica-dominicana#IN' },
    mediaType: 'image',
    mediaSrc: 'https://ayuda.alegra.com/hs-fs/hubfs/Im%C3%A1genes%20ayudas/DOM_AC_crear-contacto.gif?width=1005&height=566&name=DOM_AC_crear-contacto.gif',
  },
  {
    id: 'dom-4',
    sidebarTitle: 'Productos y servicios',
    displayNumber: 4,
    progressStep: 4,
    tag: 'Inventario y catálogo',
    estimatedMinutes: 20,
    heading: 'Carga tus productos y servicios en Alegra',
    body: `<p>Con tu catálogo listo podrás facturar seleccionando el ítem directamente, con sus precios e impuestos ya configurados. También activa el control de inventario automático si vendes productos físicos.</p>
<p><strong>¿Cómo importarlos?</strong></p>
<ol>
  <li>Ve a <strong>Inventario → Gestión de artículos → Importar artículos</strong>.</li>
  <li>Descarga la plantilla y completa: nombre, precio, impuesto (ITBIS 18% u otro) y costo unitario.</li>
  <li>Para productos físicos con inventario agrega también la <strong>cantidad inicial</strong>.</li>
  <li>Sube el archivo y selecciona si es <strong>Inventariable</strong> o <strong>No inventariable / Servicio</strong>.</li>
</ol>`,
    note: 'La <strong>primera fila del archivo</strong> (encabezados) no se importa. Clasifica correctamente cada ítem: producto inventariable activa control de stock; servicio no.',
    helpLink: { text: 'Crea productos y servicios — Rep. Dominicana', url: 'https://ayuda.alegra.com/int/crea-productos-inventariables-y-servicios-para-agilizar-tu-facturaci%C3%B3n-alegra-republica-dominicana' },
    mediaType: 'image',
    mediaSrc: 'https://ayuda.alegra.com/hs-fs/hubfs/Im%C3%A1genes%20ayudas/DOM_AC_Producto_1.gif?width=1005&height=566&name=DOM_AC_Producto_1.gif',
  },
  {
    id: 'dom-5',
    sidebarTitle: 'Habilitación DGII',
    displayNumber: 5,
    progressStep: 5,
    tag: 'Requisito legal — DGII',
    estimatedMinutes: 30,
    heading: 'Activa la facturación electrónica ante la DGII',
    body: `<p>En República Dominicana los comprobantes fiscales electrónicos (e-CF) son obligatorios. Este paso conecta Alegra con la DGII para que tus facturas tengan validez legal.</p>
<p><strong>Paso 1 — Habilitarte en la DGII:</strong></p>
<ol>
  <li>Ingresa al portal de la DGII y completa el proceso de registro como facturador electrónico.</li>
  <li>Obtén las credenciales y certificados necesarios para la integración.</li>
</ol>
<p><strong>Paso 2 — Configurar en Alegra:</strong></p>
<ol>
  <li>Ve a <strong>Configuración → Facturación Electrónica</strong>.</li>
  <li>Ingresa los datos y credenciales obtenidos de la DGII.</li>
  <li>Realiza una <strong>emisión de prueba</strong> para confirmar la integración.</li>
</ol>`,
    note: 'El proceso de habilitación en la DGII puede tardar varios días hábiles. Inícialo con anticipación para no retrasar el arranque operativo.',
    helpLink: { text: 'Habilitarse en la DGII como facturador electrónico', url: 'https://ayuda.alegra.com/int/pasos-para-habilitarse-en-la-dgii-como-facturador-electronico' },
    mediaType: 'image',
    mediaSrc: 'https://ayuda.alegra.com/hs-fs/hubfs/Im%C3%A1genes%20ayudas/DOM_AC_Habi_FE_ia_Manual.gif?width=1005&height=654&name=DOM_AC_Habi_FE_ia_Manual.gif',
    badges: ['Alegra', 'DGII'],
  },
  {
    id: 'dom-6',
    sidebarTitle: 'Saldos iniciales',
    displayNumber: 6,
    progressStep: 6,
    tag: 'Cierre de migración contable',
    estimatedMinutes: 25,
    heading: 'Ingresa los saldos iniciales de tus cuentas contables',
    body: `<p>Los saldos iniciales son los valores con los que cierras tu sistema anterior y arrancas en Alegra. Sin ellos, tus estados financieros no reflejarán la realidad de tu empresa.</p>
<p><strong>¿Dónde hacerlo?</strong></p>
<p>Ve a <strong>Contabilidad → Catálogo de cuentas → Saldos iniciales</strong>.</p>
<p><strong>¿Cómo ingresarlos?</strong></p>
<ol>
  <li>Selecciona la <strong>fecha de corte</strong> (último día de tu período anterior).</li>
  <li>Ingresa los saldos cuenta por cuenta, o usa Excel para volúmenes grandes.</li>
  <li>Incluye cuentas por cobrar, cuentas por pagar e inventario inicial si aplica.</li>
  <li>Valida la ecuación patrimonial: <strong>Activos = Pasivos + Patrimonio</strong>.</li>
</ol>`,
    note: 'Si ya registraste Bancos e Inventario directamente en sus módulos, <strong>ingresa esos mismos valores en negativo en Patrimonio</strong> para evitar duplicación.',
    helpLink: { text: 'Guía de saldos iniciales', url: 'https://ayuda.alegra.com/int/ingresar-saldos-iniciales-cuentas-contables' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/INT_AC_saldos-iniciales_1.mp4?hsLang=es',
  },
];

// ── MÉXICO ──────────────────────────────────────────────────
const MEXICO_STEPS = [
  {
    id: 'mex-espacio',
    sidebarTitle: 'Espacio Contador',
    statusLabel: 'Comienza aquí',
    displayNumber: null,
    progressStep: null,
    tag: 'Solo para contadores',
    heading: 'Tu centro de comando para todos tus clientes',
    body: `<p>Con el <strong>Multi RFC</strong> de Alegra puedes gestionar la contabilidad de todas tus empresas cliente en México desde un solo panel, sin necesidad de múltiples cuentas ni contraseñas.</p>
<p><strong>¿Qué puedes hacer desde aquí?</strong></p>
<ul>
  <li>Añadir clientes con distintos RFC y cambiar entre ellos con un clic.</li>
  <li>Ver indicadores estratégicos de cada empresa desde un panel centralizado.</li>
  <li>Gestionar y asignar tareas contables pendientes por cliente.</li>
  <li>Acceder al Contabilizador Fiscal para procesar CFDI de forma masiva.</li>
</ul>
<p><strong>¿Cómo añadir un cliente?</strong></p>
<ol>
  <li>Ve a <strong>Alegra Contabilidad → Espacio Contador → Clientes</strong>.</li>
  <li>Haz clic en <strong>"Añadir cliente"</strong> e ingresa su RFC y correo.</li>
  <li>El sistema envía la invitación automáticamente.</li>
</ol>`,
    tip: 'Asegúrate de ingresar el <strong>correo electrónico válido</strong> de cada cliente. Sin él no podrán acceder a su contabilidad ni aceptar la vinculación.',
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Que%20es%20MultiRFC.mp4?hsLang=es',
    helpLink: { text: 'Multi RFC — México', url: 'https://ayuda.alegra.com/int/multi-rfc-alegra-mex' },
    isIntro: true,
  },
  {
    id: 'mex-1',
    sidebarTitle: 'Configuración empresa',
    displayNumber: 1,
    progressStep: 1,
    tag: 'Información base de tu empresa',
    estimatedMinutes: 10,
    heading: 'Configura la información fiscal de tu empresa',
    body: `<p>Esta configuración define los datos que aparecerán en todos tus CFDI emitidos ante el SAT. Es fundamental que coincidan exactamente con tu constancia de situación fiscal.</p>
<p><strong>¿Dónde hacerlo?</strong> Ve a <strong>Configuración → Empresa</strong>.</p>
<p><strong>Qué debes completar:</strong></p>
<ol>
  <li><strong>Nombre o razón social</strong> — tal como aparece en el SAT.</li>
  <li><strong>RFC</strong> — Registro Federal de Contribuyentes (con homoclave).</li>
  <li><strong>Régimen fiscal</strong> — selecciona el que aplica a tu empresa.</li>
  <li><strong>Código Postal fiscal</strong> — obligatorio para CFDI 4.0.</li>
  <li><strong>Dirección, teléfono y correo electrónico</strong>.</li>
  <li><strong>Logo</strong> (opcional). Máximo 2 MB.</li>
</ol>`,
    tip: 'El RFC y el Código Postal fiscal deben coincidir <strong>exactamente</strong> con los de tu constancia de situación fiscal. El SAT rechaza CFDI con datos que no coincidan.',
    helpLink: { text: 'Actualizar información de la empresa — México', url: 'https://ayuda.alegra.com/int/actualiza-la-informacion-de-tu-empresa-mexico' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Configuracion%20empresa.mp4?hsLang=es',
  },
  {
    id: 'mex-2',
    sidebarTitle: 'Catálogo de cuentas',
    displayNumber: 2,
    progressStep: 2,
    tag: 'Estructura contable',
    estimatedMinutes: 20,
    heading: 'Importa y configura tu catálogo de cuentas contables',
    body: `<p>El catálogo de cuentas clasifica todos tus movimientos financieros. En México debe estar alineado al catálogo del SAT para generar la contabilidad electrónica correctamente.</p>
<p><strong>¿Cómo importarlo?</strong></p>
<ol>
  <li>Ve a <strong>Contabilidad → Catálogo de cuentas → Importar</strong>.</li>
  <li>Descarga la plantilla y completa las cuentas con sus códigos SAT correspondientes.</li>
  <li>Sube el archivo y verifica que todas las cuentas quedaron bien configuradas.</li>
  <li>Ajusta o crea cuentas adicionales según tus necesidades.</li>
</ol>`,
    tip: 'Puedes apoyarte en el <strong>caso práctico</strong> que ofrece la guía de Alegra para ver cómo estructurar el catálogo con los códigos SAT requeridos para la contabilidad electrónica.',
    helpLink: { text: 'Importar catálogo de cuentas — México', url: 'https://ayuda.alegra.com/int/aprende-a-importar-tu-catalogo-de-cuentas-contables-en-alegra-mexico' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Impor_catalogo_sheets_IA.mp4?hsLang=es',
  },
  {
    id: 'mex-3',
    sidebarTitle: 'Contactos',
    displayNumber: 3,
    progressStep: 3,
    tag: 'Clientes y proveedores',
    estimatedMinutes: 15,
    heading: 'Importa tus contactos: clientes y proveedores',
    body: `<p>Con tus contactos cargados podrás emitir CFDI, registrar compras y llevar seguimiento de operaciones desde el primer día.</p>
<p><strong>Opción 1 — Importación masiva:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Importar contactos</strong> y descarga la plantilla.</li>
  <li>Completa: nombre, <strong>RFC</strong>, correo electrónico y tipo (cliente, proveedor o ambos).</li>
  <li>Sube el archivo y corrige los errores señalados.</li>
</ol>
<p><strong>Opción 2 — Creación manual:</strong></p>
<ol>
  <li>Ve a <strong>Contactos → Nuevo contacto</strong> e ingresa los datos.</li>
</ol>`,
    tip: 'Verifica que el <strong>RFC de cada contacto sea correcto</strong> antes de importar. Un RFC inválido en un CFDI 4.0 puede generar rechazos del SAT.',
    helpLink: { text: 'Crear o importar contactos — México', url: 'https://ayuda.alegra.com/int/crea-o-importa-contactos-alegra-mex' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Nuevo%20contacto.mp4?hsLang=es',
  },
  {
    id: 'mex-4',
    sidebarTitle: 'Productos y servicios',
    displayNumber: 4,
    progressStep: 4,
    tag: 'Inventario y catálogo',
    estimatedMinutes: 20,
    heading: 'Carga tus productos y servicios en Alegra',
    body: `<p>Con tu catálogo listo podrás emitir CFDI seleccionando el producto directamente, con su clave SAT, precio e impuesto ya configurados.</p>
<p><strong>¿Cómo importarlos?</strong></p>
<ol>
  <li>Ve a <strong>Inventario → Gestión de artículos → Importar artículos</strong>.</li>
  <li>Descarga la plantilla y completa: nombre, <strong>clave de producto SAT</strong>, precio, IVA y costo unitario.</li>
  <li>Para productos físicos con inventario agrega también la <strong>cantidad inicial</strong>.</li>
  <li>Sube el archivo y selecciona si es <strong>Inventariable</strong> o <strong>No inventariable / Servicio</strong>.</li>
</ol>`,
    note: 'La <strong>clave de producto o servicio del SAT</strong> es obligatoria en CFDI 4.0. Puedes consultarla en el catálogo del SAT en su portal oficial.',
    helpLink: { text: 'Crea productos y servicios para CFDI 4.0 — México', url: 'https://ayuda.alegra.com/int/crea-tus-productos-y-servicios-para-facturar-cfdi-4.0-m%C3%A9xico' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Crear-producto-con-informacion-contable-Mexico.mp4?hsLang=es',
  },
  {
    id: 'mex-5',
    sidebarTitle: 'Habilitación SAT',
    displayNumber: 5,
    progressStep: 5,
    tag: 'Requisito legal — SAT',
    estimatedMinutes: 30,
    heading: 'Activa la facturación electrónica CFDI 4.0 con el SAT',
    body: `<p>En México la emisión de CFDI 4.0 es obligatoria. Este paso conecta Alegra con el SAT para que tus facturas tengan validez fiscal.</p>
<p><strong>¿Cómo habilitarte?</strong></p>
<ol>
  <li>Ve a <strong>Configuración → Facturación Electrónica</strong> en Alegra.</li>
  <li>Ingresa tu RFC y los datos de tu <strong>certificado de sello digital (CSD)</strong>: archivo .cer, archivo .key y contraseña.</li>
  <li>Guarda la configuración y emite una <strong>factura de prueba</strong> para verificar la integración.</li>
  <li>Confirma que el CFDI se timbró correctamente antes de emitir facturas reales.</li>
</ol>`,
    note: 'Valida directamente en Alegra que la configuración sea correcta — la guía puede no estar actualizada con los últimos cambios del SAT.',
    helpLink: { text: 'Habilitar facturación electrónica — México', url: 'https://ayuda.alegra.com/int/pasos-para-habilitar-tu-facturaci%C3%B3n-electr%C3%B3nica-en-alegra-m%C3%A9xico' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/Habilitar%20FE%20-%20AC%20MEX%20-%204.mp4?hsLang=es',
    badges: ['Alegra', 'SAT'],
  },
  {
    id: 'mex-6',
    sidebarTitle: 'Saldos iniciales',
    displayNumber: 6,
    progressStep: 6,
    tag: 'Cierre de migración contable',
    estimatedMinutes: 25,
    heading: 'Ingresa los saldos iniciales de tus cuentas contables',
    body: `<p>Los saldos iniciales son los valores con los que cierras tu sistema anterior y arrancas en Alegra. Sin ellos, tus estados financieros no reflejarán la realidad de tu empresa.</p>
<p><strong>¿Dónde hacerlo?</strong></p>
<p>Ve a <strong>Contabilidad → Catálogo de cuentas → Saldos iniciales</strong>.</p>
<p><strong>¿Cómo ingresarlos?</strong></p>
<ol>
  <li>Selecciona la <strong>fecha de corte</strong> (último día de tu período anterior).</li>
  <li>Ingresa los saldos manualmente o importa desde Excel para volúmenes grandes.</li>
  <li>Incluye cuentas por cobrar, cuentas por pagar e inventario inicial si aplica.</li>
  <li>Verifica la ecuación patrimonial: <strong>Activos = Pasivos + Patrimonio</strong>.</li>
  <li>Consulta el balance de comprobación para validar que todo cuadra.</li>
</ol>`,
    note: 'Si ya registraste Bancos e Inventario directamente en sus módulos, <strong>ingresa esos mismos valores en negativo en Patrimonio</strong> para evitar duplicación contable.',
    helpLink: { text: 'Guía de saldos iniciales — México', url: 'https://ayuda.alegra.com/int/ingresa-los-saldos-iniciales-de-tus-cuentas-contables-mex' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Ingresar%20saldos%20inciales-%20sync_1.mp4?hsLang=es',
  },
  {
    id: 'mex-bonus',
    sidebarTitle: 'Contabilizador Fiscal',
    statusLabel: 'Bonus',
    displayNumber: null,
    progressStep: null,
    tag: 'Bonus — Solo México',
    heading: 'Contabilizador Fiscal: registra todos tus CFDI de una sola vez',
    body: `<p>El <strong>Contabilizador Fiscal</strong> es una herramienta exclusiva de México que te permite seleccionar múltiples CFDI desde el papel de trabajo y contabilizarlos todos en un solo proceso, ahorrando horas de trabajo manual.</p>
<p><strong>¿Qué documentos puedes contabilizar de forma masiva?</strong></p>
<ul>
  <li><strong>CFDI recibidos</strong> — facturas de compras y gastos.</li>
  <li><strong>CFDI emitidos</strong> — facturas de ventas.</li>
</ul>
<p><strong>Beneficios clave:</strong></p>
<ul>
  <li>Registra múltiples CFDI en un solo clic en lugar de uno por uno.</li>
  <li>Autocompletado inteligente: el sistema reconoce los conceptos más comunes.</li>
  <li>Validación automática de campos incompletos antes de registrar — evita errores.</li>
  <li>Reducción significativa del tiempo de cierre contable mensual.</li>
</ul>`,
    tip: 'Úsalo especialmente al cierre de mes cuando tienes decenas de CFDI pendientes de contabilizar. Es la función que más tiempo ahorra a los contadores en México.',
    helpLink: { text: 'Contabilización masiva — México', url: 'https://ayuda.alegra.com/int/contabilizacion-masiva-en-el-contabilizador-fiscal-mex' },
    mediaType: 'video',
    mediaSrc: 'https://ayuda.alegra.com/hubfs/Im%C3%A1genes%20ayudas/MEX_AC_Contabilizador%20panel%20de%20trabahjo.mp4?hsLang=es',
    isIntro: true,
  },
];

export const COUNTRY_STEPS = {
  colombia: COLOMBIA_STEPS,
  costarica: COSTA_RICA_STEPS,
  dominicana: DOMINICANA_STEPS,
  mexico: MEXICO_STEPS,
};

// Devuelve los pasos según país y tipo de usuario
export function getSteps(countryCode, userType) {
  const allSteps = COUNTRY_STEPS[countryCode] || [];
  if (userType === 'pyme') {
    return allSteps.filter(s => s.id !== `${countryCode.replace('dominicana','dom').replace('colombia','col').replace('costarica','cri').replace('mexico','mex')}-espacio` && s.statusLabel !== 'Comienza aquí');
  }
  return allSteps;
}
