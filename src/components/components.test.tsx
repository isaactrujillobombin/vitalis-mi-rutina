import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

describe('Button', () => {
  it.each(['primary', 'secondary', 'return'] as const)(
    'RNF-01: la variante %s usa la clase con tamaño mínimo de 48 px',
    (variant) => {
      render(<Button variant={variant}>Acción</Button>);
      const button = screen.getByRole('button', { name: 'Acción' });
      expect(button).toHaveClass('btn', `btn--${variant}`);
      expect(button).toHaveAttribute('type', 'button');
    },
  );

  it('RNF-01: se puede enfocar con el teclado', () => {
    render(<Button>Acción</Button>);
    const button = screen.getByRole('button', { name: 'Acción' });
    button.focus();
    expect(button).toHaveFocus();
  });
});

describe('Badge', () => {
  it('RNF-04: el estado lleva texto además del icono', () => {
    render(
      <Badge tone="success" icon="✓">
        Hecha hoy
      </Badge>,
    );
    expect(screen.getByText('Hecha hoy')).toHaveClass('badge', 'badge--success');
  });
});

describe('Card', () => {
  it('RNF-12: es una sección con nombre accesible', () => {
    render(
      <Card tone="highlight" aria-labelledby="t">
        <h2 id="t">Título</h2>
      </Card>,
    );
    expect(screen.getByRole('region', { name: 'Título' })).toHaveClass('card', 'card--highlight');
  });
});
