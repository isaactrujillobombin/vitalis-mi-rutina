import { sitToStand, ui } from '../../content/exercises';
import { Button } from '../Button';
import { Modal } from '../Modal';

interface Props {
  open: boolean;
  saving: boolean;
  error: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** RF-06, RF-07, RF-08, RF-15 y RF-16. */
export function ConfirmRegistrationModal({ open, saving, error, onConfirm, onCancel }: Props) {
  return (
    <Modal open={open} onClose={onCancel} titleId="confirmar-titulo">
      <h2 id="confirmar-titulo" className="modal__title">
        {ui.confirm.title}
      </h2>
      <p className="modal__summary">
        {sitToStand.name} · {sitToStand.repetitions}
      </p>
      <p className="modal__body">{ui.confirm.body}</p>

      {error && (
        <p className="alert" role="alert">
          <span aria-hidden="true">⚠️</span> {ui.confirm.error}
        </p>
      )}

      <div className="modal__actions">
        {/* RF-16: mientras guarda, el botón se desactiva. */}
        <Button variant="primary" onClick={onConfirm} disabled={saving}>
          {saving ? ui.confirm.saving : error ? ui.confirm.retry : ui.confirm.accept}
        </Button>
        <Button variant="secondary" onClick={onCancel} disabled={saving}>
          {ui.confirm.cancel}
        </Button>
      </div>
    </Modal>
  );
}
