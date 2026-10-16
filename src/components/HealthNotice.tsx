import { HEALTH_NOTICE } from '../content/exercises';

/** S-3 y RNF-10: este aviso no se quita ni se esconde nunca. */
export function HealthNotice() {
  return (
    <p className="health-notice">
      <span aria-hidden="true">ℹ️</span> {HEALTH_NOTICE}
    </p>
  );
}
