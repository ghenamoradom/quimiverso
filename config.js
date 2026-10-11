/*
  ENLACES DEL CURSO — este es el único archivo que necesitas editar para cambiar enlaces.
  En GitHub: abre este archivo, pulsa el lápiz (Edit), cambia el texto entre comillas y pulsa "Commit changes".
  Deja "" (comillas vacías) en lo que aún no tengas: el sitio mostrará "Disponible pronto".
*/
window.CURSO = {
  // Diapositivas de las clases magistrales (Drive, Canva, Google Slides, etc.)
  // (#page=N abre el PDF en esa diapositiva)
  diapositivas: "recursos/clase-gases.pdf",                    // Presentación completa de la unidad
  diapositivas1: "recursos/clase-gases.pdf#page=2",            // Semana 1 · gas ideal, Boyle y Charles
  diapositivas2: "recursos/clase-gases.pdf#page=10",           // Semana 2 · Gay-Lussac, Avogadro y PV = nRT
  diapositivasDaltonGraham: "recursos/clase-gases.pdf#page=13", // Semana 3 · Dalton y Graham

  // Carpeta de Drive donde los estudiantes leen la realimentación
  carpetaDrive: "https://drive.google.com/drive/folders/1SKV59I5IHOKuDHUGLpGVUiqklnBJVI5n?usp=drive_link",

  // Simuladores externos
  phetPropiedades: "https://phet.colorado.edu/es/simulations/gas-properties",
  phetGases: "https://phet.colorado.edu/es/simulations/gases-intro",
  simuladorTexas: "https://ch301.cm.utexas.edu/gases/#kmt/gas-simulator.html", // Universidad de Texas (en inglés)
  simuladorAACT: "https://teachchemistry.org/simulations/2026/gases/",        // AACT · The Behavior of Gases, con preguntas (en inglés)

  // Trivia (semana 3)
  trivia: "https://trivia-quimica.vercel.app",

  // Rúbricas completas (documento o PDF). En la página de evaluación ya aparecen los requisitos básicos.
  rubricaCarteleras: "",
  rubricaVideo: "",
  rubricaInfografia: "",

  // Envío de carteleras digitales, videoresúmenes e infografías (formulario o carpeta)
  entregas: ""
};

/* Conexión con la base de datos (Supabase). Esta clave es pública por diseño: la base
   solo acepta lo que permiten sus funciones; no la cambies salvo que cambies de proyecto. */
window.SUPABASE = {
  url: "https://uaauvtgsfqplbighacde.supabase.co",
  key: "sb_publishable_R2tckehXws1o-mO7DgUcXQ_7GkVBY0V"
};
