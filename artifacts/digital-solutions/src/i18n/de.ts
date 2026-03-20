/* =============================================
   GERMAN TRANSLATIONS (Default Language)
   ============================================= */
export const de = {
  lang: "de",
  langName: "Deutsch",
  meta: {
    title: "Digital Solutions – High-End Webdesign & SEO",
    description:
      "Professionelle Webentwicklung mit Next.js, messbare SEO-Ergebnisse und digitale Beratung für Ihr Business. Ihr Partner für eine starke Online-Präsenz.",
  },
  nav: {
    services: "Leistungen",
    about: "Über mich",
    contact: "Kontakt",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  hero: {
    badge: "Einzelunternehmen · Weltweit verfügbar",
    headline: "High-End Webdesign\n& SEO-Lösungen",
    sub: "Messbare Ergebnisse für Ihr Business. Maßgeschneiderte digitale Lösungen, die Ihre Marke professionell im Netz positionieren.",
    cta: "Projekt starten",
    cta2: "Leistungen ansehen",
  },
  stats: [
    { value: "100%", label: "Kundenzufriedenheit" },
    { value: "Top 10", label: "Google-Rankings" },
    { value: "< 1s", label: "Ladezeit (LCP)" },
    { value: "3", label: "Sprachen unterstützt" },
  ],
  services: {
    label: "Leistungen",
    headline: "Was ich für Sie tue",
    sub: "Jede Lösung wird individuell entwickelt – für maximale Performance und messbaren Erfolg.",
    items: [
      {
        title: "Next.js Landing Pages",
        description:
          "Blitzschnelle, konversionsorientierte Landing Pages gebaut mit Next.js und TypeScript. Optimiert für Core Web Vitals – perfekte Lighthouse-Scores garantiert.",
        bullets: [
          "Server-Side Rendering (SSR) & Static Generation",
          "Mobile-first, vollständig responsive",
          "Konversionsoptimiert & A/B-testbereit",
          "Lighthouse Score 95+",
        ],
      },
      {
        title: "SEO-Strategie",
        description:
          "Nachhaltige Sichtbarkeit bei Google weltweit. Technisches SEO, Keyword-Strategie und Structured Data – damit Ihre Kunden Sie finden.",
        bullets: [
          "Technisches SEO-Audit & On-Page-Optimierung",
          "Internationale Hreflang-Implementierung",
          "JSON-LD Structured Data",
          "Google Search Console Betreuung",
        ],
      },
      {
        title: "Digital Consulting",
        description:
          "Professionelle Home-Office & Streaming-Setups. OBS, Licht, Audio – damit Sie online so professionell auftreten wie Sie sind.",
        bullets: [
          "OBS Studio Setup & Szenen-Konfiguration",
          "Beleuchtungskonzept für Video-Calls",
          "Audiooptimierung (Mikrofon, Noise-Cancelling)",
          "Software-Workflow für Creator & Unternehmer",
        ],
      },
    ],
  },
  about: {
    label: "Über mich",
    headline: "Kaufmännisches Fundament.\nDigitale Exzellenz.",
    p1: "Digital Solutions ist mein Einzelunternehmen – gegründet auf einer soliden kaufmännischen Ausbildung in Spedition und Einzelhandel. Diese Basis gibt mir ein tiefes Verständnis für Prozesse, Zuverlässigkeit und strukturiertes Projektmanagement.",
    p2: "Was ich tue, tue ich vollständig: klare Kommunikation, termingerechte Lieferung, messbare Ergebnisse. Kein Outsourcing, keine Kompromisse. Sie arbeiten direkt mit mir.",
    values: [
      { title: "Zuverlässigkeit", desc: "Lieferung wie vereinbart – pünktlich und vollständig." },
      { title: "Transparenz", desc: "Klare Prozesse, nachvollziehbare Ergebnisse." },
      { title: "Qualität", desc: "Agentur-Niveau aus einer Hand." },
    ],
  },
  contact: {
    label: "Kontakt",
    headline: "Projekt starten",
    sub: "Beschreiben Sie Ihr Vorhaben – ich melde mich innerhalb von 24 Stunden.",
    namePlaceholder: "Ihr Name",
    emailPlaceholder: "Ihre E-Mail",
    messagePlaceholder: "Beschreiben Sie Ihr Projekt...",
    gdpr: "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.*",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    success: "Vielen Dank! Ihre Nachricht wurde gesendet.",
    error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    required: "Pflichtfeld",
    invalidEmail: "Ungültige E-Mail-Adresse",
    gdprRequired: "Bitte stimmen Sie der Datenschutzerklärung zu",
  },
  legal: {
    imprintTitle: "Impressum",
    imprintText:
      "Angaben gemäß § 5 TMG\n\n[Ihr Name]\n[Ihre Adresse]\n[PLZ Ort]\n\nKontakt:\nE-Mail: [ihre@email.de]\n\nUmsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\n[Ihre USt-IdNr.]\n\nVerantwortlich für den Inhalt nach § 55 Abs. 2 RStV:\n[Ihr Name]\n[Ihre Adresse]",
    privacyTitle: "Datenschutzerklärung",
    privacyText:
      "1. Datenschutz auf einen Blick\n\nAllgemeine Hinweise\nDie folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.\n\n2. Datenerfassung auf dieser Website\n\nKontaktformular\nWenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.\n\n[Vollständige Datenschutzerklärung wird hier eingefügt]",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
  },
};

export type Translations = typeof de;
