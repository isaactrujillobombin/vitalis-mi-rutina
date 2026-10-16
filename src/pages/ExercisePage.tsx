import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { HealthNotice } from '../components/HealthNotice';
import { PreparationChecklist } from '../components/PreparationChecklist';
import { ConfirmRegistrationModal } from '../components/modals/ConfirmRegistrationModal';
import { PainNoticeModal } from '../components/modals/PainNoticeModal';
import { sitToStand, ui } from '../content/exercises';
import { useSessionFlow } from '../features/session/useSessionFlow';

/** RF-04 y RF-05: la preparación va siempre antes de los pasos (S-4). */
export function ExercisePage() {
  const navigate = useNavigate();
  const flow = useSessionFlow();

  useEffect(() => {
    // `fromFlow` es lo que permite a RF-17 distinguir el flujo de una URL pegada a mano.
    if (flow.state === 'registered') {
      navigate('/rutina/registrada', { state: { fromFlow: true }, replace: true });
    } else if (flow.state === 'paused') {
      navigate('/rutina/pausada', { state: { fromFlow: true }, replace: true });
    }
  }, [flow.state, navigate]);

  return (
    <>
      <p className="eyebrow">{ui.section}</p>
      <h1 className="page-title">{sitToStand.name}</h1>
      <p className="badges">
        <Badge>{sitToStand.level}</Badge> <Badge>{sitToStand.repetitions}</Badge>{' '}
        <Badge>{sitToStand.rest}</Badge>
      </p>

      <PreparationChecklist />

      <section className="card" aria-labelledby="pasos">
        <h2 id="pasos" className="card__title">
          {sitToStand.steps.title}
        </h2>
        {/* CA-05.1: lista ordenada, una acción por paso. */}
        <ol className="steps">
          {sitToStand.steps.items.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <HealthNotice />

      {/* S-1 y CA-05.3: «Me duele» siempre a la vista, pegado abajo. */}
      <div className="sticky-actions">
        <Button variant="primary" onClick={flow.finish}>
          {ui.exercise.finish}
        </Button>
        <Button variant="secondary" onClick={flow.reportPain}>
          <span aria-hidden="true">🛑</span> {ui.exercise.pain}
        </Button>
      </div>

      <ConfirmRegistrationModal
        open={flow.state === 'confirming' || flow.state === 'saving' || flow.state === 'saveError'}
        saving={flow.state === 'saving'}
        error={flow.state === 'saveError'}
        onConfirm={flow.confirmSave}
        onCancel={flow.cancel}
      />

      <PainNoticeModal
        open={flow.state === 'pain'}
        onPause={flow.pause}
        onBackWithoutSaving={() => navigate('/')}
        onClose={flow.cancel}
      />
    </>
  );
}
