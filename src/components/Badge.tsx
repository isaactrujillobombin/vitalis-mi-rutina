import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warn';
  /** A-5 / RNF-04: el estado nunca se comunica solo con color, siempre lleva texto. */
  icon?: string;
}

export function Badge({ children, tone = 'neutral', icon }: Props) {
  return (
    <span className={`badge badge--${tone}`}>
      {icon !== undefined && (
        <span className="badge__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
