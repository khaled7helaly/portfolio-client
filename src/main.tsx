// Fontsource variable fonts (font-display: swap handled by Fontsource defaults)
import '@fontsource-variable/newsreader';
import '@fontsource-variable/hanken-grotesk';

// Styles (order matters: tokens -> reset -> global)
import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);