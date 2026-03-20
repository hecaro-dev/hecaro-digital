/* =============================================
   SPANISH TRANSLATIONS
   ============================================= */
import { Translations } from "./de";

export const es: Translations = {
  lang: "es",
  langName: "Español",
  meta: {
    title: "Digital Solutions – Diseño Web Premium & SEO",
    description:
      "Desarrollo web profesional con Next.js, resultados de SEO medibles y consultoría digital para su negocio. Su socio para una presencia online sólida.",
  },
  nav: {
    services: "Servicios",
    about: "Sobre mí",
    contact: "Contacto",
    imprint: "Aviso legal",
    privacy: "Privacidad",
  },
  hero: {
    badge: "Empresa Individual · Disponible Mundialmente",
    headline: "Diseño Web Premium\n& Soluciones SEO",
    sub: "Resultados medibles para su negocio. Soluciones digitales personalizadas que posicionan su marca profesionalmente en internet.",
    cta: "Iniciar Proyecto",
    cta2: "Ver Servicios",
  },
  stats: [
    { value: "100%", label: "Satisfacción del Cliente" },
    { value: "Top 10", label: "Rankings en Google" },
    { value: "< 1s", label: "Tiempo de Carga (LCP)" },
    { value: "3", label: "Idiomas Soportados" },
  ],
  services: {
    label: "Servicios",
    headline: "Lo que hago por usted",
    sub: "Cada solución se desarrolla individualmente – para el máximo rendimiento y éxito medible.",
    items: [
      {
        title: "Landing Pages con Next.js",
        description:
          "Landing pages ultrarrápidas y orientadas a la conversión, construidas con Next.js y TypeScript. Optimizadas para Core Web Vitals – puntuaciones perfectas en Lighthouse garantizadas.",
        bullets: [
          "Renderizado en el servidor (SSR) y generación estática",
          "Mobile-first, completamente responsivo",
          "Optimizado para conversión y listo para A/B testing",
          "Lighthouse Score 95+",
        ],
      },
      {
        title: "Estrategia SEO",
        description:
          "Visibilidad sostenible en Google a nivel mundial. SEO técnico, estrategia de palabras clave y datos estructurados – para que sus clientes le encuentren.",
        bullets: [
          "Auditoría SEO técnica y optimización on-page",
          "Implementación internacional de hreflang",
          "Datos estructurados JSON-LD",
          "Gestión de Google Search Console",
        ],
      },
      {
        title: "Consultoría Digital",
        description:
          "Configuraciones profesionales de home office y streaming. OBS, iluminación, audio – para que aparezca tan profesional en línea como lo es en la realidad.",
        bullets: [
          "Configuración de OBS Studio y escenas",
          "Concepto de iluminación para videollamadas",
          "Optimización de audio (micrófono, cancelación de ruido)",
          "Flujo de trabajo para creadores y empresarios",
        ],
      },
    ],
  },
  about: {
    label: "Sobre mí",
    headline: "Base Comercial.\nExcelencia Digital.",
    p1: "Digital Solutions es mi empresa individual – construida sobre una sólida formación comercial en logística de carga y retail. Esta base me da una profunda comprensión de los procesos, la fiabilidad y la gestión estructurada de proyectos.",
    p2: "Lo que hago, lo hago de forma completa: comunicación clara, entrega a tiempo, resultados medibles. Sin externalización, sin compromisos. Trabaja directamente conmigo.",
    values: [
      { title: "Fiabilidad", desc: "Entrega según lo acordado – a tiempo y completa." },
      { title: "Transparencia", desc: "Procesos claros, resultados trazables." },
      { title: "Calidad", desc: "Nivel de agencia desde una sola fuente." },
    ],
  },
  contact: {
    label: "Contacto",
    headline: "Iniciar Proyecto",
    sub: "Describa su proyecto – le responderé en 24 horas.",
    namePlaceholder: "Su nombre",
    emailPlaceholder: "Su correo electrónico",
    messagePlaceholder: "Describa su proyecto...",
    gdpr: "Acepto el tratamiento de mis datos de acuerdo con la política de privacidad.*",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "¡Gracias! Su mensaje ha sido enviado.",
    error: "Ocurrió un error. Por favor inténtelo de nuevo.",
    required: "Campo obligatorio",
    invalidEmail: "Dirección de correo no válida",
    gdprRequired: "Por favor acepte la política de privacidad",
  },
  legal: {
    imprintTitle: "Aviso Legal",
    imprintText:
      "Información según § 5 TMG\n\n[Su nombre]\n[Su dirección]\n[Código postal Ciudad]\n\nContacto:\nCorreo: [su@correo.com]\n\nNúmero de identificación fiscal según § 27 a de la Ley del IVA:\n[Su NIF/CIF]\n\nResponsable del contenido según § 55 párr. 2 RStV:\n[Su nombre]\n[Su dirección]",
    privacyTitle: "Política de Privacidad",
    privacyText:
      "1. Privacidad de un vistazo\n\nInformación general\nLa siguiente información proporciona una descripción general simple de lo que sucede con sus datos personales cuando visita este sitio web.\n\n2. Recopilación de datos en este sitio web\n\nFormulario de contacto\nSi nos envía consultas a través de nuestro formulario de contacto, sus datos del formulario de consulta se almacenarán para el propósito de procesar la consulta.\n\n[Política de privacidad completa se insertará aquí]",
  },
  footer: {
    rights: "Todos los derechos reservados.",
  },
};
