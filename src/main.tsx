import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/index.css';
import App from './app/App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container with id="root" not found in index.html');
}
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
