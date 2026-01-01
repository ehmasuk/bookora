import { Tour } from "nextstepjs";

const bookstepsEnglish: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Welcome",
        content: "A quick guide to help you understand how to use this tool.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Title",
        content: "This is your book title. Click on it to edit anytime.",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Sidebar",
        content: "This button toggles the book sidebar on and off.",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Chapter",
        content: "Click here to create a new chapter for your book.",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "✍️",
        title: "Sections",
        content: "Each chapter can have sections. Add section names and start writing inside them.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsSpanish: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Bienvenido",
        content: "Una guía rápida para ayudarte a usar esta herramienta.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Título",
        content: "Este es el título de tu libro. Haz clic para editarlo.",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Barra",
        content: "Este botón muestra u oculta la barra lateral del libro.",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Capítulo",
        content: "Haz clic aquí para crear un nuevo capítulo.",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "✍️",
        title: "Secciones",
        content: "Cada capítulo puede tener secciones. Añade nombres de secciones y empieza a escribir en ellas.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsGerman: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Willkommen",
        content: "Eine kurze Einführung, wie du dieses Tool verwenden kannst.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Titel",
        content: "Dies ist dein Buchtitel. Klicke, um ihn zu bearbeiten.",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Leiste",
        content: "Mit diesem Schalter kannst du die Seitenleiste ein- oder ausblenden.",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Kapitel",
        content: "Hier kannst du ein neues Kapitel erstellen.",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "✍️",
        title: "Abschnitte",
        content: "Jedes Kapitel kann Abschnitte enthalten. Füge Abschnittsnamen hinzu und beginne darin zu schreiben.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

const bookstepsFrench: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        icon: "👋",
        title: "Accueil",
        content: "Un guide rapide pour apprendre à utiliser cet outil.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🚀",
        title: "Titre",
        content: "Ceci est le titre de ton livre. Clique pour le modifier.",
        selector: "#book-name",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "🙂",
        title: "Menu",
        content: "Ce bouton permet d’afficher ou de masquer la barre latérale.",
        selector: "#book-sidebar-toggler",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "📘",
        title: "Chapitre",
        content: "Clique ici pour créer un nouveau chapitre.",
        selector: "#create-new-chapter-icon",
        side: "bottom",
        showControls: true,
        showSkip: true,
      },
      {
        icon: "✍️",
        title: "Sections",
        content: "Chaque chapitre peut contenir des sections. Ajoute des noms de sections et commence à écrire dedans.",
        side: "right",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

export { bookstepsEnglish, bookstepsFrench, bookstepsGerman, bookstepsSpanish };
