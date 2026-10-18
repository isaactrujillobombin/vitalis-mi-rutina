/**
 * Ilustración decorativa de «Levantarse de la silla»: dos posturas (sentada y de pie)
 * que se funden despacio. Sin texto: lo que comunica está en el título de al lado.
 */
export function SitToStandIllustration() {
  return (
    <svg
      className="sit-to-stand"
      width="64"
      height="64"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {/* Silla vista de lado, mirando a la derecha. */}
      <path className="sit-to-stand__chair" d="M9 9v33M9 28h14v14" />

      <g className="sit-to-stand__pose sit-to-stand__pose--sitting">
        <circle cx="19" cy="11" r="3.2" />
        <path d="M18 15.5 16.5 27h11l1 14h4M17.5 18.5l6 5" />
      </g>

      <g className="sit-to-stand__pose sit-to-stand__pose--standing">
        <circle cx="34" cy="7" r="3.2" />
        <path d="M34 11.5v13.5M34 25l-3 16M34 25l3 16M34 15l-3.5 7.5M34 15l3.5 7.5" />
      </g>
    </svg>
  );
}
