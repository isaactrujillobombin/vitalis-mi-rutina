import { ui } from '../../content/exercises';
import { Button } from '../Button';
import { Modal } from '../Modal';

interface Props {
  open: boolean;
  onPause: () => void;
  onBackWithoutSaving: () => void;
  onClose: () => void;
}

/** RF-09 y RF-11. CA-09.1: abrir esta ventana no guarda nada. */
export function PainNoticeModal({ open, onPause, onBackWithoutSaving, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} titleId="dolor-titulo">
      <h2 id="dolor-titulo" className="modal__title">
        <span aria-hidden="true">🛑</span> {ui.pain.title}
      </h2>
      <p className="modal__body">{ui.pain.body}</p>

      <div className="modal__actions">
        <Button variant="primary" onClick={onPause}>
          {ui.pain.pause}
        </Button>
        <Button variant="secondary" onClick={onBackWithoutSaving}>
          {ui.pain.backWithoutSaving}
        </Button>
      </div>
    </Modal>
  );
}
