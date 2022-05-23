import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/HomePage';
import RoomPage from './Pages/RoomPage';
import RoomSetupPage from './Pages/RoomSetupPage';
import './index.css';
import Container from './components/Container';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

const Layout = () => {
  return (
    <div className={`flex flex-col min-h-screen relative font-global text-base bg-repeat-x bg-[#f3f3f3]`}>
      <nav className='bg-gradient-to-b from-neutral-50'>
        <Container>
          <h1 className='fixed top-[25px] left-[32px] z-20 text-2xl font-medium text-netural-300'>
            <Link to='/'>Home</Link>
          </h1>
          <ul className='h-[4.75rem] w-fit flex gap-6 mx-auto items-center'>
            <li className='mt-4'>NavBar 預定地</li>
            <li className='mt-4'>
              <Link to='/room'>開發用: Room Page</Link>
            </li>
            <li className='mt-4'>
              <Link to='/member'>開發用: Member Page</Link>
            </li>
          </ul>
        </Container>
      </nav>
      <main className='grow z-[1]'>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/room' element={<RoomPage />} />
            <Route path='/room-setup' element={<RoomSetupPage />} />
          </Routes>
        </Container>
      </main>
      <footer className='h-12 z-[1]'>
        <Container>
          <div className='text-center'>footer</div>
        </Container>
      </footer>
      <div className='w-full fixed top-[300px] lg:top-[310px] z-0'>
        <div className='mx-auto relative w-full h-[990px] bg-no-repeat bg-top lg:bg-[center_10px] bg-image-circle bg-contain'></div>
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
