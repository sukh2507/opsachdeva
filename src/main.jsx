import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { primeRenderedImageCache } from './utils/mediaCache.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.PROD) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // The site remains functional if service-worker registration is unavailable.
    });
  }

  // On the first-ever visit the service worker cannot intercept resources that
  // loaded before it took control. Prime already-rendered R2 images once the
  // initial page finishes so repeat visits/navigation can use CacheStorage.
  window.addEventListener('load', () => {
    primeRenderedImageCache();
  });
}
