import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { ui } from '../content/exercises';

/** DEC-01: solo barra inferior; no hay cabecera de escritorio. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <a className="skip-link" href="#contenido">
        Ir al contenido
      </a>

      <header className="shell__header">
        <span className="shell__brand">
          <Logo size={30} />
          {ui.appName}
        </span>
      </header>

      <main id="contenido" className="shell__main">
        {children}
      </main>

      <nav className="tabbar" aria-label="Secciones">
        <NavLink to="/" className="tabbar__item" end>
          <Icon name="home" />
          {ui.nav.home}
        </NavLink>
        <NavLink to="/rutina/ejercicio" className="tabbar__item">
          <Icon name="routine" />
          {ui.nav.routine}
        </NavLink>
        {/* RF-19: «Próximamente», sin navegación funcional.
            A-5: que no esté disponible se dice con texto, no con un color más flojo. */}
        <span className="tabbar__item tabbar__item--disabled">
          <Icon name="plate" />
          {ui.nav.plate}
          <span className="sr-only"> · {ui.home.soonTitle}</span>
        </span>
        <span className="tabbar__item tabbar__item--disabled">
          <Icon name="family" />
          {ui.nav.family}
          <span className="sr-only"> · {ui.home.soonTitle}</span>
        </span>
      </nav>
    </div>
  );
}
