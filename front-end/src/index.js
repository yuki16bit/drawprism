import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { CookieContext, cookies } from './context/universalCookie.js';
import './index.css';
import Layout from './pages/Layout';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CookieContext.Provider value={cookies}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CookieContext.Provider>
  </Provider>
  // </React.StrictMode>
);
