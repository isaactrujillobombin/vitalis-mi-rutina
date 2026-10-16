import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './app/tokens.css';
import './app/app.css';

const container = document.getElementById('root');
if (container === null) {
  throw new Error('No se ha encontrado el elemento #root.');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
