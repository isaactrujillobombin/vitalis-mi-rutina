import type { HTMLAttributes, ReactNode } from 'react';

type Tone = 'default' | 'highlight' | 'success' | 'calm' | 'muted';

interface Props extends HTMLAttributes<HTMLElement> {
  tone?: Tone;
  children: ReactNode;
}

/** Tarjeta de contenido. Es una <section>: dale `aria-labelledby` con el id de su título. */
export function Card({ tone = 'default', className, children, ...rest }: Props) {
  const classes = ['card'];
  if (tone !== 'default') classes.push(`card--${tone}`);
  if (className !== undefined) classes.push(className);
  return (
    <section className={classes.join(' ')} {...rest}>
      {children}
    </section>
  );
}
