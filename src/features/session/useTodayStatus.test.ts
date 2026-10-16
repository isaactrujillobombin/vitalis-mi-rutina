import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useTodayStatus } from './useTodayStatus';

const KEY = 'vitalis.sessionRecords.v1';

function seed(completedAt: string) {
  window.localStorage.setItem(
    KEY,
    JSON.stringify([
      {
        id: 'test-1',
        exerciseId: 'sit-to-stand',
        status: 'completed',
        completedAt,
        schemaVersion: 1,
      },
    ]),
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('useTodayStatus', () => {
  it('CA-01.1: sin registros de hoy, la sesión está pendiente', () => {
    const { result } = renderHook(() => useTodayStatus());

    expect(result.current.done).toBe(false);
    expect(result.current.lastTime).toBeNull();
  });

  it('RF-13: con un registro de hoy, aparece como hecha y con su hora', () => {
    const today = new Date();
    today.setHours(10, 45, 0, 0);
    seed(today.toISOString());

    const { result } = renderHook(() => useTodayStatus());

    expect(result.current.done).toBe(true);
    expect(result.current.lastTime).toBe('10:45');
  });

  it('CA-13.1 (CL-07): un registro de ayer ya no cuenta como hecho hoy', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    seed(yesterday.toISOString());

    const { result } = renderHook(() => useTodayStatus());

    expect(result.current.done).toBe(false);
  });

  it('CL-07: registrada a las 23:59, consultada a las 00:01 del día siguiente, vuelve a pendiente', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 16, 23, 59, 0));
    seed(new Date(2026, 9, 16, 23, 59, 0).toISOString());

    vi.setSystemTime(new Date(2026, 9, 17, 0, 1, 0));
    const { result } = renderHook(() => useTodayStatus());

    expect(result.current.done).toBe(false);
  });

  it('CL-06: con dos registros hoy, muestra la hora del último', () => {
    const early = new Date();
    early.setHours(9, 0, 0, 0);
    const late = new Date();
    late.setHours(18, 30, 0, 0);
    window.localStorage.setItem(
      KEY,
      JSON.stringify(
        [early, late].map((d, i) => ({
          id: `test-${i}`,
          exerciseId: 'sit-to-stand',
          status: 'completed',
          completedAt: d.toISOString(),
          schemaVersion: 1,
        })),
      ),
    );

    const { result } = renderHook(() => useTodayStatus());

    expect(result.current.lastTime).toBe('18:30');
  });
});
