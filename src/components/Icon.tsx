/**
 * Iconos de trazo dibujados a mano (sin librerías ni CDN: P-3, C-7).
 * Siempre decorativos: el texto de al lado es lo que comunica (RNF-04).
 */
const paths = {
  home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" />,
  routine: <path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11" />,
  plate: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  family: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M3.5 19.5c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5M15 14.6c2.9-.6 5.5 1.4 5.5 4.9" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />,
  pause: <path d="M8 5.5v13M16 5.5v13" />,
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
