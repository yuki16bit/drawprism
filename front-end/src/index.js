import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/HomePage';
import RoomPage from './Pages/RoomPage';
import RoomSetupPage from './Pages/RoomSetupPage';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const Layout = () => {
  return (
    <div>
      <nav className='flex'>
        Welcome ! This is Nav Bar
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/room' element={<RoomPage />} />
        <Route path='/room-setup' element={<RoomSetupPage />} />
      </Routes>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

