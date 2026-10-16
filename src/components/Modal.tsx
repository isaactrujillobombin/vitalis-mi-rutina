import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  open: boolean;
  /** Esc y el botón de cerrar llaman aquí. Para RF-08, equivale a «Cancelar». */
  onClose: () => void;
  titleId: string;
  children: ReactNode;
}

/**
 * RNF-05: usamos <dialog> nativo porque ya retiene el foco y se cierra con Esc,
 * y devuelve el foco al botón que lo abrió sin que tengamos que programarlo.
 */
export function Modal({ open, onClose, titleId, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog === null) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog === null) return;
    // 'cancel' se dispara con Esc; lo tratamos como cerrar (CA-08.1).
    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };
    const handleClose = () => onClose();
    dialog.addEventListener('cancel', handleCancel);
    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      dialog.removeEventListener('close', handleClose);
    };
  }, [onClose]);

  return (
    <dialog className="modal" ref={ref} aria-labelledby={titleId}>
      <div className="modal__content">{children}</div>
    </dialog>
  );
}
