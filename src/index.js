import React from 'react';
import { createRoot } from 'react-dom/client';  // Popravljen uvoz
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './contexts/UserContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = createRoot(document.getElementById('root'));  // Uporaba createRoot iz react-dom/client
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

// Registracija service workerja
serviceWorkerRegistration.register();

reportWebVitals();
