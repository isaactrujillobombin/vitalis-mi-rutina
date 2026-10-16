import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { ui } from '../content/exercises';

/** DEC-01: solo barra inferior; no hay cabecera de escritorio. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>

      <header className="shell__header">
        <span className="shell__brand">{ui.appName}</span>
      </header>

      <main id="contenido" className="shell__main">
        {children}
      </main>

      <nav className="tabbar" aria-label="Secciones">
        <NavLink to="/" className="tabbar__item" end>
          <span aria-hidden="true">🏠</span>
          {ui.nav.home}
        </NavLink>
        <NavLink to="/rutina/ejercicio" className="tabbar__item">
          <span aria-hidden="true">💪</span>
          {ui.nav.routine}
        </NavLink>
        {/* RF-19: «Próximamente», sin navegación funcional. */}
        <span className="tabbar__item tabbar__item--disabled">
          <span aria-hidden="true">🍽️</span>
          {ui.nav.plate}
        </span>
        <span className="tabbar__item tabbar__item--disabled">
          <span aria-hidden="true">👪</span>
          {ui.nav.family}
        </span>
      </nav>
    </div>
  );
}
