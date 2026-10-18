import { describe, expect, it } from 'vitest';
import type { SessionRecord } from '../../data/types';
import { weekSummary } from './weekSummary';

function record(completedAt: Date, id = completedAt.toISOString()): SessionRecord {
  return {
    id,
    exerciseId: 'sit-to-stand',
    status: 'completed',
    completedAt: completedAt.toISOString(),
    schemaVersion: 1,
  };
}

// Jueves 15/10/2026 a media mañana. La semana va del lunes 12 al domingo 18.
const THURSDAY = new Date(2026, 9, 15, 11, 0);

describe('weekSummary', () => {
  it('RF-20: la semana empieza en lunes y tiene 7 días', () => {
    const { days } = weekSummary([], THURSDAY);
    expect(days.map((d) => d.short)).toEqual(['L', 'M', 'X', 'J', 'V', 'S', 'D']);
    expect(days[3]?.isToday).toBe(true);
  });

  it('RF-20: cuenta los días distintos con sesión, no las sesiones', () => {
    const records = [
      record(new Date(2026, 9, 12, 9, 0)), // lunes
      record(new Date(2026, 9, 14, 10, 0)), // miércoles
      record(new Date(2026, 9, 14, 18, 0)), // miércoles otra vez (CL-06)
    ];
    const summary = weekSummary(records, THURSDAY);
    expect(summary.daysDone).toBe(2);
    expect(summary.days.filter((d) => d.done).map((d) => d.long)).toEqual(['lunes', 'miércoles']);
  });

  it('RF-20: no cuenta sesiones de la semana anterior', () => {
    const summary = weekSummary([record(new Date(2026, 9, 11, 12, 0))], THURSDAY); // domingo 11
    expect(summary.daysDone).toBe(0);
  });

  it('S-2: los días que aún no han llegado se marcan como futuros, no como fallados', () => {
    const { days } = weekSummary([], THURSDAY);
    expect(days.map((d) => d.isFuture)).toEqual([false, false, false, false, true, true, true]);
  });

  it('CL-07: una sesión a las 23:59 cuenta para ese día y no para el siguiente', () => {
    const summary = weekSummary([record(new Date(2026, 9, 13, 23, 59))], THURSDAY); // martes
    expect(summary.days[1]?.done).toBe(true);
    expect(summary.days[2]?.done).toBe(false);
  });

  it('RF-20: el domingo sigue perteneciendo a la semana que empezó el lunes', () => {
    const sunday = new Date(2026, 9, 18, 20, 0);
    const summary = weekSummary([record(new Date(2026, 9, 12, 9, 0))], sunday);
    expect(summary.daysDone).toBe(1);
    expect(summary.days[6]?.isToday).toBe(true);
  });
});
