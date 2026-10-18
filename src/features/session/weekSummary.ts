import type { SessionRecord } from '../../data/types';

export interface WeekDay {
  /** Inicial del día para el círculo («L», «M», «X»…). */
  short: string;
  /** Nombre completo para el lector de pantalla («lunes»…). */
  long: string;
  /** Hay al menos una sesión registrada ese día. */
  done: boolean;
  isToday: boolean;
  /** Días que aún no han llegado: se pintan neutros, nunca como «fallados» (S-2). */
  isFuture: boolean;
}

export interface WeekSummary {
  days: WeekDay[];
  /** Días distintos con sesión (no sesiones: dos el mismo día cuentan como uno). */
  daysDone: number;
}

const SHORT = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const LONG = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

/** Clave de día en hora local (CL-07: el día cambia a las 00:00 del dispositivo). */
function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/**
 * RF-20: semana de lunes a domingo (la que se usa en España) que contiene `now`.
 * Función pura para poder probarla con cualquier fecha.
 */
export function weekSummary(records: SessionRecord[], now: Date = new Date()): WeekSummary {
  const doneKeys = new Set(
    records
      .map((r) => new Date(r.completedAt))
      .filter((d) => !Number.isNaN(d.getTime()))
      .map(dayKey),
  );

  // getDay(): 0 = domingo. Lo pasamos a 0 = lunes.
  const offset = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset);
  const todayKey = dayKey(now);

  const days = SHORT.map((short, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    return {
      short,
      long: LONG[i] ?? '',
      done: doneKeys.has(dayKey(date)),
      isToday: dayKey(date) === todayKey,
      isFuture: i > offset,
    };
  });

  return { days, daysDone: days.filter((d) => d.done).length };
}
