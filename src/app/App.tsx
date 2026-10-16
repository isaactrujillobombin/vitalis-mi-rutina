import type { ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ExercisePage } from '../pages/ExercisePage';
import { HomePage } from '../pages/HomePage';
import { SessionCompletedPage } from '../pages/SessionCompletedPage';
import { SessionPausedPage } from '../pages/SessionPausedPage';
import { AppShell } from './AppShell';

/**
 * RF-17: las pantallas de resultado solo tienen sentido viniendo del flujo.
 * Si alguien pega la URL directamente, va a Inicio.
 */
function RequireFlow({ children }: { children: ReactElement }) {
  const location = useLocation();
  const state = location.state as { fromFlow?: boolean } | null;
  if (state?.fromFlow !== true) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rutina/ejercicio" element={<ExercisePage />} />
          <Route
            path="/rutina/registrada"
            element={
              <RequireFlow>
                <SessionCompletedPage />
              </RequireFlow>
            }
          />
          <Route
            path="/rutina/pausada"
            element={
              <RequireFlow>
                <SessionPausedPage />
              </RequireFlow>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
