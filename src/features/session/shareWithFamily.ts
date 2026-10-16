/**
 * RF-12: abre la hoja de compartir del sistema con un mensaje ya escrito.
 * La app no lee, guarda ni envía contactos: el destinatario lo elige la usuaria (P-4, CA-12.2).
 */
export type ShareOutcome = 'shared' | 'cancelled' | 'unsupported';

export async function shareWithFamily(message: string): Promise<ShareOutcome> {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return 'unsupported';
  }
  try {
    await navigator.share({ text: message });
    return 'shared';
  } catch {
    // CA-12.3: si cancela, no mostramos ningún error.
    return 'cancelled';
  }
}

export function whatsappLink(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export async function copyMessage(message: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}
