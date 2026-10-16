import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'return';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Ocupa todo el ancho: en móvil es lo normal. */
  block?: boolean;
  children: ReactNode;
}

/** A-1 y RNF-01: el tamaño mínimo de 48 px lo garantiza la clase .btn en app.css. */
export function Button({ variant = 'primary', block = true, children, ...rest }: Props) {
  const classes = ['btn', `btn--${variant}`];
  if (block) classes.push('btn--block');
  return (
    <button type="button" className={classes.join(' ')} {...rest}>
      {children}
    </button>
  );
}
