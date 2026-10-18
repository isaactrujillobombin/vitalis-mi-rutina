import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WeekSummaryCard } from './WeekSummaryCard';

const KEY = 'vitalis.sessionRecords.v1';

function seed(...dates: Date[]) {
  window.localStorage.setItem(
    KEY,
    JSON.stringify(
      dates.map((d, i) => ({
        id: `test-${i}`,
        exerciseId: 'sit-to-stand',
        status: 'completed',
        completedAt: d.toISOString(),
        schemaVersion: 1,
      })),
    ),
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('WeekSummaryCard', () => {
  it('RF-20: muestra los días con sesión de esta semana y los nombra para el lector', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 15, 11, 0)); // jueves
    seed(new Date(2026, 9, 12, 9, 0), new Date(2026, 9, 14, 10, 0));

    render(<WeekSummaryCard />);

    const card = screen.getByRole('region', { name: 'Esta semana' });
    expect(within(card).getByText('2 días')).toBeInTheDocument();
    const days = within(card).getAllByRole('listitem');
    expect(days).toHaveLength(7);
    expect(days[0]).toHaveTextContent('lunes: sesión hecha');
    expect(days[1]).toHaveTextContent('martes: sin sesión');
    expect(days[3]).toHaveTextContent('jueves, hoy: sin sesión');
    expect(days[4]).toHaveTextContent('viernes: todavía no ha llegado');
  });

  it('S-2: sin sesiones no muestra «0 días» ni mensajes de culpa', () => {
    render(<WeekSummaryCard />);

    expect(screen.queryByText(/0 días/)).not.toBeInTheDocument();
    expect(screen.getByText('Cuando hagas una sesión, aparecerá aquí.')).toBeInTheDocument();
    // S-2 y S-5: nada de rachas, metas ni «más».
    expect(document.body.textContent).not.toMatch(/racha|perdido|fallado|objetivo|más/i);
  });

  it('RF-18: con datos dañados no se bloquea y muestra la semana vacía', () => {
    window.localStorage.setItem(KEY, '{esto no es json');
    render(<WeekSummaryCard />);
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
  });
});
