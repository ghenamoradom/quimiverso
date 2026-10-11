/* Estructura del tema «El mundo de los gases»: semanas, sesiones y actividades en orden.
   Los códigos de actividad deben coincidir con la tabla «actividades» de la base de datos. */
window.GASES = {
  semanas: [
    { n: 1, titulo: 'Presión, volumen y temperatura', leyes: 'Boyle · Charles · Teoría cinético-molecular', formula: 'P·V = k · V/T = k' },
    { n: 2, titulo: 'Temperatura, presión y cantidad de gas', leyes: 'Gay-Lussac · Avogadro · PV = nRT', formula: 'P/T = k · PV = nRT' },
    { n: 3, titulo: 'Mezclas de gases y difusión', leyes: 'Dalton · Graham', formula: 'Pₜ = ΣPᵢ · v₁/v₂ = √(M₂/M₁)' }
  ],
  sesiones: [
    { id: '1-1', semana: 1, n: 1, lugar: 'Aula', titulo: 'Boyle, Charles y la teoría cinético-molecular',
      desc: 'Conoces las leyes de Boyle y Charles en la clase magistral, las exploras en los simuladores PhET y las aplicas en un reto contextualizado.' },
    { id: '1-2', semana: 1, n: 2, lugar: 'Laboratorio', titulo: 'Laboratorio de gases #1',
      desc: 'Practicas Boyle y Charles en los laboratorios virtuales y luego compruebas las dos leyes en el laboratorio real con tu grupo.' },
    { id: '2-1', semana: 2, n: 1, lugar: 'Aula', titulo: 'Gay-Lussac, Avogadro y el gas ideal',
      desc: 'Estudias Gay-Lussac, Avogadro y PV = nRT, trabajas con simuladores en inglés y resuelves tres casos de la vida diaria con una prueba final.' },
    { id: '2-2', semana: 2, n: 2, lugar: 'Laboratorio', titulo: 'Laboratorio de gases #2',
      desc: 'Practicas Avogadro en el laboratorio virtual y compruebas Gay-Lussac y Avogadro en el laboratorio real. Entregas un videoresumen.' },
    { id: '3-1', semana: 3, n: 1, lugar: 'Aula', titulo: 'Dalton y Graham: clase invertida y trivia',
      desc: 'Preparas y expones una cartelera sobre un tema de gases y compites en una trivia de tres retos de dificultad creciente.' },
    { id: '3-2', semana: 3, n: 2, lugar: 'Laboratorio', titulo: 'Laboratorio de gases #3',
      desc: 'Practicas Graham en el laboratorio virtual y compruebas Graham y Dalton en el laboratorio real. Entregas una infografía.' }
  ],
  actividades: [
    { c: 's1-clase', s: '1-1', titulo: 'Clase magistral 1', tipo: 'Aprendizaje activo',
      desc: 'Leyes de Boyle y Charles y postulados de la teoría cinético-molecular, con un video corto de cada fenómeno. Participa, pasa al tablero a resolver ejercicios y toma apuntes.',
      rec: [['Diapositivas semana 1', 'diapositivas1']], ent: 'Apuntes en el cuaderno, individuales.' },
    { c: 's1-phet', s: '1-1', titulo: 'Simulaciones PhET', tipo: 'Aprendizaje basado en ciencias',
      desc: 'Cambia presión, volumen y temperatura, observa las partículas, toma datos y haz tablas y gráficas en el cuaderno. Explica lo que pasa con la teoría cinético-molecular.',
      rec: [['Propiedades de los gases', 'phetPropiedades'], ['Gases: introducción', 'phetGases']], ent: 'Cuaderno: datos, gráficas del simulador y explicación escrita.' },
    { c: 's1-reto', s: '1-1', titulo: 'Situación problema: el paseo al páramo', tipo: 'Aprendizaje basado en problemas',
      desc: 'Resuelve el reto aplicando las leyes de Boyle y Charles: predice, calcula, evalúa tu predicción y propone una solución. Después lee la realimentación en tu carpeta de Drive.',
      rec: [['Abrir el reto', null, 'reto.html', true], ['Carpeta de Drive', 'carpetaDrive']], ent: 'Formulario digital del reto.' },
    { c: 's1-vboyle', s: '1-2', titulo: 'Laboratorio virtual de Boyle', tipo: 'Preparación del laboratorio',
      desc: 'Lee la guía y haz la práctica virtual: monta la jeringa, mide el volumen con distintas masas, comprueba la ley y responde la evaluación.',
      rec: [['Guía de Boyle', null, 'guias/boyle.html'], ['Abrir laboratorio', null, 'laboratorios/#boyle', true]], ent: 'Registro automático y evaluación del laboratorio virtual.' },
    { c: 's1-vcharles', s: '1-2', titulo: 'Laboratorio virtual de Charles', tipo: 'Preparación del laboratorio',
      desc: 'Lee la guía y haz la práctica virtual: mide el volumen de la jeringa en tres baños de agua y estima el cero absoluto.',
      rec: [['Guía de Charles', null, 'guias/charles.html'], ['Abrir laboratorio', null, 'laboratorios/#charles', true]], ent: 'Registro automático y evaluación del laboratorio virtual.' },
    { c: 's1-lab', s: '1-2', titulo: 'Laboratorio de gases #1 · Boyle y Charles', tipo: 'Aprendizaje colaborativo',
      desc: 'En el laboratorio real, con tu grupo, compruebas las leyes de Boyle y Charles. Lleva tu hipótesis, el diagrama de flujo y los resultados de la práctica virtual. Materiales: jeringas, pesas, globos, recipientes, termómetro, balanza, hielo y agua caliente.',
      rec: [['Preinforme', null, 'evaluacion.html#preinforme'], ['Informe de práctica', null, 'evaluacion.html#informe']], ent: 'Preinforme a mano al terminar e informe digital 7 días después, en grupo.' },
    { c: 's2-clase', s: '2-1', titulo: 'Clase magistral 2', tipo: 'Aprendizaje activo',
      desc: 'Leyes de Gay-Lussac y Avogadro, ley combinada y ecuación de los gases ideales (PV = nRT), con ejercicios resueltos y preguntas tipo ICFES.',
      rec: [['Diapositivas semana 2', 'diapositivas2']], ent: 'Apuntes en el cuaderno, individuales.' },
    { c: 's2-sim', s: '2-1', titulo: 'Simulaciones en inglés', tipo: 'Aprendizaje basado en ciencias',
      desc: 'Varía temperatura, presión y cantidad de sustancia en los simuladores de la Universidad de Texas y de la AACT. Toma datos, haz gráficas y responde las preguntas de la simulación.',
      rec: [['Simulador U. de Texas', 'simuladorTexas'], ['Simulación AACT', 'simuladorAACT']], ent: 'Cuaderno: datos, gráficas y explicación.' },
    { c: 's2-casos', s: '2-1', titulo: 'Estudio de casos: gases en la vida diaria', tipo: 'Aprendizaje basado en casos',
      desc: 'Olla a presión, llantas en verano y airbag: comprende, modela y explica cada caso y termina con la prueba de selección múltiple.',
      rec: [['Abrir los casos', null, 'casos.html', true], ['Carpeta de Drive', 'carpetaDrive']], ent: 'Prueba de selección múltiple con única respuesta.' },
    { c: 's2-vavogadro', s: '2-2', titulo: 'Laboratorio virtual de Avogadro', tipo: 'Preparación del laboratorio',
      desc: 'Lee la guía y haz la práctica virtual: produce CO₂ con 3, 6 y 12 g de bicarbonato, mide los globos y comprueba la ley.',
      rec: [['Guía de Avogadro', null, 'guias/avogadro.html'], ['Abrir laboratorio', null, 'laboratorios/#avogadro', true]], ent: 'Registro automático y evaluación del laboratorio virtual.' },
    { c: 's2-lab', s: '2-2', titulo: 'Laboratorio de gases #2 · Gay-Lussac y Avogadro', tipo: 'Aprendizaje colaborativo',
      desc: 'En el laboratorio real compruebas la ley de Gay-Lussac y el principio de Avogadro con una reacción que produce gas. Materiales: latas, mechero o plancha, pinzas, agua fría, bicarbonato, ácido acético, globos, balanza y cinta métrica.',
      rec: [['Videoresumen', null, 'evaluacion.html#video'], ['Informe de práctica', null, 'evaluacion.html#informe']], ent: 'Videoresumen de máximo 2 minutos e informe digital, en grupo.' },
    { c: 's3-carteleras', s: '3-1', titulo: 'Clase invertida: juego de carteleras', tipo: 'Flipped classroom',
      desc: 'Antes de clase prepara con tu grupo el tema asignado usando las diapositivas de las tres semanas y envía el diseño digital. En clase instala la cartelera y preséntala.',
      rec: [['Diapositivas semana 1', 'diapositivas1'], ['Diapositivas semana 2', 'diapositivas2'], ['Dalton y Graham', 'diapositivasDaltonGraham'], ['Rúbrica de carteleras', null, 'evaluacion.html#carteleras']], ent: 'Cartelera grupal de 100 × 90 cm, digital e impresa.' },
    { c: 's3-trivia', s: '3-1', titulo: 'Trivia: concurso de puntos', tipo: 'Aprendizaje basado en juegos',
      desc: 'Regístrate en la trivia y responde tres retos de dificultad creciente con preguntas hechas a partir de las carteleras.',
      rec: [['Entrar a la trivia', 'trivia', null, true]], ent: 'Cuestionario de trivia.' },
    { c: 's3-vgraham', s: '3-2', titulo: 'Laboratorio virtual de Graham', tipo: 'Preparación del laboratorio',
      desc: 'Lee la guía y haz la práctica virtual: NH₃ y HCl se difunden por un tubo, cronometra el anillo y compara las velocidades.',
      rec: [['Guía de Graham', null, 'guias/graham.html'], ['Abrir laboratorio', null, 'laboratorios/#graham', true]], ent: 'Registro automático y evaluación del laboratorio virtual.' },
    { c: 's3-lab', s: '3-2', titulo: 'Laboratorio de gases #3 · Graham y Dalton', tipo: 'Aprendizaje colaborativo',
      desc: 'En el laboratorio real compruebas la ley de Graham con la difusión de NH₃ y HCl y la ley de Dalton recogiendo gas sobre agua. El NH₃ y el HCl los manipula solo el profesor, en un espacio ventilado.',
      rec: [['Infografía', null, 'evaluacion.html#infografia'], ['Informe de práctica', null, 'evaluacion.html#informe']], ent: 'Infografía con los pasos del método científico e informe digital, en grupo.' }
  ]
};

/* ---------- Detalles: indicaciones, entregas en Drive y presentaciones ---------- */
(function(){
  const A = window.GASES.actividades, f = c => A.find(a => a.c === c);
  const lab = (nombre, archivo) => ({
    pasos: [{ t: 'Qué debes hacer', items: [
      'Lee la guía de la práctica antes de entrar al laboratorio.',
      'Haz la práctica virtual completa, anota tus datos en el cuaderno virtual y responde la evaluación.',
      'Elabora el informe de la práctica con tus datos: portada, introducción, teoría relacionada, objetivos, materiales, resultados y discusión, conclusión, evaluación, autoevaluación, bibliografía y anexos.',
      'Sube el informe a tu carpeta de Drive.'] }],
    drive: 'Sube el informe de la práctica virtual de ' + nombre + ' a tu carpeta de Drive. Nombra el archivo así: Curso_Apellido_' + archivo + ' (por ejemplo, 10-1_Perez_' + archivo + ').',
    ent: 'Informe de la práctica virtual, subido a tu carpeta de Drive.'
  });

  Object.assign(f('s1-clase'), { slides: { deck: 'semana-1-boyle-charles', n: 14 } });
  Object.assign(f('s2-clase'), { slides: { deck: 'semana-2-gay-lussac-avogadro', n: 10 } });
  Object.assign(f('s3-carteleras'), { slides: { deck: 'semana-3-dalton-graham', n: 9 } });

  Object.assign(f('s1-phet'), {
    desc: 'Explora el comportamiento de los gases en el simulador PhET «Propiedades de los gases». Sigue las indicaciones, toma datos, construye tablas y gráficas y explica lo que observas con la teoría cinético-molecular.',
    pasos: [
      { t: 'Parte A · Ley de Boyle (temperatura constante)', items: [
        'Abre «Propiedades de los gases» y entra a la pantalla «Ideal».',
        'Con la bomba, agrega partículas pesadas hasta tener unas 100 en la caja.',
        'En «Mantener constante» elige «Temperatura».',
        'Activa la herramienta «Ancho» para ver el ancho de la caja. Como la altura y la profundidad no cambian, el volumen es proporcional al ancho.',
        'Arrastra la manija de la pared izquierda y fija cinco anchos distintos. En cada uno espera a que la presión se estabilice y anota el ancho y la presión del manómetro.'] },
      { t: 'Parte B · Ley de Charles (presión constante)', items: [
        'Reinicia la simulación y vuelve a agregar unas 100 partículas pesadas.',
        'En «Mantener constante» elige la opción de presión constante, en la que cambia el volumen («Presión ↕ V»).',
        'Con el control «Calor / Frío» cambia la temperatura en cinco pasos. En cada paso anota la temperatura en kelvin y el ancho de la caja.'] },
      { t: 'Parte C · Explica lo que ves', items: [
        'Observa cómo se mueven las partículas cuando comprimes la caja y cuando la calientas.',
        'Escribe en el cuaderno qué les pasa a la velocidad de las partículas y a sus choques con las paredes en cada caso, usando la teoría cinético-molecular.'] },
      { t: 'Tablas y gráficas', items: [
        'Tabla A: ancho, presión y producto presión × ancho. Gráficas: presión contra ancho y presión contra 1/ancho.',
        'Tabla B: temperatura (K) y ancho. Gráfica: ancho contra temperatura.',
        'Puedes hacerlas en papel milimetrado y fotografiarlas, o en Excel o Google Sheets.'] }
    ],
    nota: 'Si «Propiedades de los gases» no carga, usa «Gases: introducción», pantalla «Leyes», que tiene las mismas opciones. Los nombres de los botones pueden variar un poco según la versión del simulador.',
    drive: 'Sube a tu carpeta de Drive las tablas y las gráficas que elaboraste con los datos del simulador. Nombra el archivo así: Curso_Apellido_PhET (por ejemplo, 10-1_Perez_PhET).',
    ent: 'Tablas y gráficas elaboradas con los datos del simulador, subidas a tu carpeta de Drive.'
  });

  Object.assign(f('s2-sim'), {
    desc: 'Trabaja con el simulador de leyes de los gases de la Universidad de Texas (en inglés). Sigue las indicaciones, toma datos, construye tablas y gráficas y comprueba la ecuación de los gases ideales. Complementa con la simulación de la AACT.',
    pasos: [
      { t: 'Antes de empezar', items: [
        'El simulador está en inglés: pressure = presión, volume = volumen, temperature = temperatura, moles = cantidad de sustancia, pump = bomba, release valve = válvula de escape.'] },
      { t: 'Parte A · Ley de Gay-Lussac (volumen constante)', items: [
        'Con la manija de la bomba agrega gas A y deja fija esa cantidad.',
        'Bloquea el volumen (volume locked).',
        'Sube la temperatura en cinco pasos. En cada uno anota la temperatura y la presión que muestra el simulador.'] },
      { t: 'Parte B · Ley de Avogadro (presión y temperatura constantes)', items: [
        'Libera el volumen para que el pistón se mueva y no cambies la temperatura.',
        'Agrega gas con la bomba en cinco tandas. Después de cada una anota la cantidad de gas y el volumen.'] },
      { t: 'Parte C · Comprueba PV = nRT', items: [
        'Elige uno de tus datos y calcula la presión con P = nRT/V, usando R = 0,082 atm·L/(mol·K) o la constante que corresponda a las unidades del simulador.',
        'Compara tu resultado con la presión que muestra el simulador y explica la diferencia, si la hay.'] },
      { t: 'Tablas y gráficas', items: [
        'Tabla A: temperatura (K) y presión. Gráfica: presión contra temperatura.',
        'Tabla B: cantidad de gas y volumen. Gráfica: volumen contra cantidad de gas.',
        'Después abre la simulación de la AACT y responde sus preguntas en el cuaderno.'] }
    ],
    drive: 'Sube a tu carpeta de Drive las tablas y las gráficas que elaboraste con los datos del simulador de la Universidad de Texas. Nombra el archivo así: Curso_Apellido_Texas (por ejemplo, 10-1_Perez_Texas).',
    ent: 'Tablas y gráficas elaboradas con los datos del simulador, subidas a tu carpeta de Drive.'
  });

  Object.assign(f('s1-vboyle'), lab('Boyle', 'Lab-Boyle'));
  Object.assign(f('s1-vcharles'), lab('Charles', 'Lab-Charles'));
  Object.assign(f('s2-vavogadro'), lab('Avogadro', 'Lab-Avogadro'));
  Object.assign(f('s3-vgraham'), lab('Graham', 'Lab-Graham'));
  ['s1-vboyle', 's1-vcharles', 's2-vavogadro', 's3-vgraham'].forEach(c => f(c).rec.push(['Estructura del informe', null, 'evaluacion.html#informe']));
})();
