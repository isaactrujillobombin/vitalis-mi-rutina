import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderWithRouter } from '../test/renderWithRouter';
import { HomePage } from './HomePage';

afterEach(() => {
  vi.useRealTimers();
});

function renderAt(hour: number) {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(new Date(2026, 9, 16, hour, 0, 0));
  renderWithRouter(<HomePage />);
}

describe('HomePage', () => {
  it('RF-01: muestra el ejercicio, las insignias y la acción principal', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Levantarse de la silla' })).toBeInTheDocument();
    expect(screen.getByText('8 repeticiones')).toBeInTheDocument();
    expect(screen.getByText('~5 minutos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Empezar ahora' })).toBeInTheDocument();
  });

  it('CA-01.1: sin registros de hoy, el estado es «Pendiente»', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('CA-01.2: saluda «Buenos días» a las 10:00', () => {
    renderAt(10);
    expect(screen.getByRole('heading', { name: 'Buenos días' })).toBeInTheDocument();
  });

  it('CA-01.2: saluda «Buenas tardes» a las 15:00', () => {
    renderAt(15);
    expect(screen.getByRole('heading', { name: 'Buenas tardes' })).toBeInTheDocument();
  });

  it('CA-01.2: saluda «Buenas noches» a las 22:00', () => {
    renderAt(22);
    expect(screen.getByRole('heading', { name: 'Buenas noches' })).toBeInTheDocument();
  });

  it('CA-01.2: saluda «Buenas noches» a las 03:00', () => {
    renderAt(3);
    expect(screen.getByRole('heading', { name: 'Buenas noches' })).toBeInTheDocument();
  });

  it('D-06: el saludo no lleva nombre (no hay cuentas, no sabemos cómo se llama)', () => {
    renderAt(10);
    expect(screen.queryByText(/Carmen|Rosa/)).not.toBeInTheDocument();
  });

  it('RF-14: «Hoy tengo dolor o no puedo» valida el descanso y no guarda nada', async () => {
    const user = userEvent.setup();
    renderWithRouter(<HomePage />);

    await user.click(screen.getByRole('button', { name: 'Hoy tengo dolor o no puedo' }));

    expect(screen.getByText('Descansar también está bien')).toBeInTheDocument();
    expect(window.localStorage.getItem('vitalis.sessionRecords.v1')).toBeNull();
  });

  it('S-2: el mensaje de descanso no culpabiliza ni habla de rachas', async () => {
    const user = userEvent.setup();
    renderWithRouter(<HomePage />);
    await user.click(screen.getByRole('button', { name: 'Hoy tengo dolor o no puedo' }));

    expect(screen.queryByText(/racha|fallado|perdido|has roto/i)).not.toBeInTheDocument();
  });

  it('RF-19: Mi Plato y Familia salen como «Próximamente» y sin cifras', () => {
    renderWithRouter(<HomePage />);

    expect(screen.getByRole('heading', { name: 'Próximamente' })).toBeInTheDocument();
    // Las cifras de demostración del Figma (700/1000 mg…) no deben aparecer (D-04).
    expect(screen.queryByText(/\d+\s*\/\s*\d+/)).not.toBeInTheDocument();
  });
});
