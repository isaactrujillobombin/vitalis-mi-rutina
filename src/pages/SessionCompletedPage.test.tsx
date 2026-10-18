import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ui } from '../content/exercises';
import { whatsappLink } from '../features/session/shareWithFamily';
import { renderWithRouter } from '../test/renderWithRouter';
import { SessionCompletedPage } from './SessionCompletedPage';

/** Simula (o quita) la hoja de compartir del sistema, que un test no puede abrir de verdad. */
function mockShare(share: ((data: ShareData) => Promise<void>) | undefined) {
  Object.defineProperty(navigator, 'share', { value: share, configurable: true, writable: true });
}

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  mockShare(undefined);
  vi.restoreAllMocks();
});

describe('SessionCompletedPage · Avisar a la familia', () => {
  it('RF-12: abre la hoja de compartir con el mensaje ya escrito', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    mockShare(share);
    renderWithRouter(<SessionCompletedPage />);

    await userEvent.click(screen.getByRole('button', { name: ui.completed.share }));

    expect(share).toHaveBeenCalledWith({ text: ui.completed.shareMessage });
    // P-4: el mensaje no lleva nombres ni contactos.
    expect(share.mock.calls[0]?.[0]).not.toHaveProperty('url');
  });

  it('CA-12.3: si la usuaria cancela, no aparece ningún error ni alternativa', async () => {
    mockShare(vi.fn().mockRejectedValue(new DOMException('Cancelado', 'AbortError')));
    renderWithRouter(<SessionCompletedPage />);

    await userEvent.click(screen.getByRole('button', { name: ui.completed.share }));

    expect(
      screen.queryByRole('link', { name: ui.completed.shareWhatsApp }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('CA-12.1: sin hoja de compartir aparecen WhatsApp y Copiar mensaje', async () => {
    mockShare(undefined);
    renderWithRouter(<SessionCompletedPage />);

    await userEvent.click(screen.getByRole('button', { name: ui.completed.share }));

    const whatsapp = screen.getByRole('link', { name: ui.completed.shareWhatsApp });
    expect(whatsapp).toHaveAttribute('href', whatsappLink(ui.completed.shareMessage));
    expect(screen.getByRole('button', { name: ui.completed.shareCopy })).toBeInTheDocument();
  });

  it('CA-12.1: «Copiar mensaje» copia el texto y lo confirma', async () => {
    mockShare(undefined);
    const writeText = vi.fn().mockResolvedValue(undefined);
    renderWithRouter(<SessionCompletedPage />);
    await userEvent.click(screen.getByRole('button', { name: ui.completed.share }));
    // userEvent instala su propio portapapeles: se sustituye después de iniciar la interacción.
    mockClipboard(writeText);

    await userEvent.click(screen.getByRole('button', { name: ui.completed.shareCopy }));

    expect(writeText).toHaveBeenCalledWith(ui.completed.shareMessage);
    expect(await screen.findByText(new RegExp(ui.completed.shareCopied))).toBeInTheDocument();
  });

  it('CA-12.1: el enlace de WhatsApp codifica el mensaje y no lleva ningún teléfono', () => {
    const link = whatsappLink('Hoy he hecho mi rutina: 8 repeticiones.');
    expect(link).toBe('https://wa.me/?text=Hoy%20he%20hecho%20mi%20rutina%3A%208%20repeticiones.');
  });
});
