import { useCallback, useState } from 'react';
import { list } from '../../data/sessionRepository';
import type { SessionRecord } from '../../data/types';

export interface TodayStatus {
  /** RF-13: hay al menos un registro con fecha de hoy. */
  done: boolean;
  /** Hora del último registro de hoy, ya formateada (por ejemplo, «10:45»). */
  lastTime: string | null;
  refresh: () => void;
}

function isToday(isoDate: string): boolean {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  // Comparamos por fecha local, no UTC: a las 00:00 locales empieza un día nuevo (CL-07).
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function lastOfToday(records: SessionRecord[]): SessionRecord | null {
  const today = records.filter((r) => isToday(r.completedAt));
  if (today.length === 0) return null;
  return today.reduce((latest, r) => (r.completedAt > latest.completedAt ? r : latest));
}

export function useTodayStatus(): TodayStatus {
  const read = useCallback(() => lastOfToday(list()), []);
  const [last, setLast] = useState<SessionRecord | null>(read);

  const refresh = useCallback(() => {
    setLast(read());
  }, [read]);

  return {
    done: last !== null,
    lastTime:
      last === null
        ? null
        : new Date(last.completedAt).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          }),
    refresh,
  };
}
