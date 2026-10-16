import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { HEALTH_NOTICE, sitToStand } from '../content/exercises';
import { renderWithRouter } from '../test/renderWithRouter';
import { ExercisePage } from './ExercisePage';

describe('ExercisePage', () => {
  it('RF-05: muestra título, insignias y los pasos del movimiento', () => {
    renderWithRouter(<ExercisePage />);

    expect(screen.getByRole('heading', { name: 'Levantarse de la silla' })).toBeInTheDocument();
    expect(screen.getByText('8 repeticiones')).toBeInTheDocument();
    expect(screen.getByText('Descanso 30 s')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Cómo hacerlo' })).toBeInTheDocument();
  });

  it('CA-05.1: los pasos son una lista ordenada', () => {
    const { container } = renderWithRouter(<ExercisePage />);
    const ordered = container.querySelector('ol.steps');

    expect(ordered).not.toBeNull();
    expect(ordered?.querySelectorAll('li')).toHaveLength(sitToStand.steps.items.length);
  });

  it('RNF-10 (S-3): el aviso de salud está visible', () => {
    renderWithRouter(<ExercisePage />);
    expect(screen.getByText(new RegExp(HEALTH_NOTICE))).toBeInTheDocument();
  });

  it('S-1: «Me duele» está siempre presente durante el ejercicio', () => {
    renderWithRouter(<ExercisePage />);
    expect(screen.getByRole('button', { name: /Me duele/ })).toBeInTheDocument();
  });

  it('RF-04 (S-4): la preparación aparece ANTES que los pasos', () => {
    const { container } = renderWithRouter(<ExercisePage />);
    const html = container.innerHTML;

    expect(html.indexOf('Antes de empezar')).toBeLessThan(html.indexOf('Cómo hacerlo'));
    expect(html.indexOf('Antes de empezar')).toBeGreaterThan(-1);
  });

  it('CA-02.1: la preparación nombra silla firme, pared y espacio despejado', () => {
    renderWithRouter(<ExercisePage />);

    expect(screen.getByText(/silla firme, sin ruedas/i)).toBeInTheDocument();
    expect(screen.getByText(/contra la pared/i)).toBeInTheDocument();
    expect(screen.getByText(/espacio libre/i)).toBeInTheDocument();
  });

  it('RF-06: «Terminar ejercicio» abre la confirmación', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ExercisePage />);

    await user.click(screen.getByRole('button', { name: 'Terminar ejercicio' }));

    expect(screen.getByText('¿Registrar esta sesión?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sí, registrar sesión' })).toBeInTheDocument();
  });

  it('RF-08: Cancelar cierra la confirmación sin guardar ningún registro', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ExercisePage />);

    await user.click(screen.getByRole('button', { name: 'Terminar ejercicio' }));
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(window.localStorage.getItem('vitalis.sessionRecords.v1')).toBeNull();
  });

  it('RF-09: «Me duele» abre el aviso y no guarda nada (CA-09.1)', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ExercisePage />);

    await user.click(screen.getByRole('button', { name: /Me duele/ }));

    expect(screen.getByText('Para el ejercicio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pausar sesión' })).toBeInTheDocument();
    expect(window.localStorage.getItem('vitalis.sessionRecords.v1')).toBeNull();
  });

  it('RF-15: si el guardado falla, se ve el aviso y no se navega', async () => {
    const user = userEvent.setup();
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('bloqueado');
    });
    renderWithRouter(<ExercisePage />);

    await user.click(screen.getByRole('button', { name: 'Terminar ejercicio' }));
    await user.click(screen.getByRole('button', { name: 'Sí, registrar sesión' }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'No hemos podido guardar la sesión. Inténtalo de nuevo.',
    );
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
    setItem.mockRestore();
  });

  it('S-5: ningún texto anima a hacer más repeticiones', () => {
    const { container } = renderWithRouter(<ExercisePage />);
    expect(container.textContent).not.toMatch(/una más|esfuérzate|supera|aguanta más|no pares/i);
  });
});
