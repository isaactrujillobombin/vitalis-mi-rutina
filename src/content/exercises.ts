/**
 * Único archivo con textos de la interfaz (regla C-5 de constitution.md).
 * Reglas al escribir aquí:
 *  - A-7: frases de 20 palabras o menos, tuteo, sin jerga de gimnasio.
 *  - S-3: nada de diagnósticos ni consejo médico.
 *  - S-5: ningún texto anima a hacer más repeticiones.
 * Los pasos siguen pendientes de validar con una fuente fiable (D-10, S-6).
 */

export const HEALTH_NOTICE =
  'Este contenido es orientativo y no sustituye el consejo de tu médico.';

export const sitToStand = {
  id: 'sit-to-stand',
  name: 'Levantarse de la silla',
  level: 'Nivel 1 · Con silla',
  repetitions: '8 repeticiones',
  rest: 'Descanso 30 s',
  duration: '~5 minutos',

  /** S-4: la preparación se muestra siempre antes de las instrucciones. */
  preparation: {
    title: 'Antes de empezar',
    items: [
      'Usa una silla firme, sin ruedas.',
      'Apoya la silla contra la pared.',
      'Deja espacio libre a tu alrededor.',
      'Ponte calzado cerrado que no resbale.',
    ],
  },

  steps: {
    title: 'Cómo hacerlo',
    items: [
      'Siéntate con la espalda apoyada y los pies en el suelo.',
      'Adelanta un poco el cuerpo, sin levantar los pies.',
      'Empuja con las piernas y levántate despacio.',
      'Quédate de pie un momento, erguida y tranquila.',
      'Siéntate despacio, controlando la bajada.',
      'Descansa 30 segundos y repite.',
    ],
  },
} as const;

export const ui = {
  appName: 'Vitalis',
  section: 'Mi Rutina',

  greeting: {
    morning: 'Buenos días',
    afternoon: 'Buenas tardes',
    night: 'Buenas noches',
  },

  home: {
    cardLabel: 'MI RUTINA · HOY',
    statusPending: 'Pendiente',
    statusDone: 'Hecha hoy',
    doneAt: (time: string) => `Registrada a las ${time}`,
    start: 'Empezar ahora',
    continue: 'Empezar otra vez',
    cannotToday: 'Hoy tengo dolor o no puedo',
    /** RF-14: valida la decisión de descansar, sin culpa (S-2). */
    restMessageTitle: 'Descansar también está bien',
    restMessageBody:
      'Hoy no pasa nada. Mañana lo retomas. Si el dolor sigue, cuéntaselo a tu médico.',
    soonTitle: 'Próximamente',
    soonPlate: 'Mi Plato',
    soonFamily: 'Reto en Familia',
    soonBody: 'Lo estamos preparando.',
  },

  exercise: {
    finish: 'Terminar ejercicio',
    pain: 'Me duele',
  },

  confirm: {
    title: '¿Registrar esta sesión?',
    body: 'Guardaremos que hoy has hecho tu rutina. Solo se guarda en este móvil.',
    accept: 'Sí, registrar sesión',
    cancel: 'Cancelar',
    saving: 'Guardando…',
    error: 'No hemos podido guardar la sesión. Inténtalo de nuevo.',
    retry: 'Reintentar',
  },

  pain: {
    title: 'Para el ejercicio',
    body: 'Para y siéntate despacio. Respira tranquila. No sigas si te duele.',
    pause: 'Pausar sesión',
    backWithoutSaving: 'Volver sin registrar',
  },

  completed: {
    title: 'Sesión registrada',
    body: 'Un momento para ti, completado.',
    share: 'Avisar a la familia',
    shareMessage:
      'Hoy he hecho mi rutina de Vitalis: Levantarse de la silla, 8 repeticiones.',
    shareWhatsApp: 'Enviar por WhatsApp',
    shareCopy: 'Copiar mensaje',
    shareCopied: 'Mensaje copiado',
    home: 'Volver al inicio',
  },

  paused: {
    title: 'Sesión pausada',
    /** S-2: parar no se castiga. */
    body: 'Ahora lo importante es descansar. Has hecho bien en parar.',
    status: 'No registrada como completada',
    home: 'Volver al inicio',
    backToGuide: 'Volver a la guía',
  },

  nav: {
    home: 'Inicio',
    routine: 'Mi Rutina',
    plate: 'Mi Plato',
    family: 'Familia',
  },

  closeModal: 'Cerrar',
} as const;
