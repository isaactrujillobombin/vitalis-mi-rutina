import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ui } from '../content/exercises';

/** RF-10. S-2: parar no se castiga, no hay mensaje de fracaso ni racha perdida. */
export function SessionPausedPage() {
  const navigate = useNavigate();

  return (
    <>
      <p className="eyebrow">{ui.section}</p>

      <Card tone="calm" aria-labelledby="pausada">
        <p className="big-icon" aria-hidden="true">
          ⏸
        </p>
        <h1 id="pausada" className="page-title">
          {ui.paused.title}
        </h1>
        <p>{ui.paused.body}</p>
        {/* CA-10.2: icono + texto, no solo color. */}
        <p className="badges">
          <Badge tone="warn" icon="○">
            {ui.paused.status}
          </Badge>
        </p>
      </Card>

      <Button variant="primary" onClick={() => navigate('/')}>
        {ui.paused.home}
      </Button>
      <Button variant="secondary" onClick={() => navigate('/rutina/ejercicio')}>
        {ui.paused.backToGuide}
      </Button>
    </>
  );
}
