import { Card } from '../components/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { WeekSummaryCard } from '../components/WeekSummaryCard';
import { SitToStandIllustration } from '../components/SitToStandIllustration';
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

      <Card tone="highlight" aria-labelledby="rutina-hoy">
        <div className="card__head">
          <div>
            <p className="card__label">{ui.home.cardLabel}</p>
            <h2 id="rutina-hoy" className="card__title card__title--big">
              {sitToStand.name}
            </h2>
          </div>
          <span className="card__illustration">
            <SitToStandIllustration />
          </span>
        </div>

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
          <Icon name="play" />
          {today.done ? ui.home.continue : ui.home.start}
        </Button>
      </Card>

      {/* RF-14: validar la decisión de descansar, sin guardar nada ni culpabilizar. */}
      <Button
        variant="secondary"
        className="btn--with-icon"
        onClick={() => setShowRestMessage((shown) => !shown)}
        aria-expanded={showRestMessage}
        aria-controls="mensaje-descanso"
      >
        <Icon name="heart" />
        {ui.home.cannotToday}
      </Button>

      {showRestMessage && (
        <Card id="mensaje-descanso" tone="calm">
          <h2 className="card__title">{ui.home.restMessageTitle}</h2>
          <p>{ui.home.restMessageBody}</p>
        </Card>
      )}

      {/* RF-20: resumen de la semana, después de las acciones del día (CA-01.3). */}
      <WeekSummaryCard />

      {/* RF-19: secciones futuras, sin cifras y sin navegación. */}
      <Card tone="muted" aria-labelledby="proximamente">
        <h2 id="proximamente" className="card__title">
          {ui.home.soonTitle}
        </h2>
        <p className="soon">
          <span className="soon__tile">
            <span className="soon__emoji soon__emoji--plate">
              <Icon name="plate" size={26} />
            </span>
            {ui.home.soonPlate}
          </span>
          <span className="soon__tile">
            <span className="soon__emoji soon__emoji--family">
              <Icon name="family" size={26} />
            </span>
            {ui.home.soonFamily}
          </span>
        </p>
        <p className="muted">{ui.home.soonBody}</p>
      </Card>
    </>
  );
}
