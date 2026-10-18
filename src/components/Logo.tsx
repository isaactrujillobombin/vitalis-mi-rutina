/**
 * Marca de Vitalis: corazón abierto (azul) con una hoja (naranja).
 * Redibujada en SVG a partir del logo del equipo para que se vea nítida a cualquier tamaño.
 * Decorativa: el nombre «Vitalis» va siempre en texto al lado.
 */
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M23 40C14 33 6.5 26.5 6.5 17.5 6.5 11.5 10.8 7.5 15.8 7.5c3.4 0 6.2 1.9 8.2 4.8 2-2.9 4.8-4.8 8.2-4.8 5 0 9.3 4 9.3 10 0 2.4-.7 4.6-1.9 6.6"
        stroke="var(--navy)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M27 42c0-9.5 6.5-16 16.5-16.5C43.5 35 37 42 27 42z" fill="var(--accent)" />
      <path
        d="M30 39.5c2.5-4.5 6-7.8 10-10"
        stroke="#ffffff"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}
