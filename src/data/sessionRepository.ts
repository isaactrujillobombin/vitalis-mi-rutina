import type { SaveResult, SessionRecord } from './types';

/**
 * Único punto que toca localStorage (P-2). Las páginas nunca escriben directamente.
 * Si mañana hay servidor, se cambia aquí y las pantallas no se enteran.
 */
const STORAGE_KEY = 'vitalis.sessionRecords.v1';

function isSessionRecord(value: unknown): value is SessionRecord {
  if (typeof value !== 'object' || value === null) return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r['id'] === 'string' &&
    r['exerciseId'] === 'sit-to-stand' &&
    r['status'] === 'completed' &&
    typeof r['completedAt'] === 'string' &&
    r['schemaVersion'] === 1
  );
}

/** RF-18: si los datos están dañados se tratan como vacíos y la app no se bloquea. */
export function list(): SessionRecord[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Modo privado o almacenamiento bloqueado: para leer, equivale a no tener nada.
    return [];
  }
  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('[vitalis] Los registros guardados no son una lista. Se ignoran.');
      return [];
    }
    return parsed.filter(isSessionRecord);
  } catch {
    console.warn('[vitalis] Los registros guardados no se pueden leer. Se ignoran.');
    return [];
  }
}

function newId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** RF-07 y RF-15: devuelve ok o error; nunca lanza. */
export function save(exerciseId: SessionRecord['exerciseId'] = 'sit-to-stand'): SaveResult {
  const record: SessionRecord = {
    id: newId(),
    exerciseId,
    status: 'completed',
    completedAt: new Date().toISOString(),
    schemaVersion: 1,
  };

  try {
    const next = [...list(), record];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return { ok: true, record };
  } catch {
    // Cuota llena, modo privado o almacenamiento bloqueado (CL-02).
    return { ok: false, error: 'storage-unavailable' };
  }
}

/** Solo para desarrollo y pruebas manuales. */
export function clear(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Si no se puede borrar, no hay nada que hacer ni que avisar.
  }
}
