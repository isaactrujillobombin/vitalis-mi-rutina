import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmRegistrationModal } from './ConfirmRegistrationModal';

const noop = () => {};

describe('ConfirmRegistrationModal', () => {
  it('RF-06: muestra título, resumen y las dos acciones', () => {
    render(
      <ConfirmRegistrationModal
        open
        saving={false}
        error={false}
        onConfirm={noop}
        onCancel={noop}
      />,
    );

    expect(screen.getByText('¿Registrar esta sesión?')).toBeInTheDocument();
    expect(screen.getByText('Levantarse de la silla · 8 repeticiones')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sí, registrar sesión' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument();
  });

  it('RF-16 (CL-01): mientras guarda, el botón está desactivado', () => {
    render(<ConfirmRegistrationModal open saving error={false} onConfirm={noop} onCancel={noop} />);

    expect(screen.getByRole('button', { name: 'Guardando…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeDisabled();
  });

  it('RF-16: una doble pulsación solo lanza un guardado', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const { rerender } = render(
      <ConfirmRegistrationModal
        open
        saving={false}
        error={false}
        onConfirm={onConfirm}
        onCancel={noop}
      />,
    );

    const button = screen.getByRole('button', { name: 'Sí, registrar sesión' });
    await user.click(button);
    // La app pasa a «guardando»: el botón se desactiva y el segundo clic no hace nada.
    rerender(
      <ConfirmRegistrationModal open saving error={false} onConfirm={onConfirm} onCancel={noop} />,
    );
    await user.click(screen.getByRole('button', { name: 'Guardando…' }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('RF-15: con error, avisa en un role="alert" y ofrece «Reintentar»', () => {
    render(<ConfirmRegistrationModal open saving={false} error onConfirm={noop} onCancel={noop} />);

    expect(screen.getByRole('alert')).toHaveTextContent(
      'No hemos podido guardar la sesión. Inténtalo de nuevo.',
    );
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });

  it('RF-08: «Cancelar» avisa al que lo abrió', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <ConfirmRegistrationModal
        open
        saving={false}
        error={false}
        onConfirm={noop}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('RNF-05: la ventana tiene nombre accesible a partir de su título', () => {
    render(
      <ConfirmRegistrationModal
        open
        saving={false}
        error={false}
        onConfirm={noop}
        onCancel={noop}
      />,
    );

    expect(screen.getByRole('dialog', { name: '¿Registrar esta sesión?' })).toBeInTheDocument();
  });
});
