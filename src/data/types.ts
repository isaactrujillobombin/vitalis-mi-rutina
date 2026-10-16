/** Solo existe un ejercicio en el MVP (M-1). */
export type ExerciseId = 'sit-to-stand';

/**
 * Lo único que guardamos (P-1, minimización).
 * Nada de nombres, edad, contactos ni datos de salud.
 */
export interface SessionRecord {
  id: string;
  exerciseId: ExerciseId;
  /** Las pausas NO se guardan: solo las sesiones completadas. */
  status: 'completed';
  /** ISO 8601 con la hora local del dispositivo. */
  completedAt: string;
  schemaVersion: 1;
}

export type SaveResult = { ok: true; record: SessionRecord } | { ok: false; error: string };
