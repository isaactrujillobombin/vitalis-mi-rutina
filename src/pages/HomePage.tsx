import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { sitToStand, ui } from '../content/exercises';
import { useTodayStatus } from '../features/session/useTodayStatus';

/** CA-01.2: el saludo depende de la hora del dispositivo. */
function greeting(now: Date = new Date()): string {
  const hour = now.getHours();
  if (hour >= 6 && hour < 14) return ui.greeting.morning;
  if (hour >= 14 && hour < 21) return ui.greeting.afternoon;
  return ui.greeting.night;
}

/** RF-01, RF-13, RF-14, RF-19. Sin nombre en el saludo hasta resolver D-06. */
export function HomePage() {
  const navigate = useNavigate();
  const today = useTodayStatus();
  const [showRestMessage, setShowRestMessage] = useState(false);

  return (
    <>
      <h1 className="greeting">{greeting()}</h1>

      <section className="card card--highlight" aria-labelledby="rutina-hoy">
        <p className="card__label">{ui.home.cardLabel}</p>
        <h2 id="rutina-hoy" className="card__title card__title--big">
          {sitToStand.name}
        </h2>

        <p className="badges">
          <Badge>{sitToStand.level}</Badge> <Badge>{sitToStand.repetitions}</Badge>{' '}
          <Badge>{sitToStand.duration}</Badge>
        </p>

        {/* RNF-04: el estado lleva icono y texto, nunca solo color. */}
        <p className="badges">
          {today.done ? (
            <Badge tone="success" icon="✓">
              {ui.home.statusDone}
              {today.lastTime !== null ? ` · ${ui.home.doneAt(today.lastTime)}` : ''}
            </Badge>
          ) : (
            <Badge tone="warn" icon="○">
              {ui.home.statusPending}
            </Badge>
          )}
        </p>

        {/* CA-01.3: es la acción principal y la primera del contenido. */}
        <Button variant="primary" onClick={() => navigate('/rutina/ejercicio')}>
          {today.done ? ui.home.continue : ui.home.start}
        </Button>
      </section>

      {/* RF-14: validar la decisión de descansar, sin guardar nada ni culpabilizar. */}
      <Button
        variant="secondary"
        onClick={() => setShowRestMessage((shown) => !shown)}
        aria-expanded={showRestMessage}
        aria-controls="mensaje-descanso"
      >
        {ui.home.cannotToday}
      </Button>

      {showRestMessage && (
        <section id="mensaje-descanso" className="card card--calm">
          <h2 className="card__title">{ui.home.restMessageTitle}</h2>
          <p>{ui.home.restMessageBody}</p>
        </section>
      )}

      {/* RF-19: secciones futuras, sin cifras y sin navegación. */}
      <section className="card card--muted" aria-labelledby="proximamente">
        <h2 id="proximamente" className="card__title">
          {ui.home.soonTitle}
        </h2>
        <p className="soon">
          <span>{ui.home.soonPlate}</span>
          <span>{ui.home.soonFamily}</span>
        </p>
        <p className="muted">{ui.home.soonBody}</p>
      </section>
    </>
  );
}
