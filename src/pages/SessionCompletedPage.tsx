import { Card } from '../components/Card';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { sitToStand, ui } from '../content/exercises';
import { copyMessage, shareWithFamily, whatsappLink } from '../features/session/shareWithFamily';

/** RF-07 y RF-12. */
export function SessionCompletedPage() {
  const navigate = useNavigate();
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const outcome = await shareWithFamily(ui.completed.shareMessage);
    // CA-12.1: sin hoja de compartir, ofrecemos WhatsApp y copiar.
    if (outcome === 'unsupported') setShowFallback(true);
    // CA-12.3: si cancela, no mostramos nada.
  };

  const handleCopy = async () => {
    setCopied(await copyMessage(ui.completed.shareMessage));
  };

  return (
    <>
      <p className="eyebrow">{ui.section}</p>

      <Card tone="success" aria-labelledby="registrada">
        <p className="big-icon" aria-hidden="true">
          ✓
        </p>
        <h1 id="registrada" className="page-title">
          {ui.completed.title}
        </h1>
        <p>{ui.completed.body}</p>
        <p className="badges">
          <Badge tone="success" icon="✓">
            {sitToStand.name} · {sitToStand.repetitions}
          </Badge>
        </p>
      </Card>

      <Button variant="primary" onClick={() => navigate('/')}>
        {ui.completed.home}
      </Button>

      <Button variant="secondary" onClick={handleShare}>
        {ui.completed.share}
      </Button>

      {showFallback && (
        <div className="stack">
          <a
            className="btn btn--secondary btn--block"
            href={whatsappLink(ui.completed.shareMessage)}
          >
            {ui.completed.shareWhatsApp}
          </a>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? `✓ ${ui.completed.shareCopied}` : ui.completed.shareCopy}
          </Button>
        </div>
      )}
    </>
  );
}
