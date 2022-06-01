import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CookieContext, cookies } from './context/universalCookie.js';
import './index.css';
import Home from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import SettingsPage from './pages/SettingsPage';
import Container from './components/Container';
import Spacer from './components/Spacer';
import { FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

const Layout = () => {
  return (
    <div className={`flex flex-col min-h-screen relative font-global text-base bg-repeat-x bg-[#f3f3f3]`}>
      {/* NavBar */}
      <nav className='bg-gradient-to-b from-neutral-50 fixed top-0 right-0 left-0 z-10'>
        <h2 className='fixed top-[25px] left-[32px] z-20 text-2xl font-medium '>
          <Link to='/'>Home</Link>
        </h2>
        <ul className='h-[4.75rem] w-fit flex gap-12 ml-auto mr-[25px] items-center'>
          <li className='mt-4 text-neutral-600 font-medium tracking-wide px-2 py-1 rounded'>
            <span>Active Room : 0</span>
          </li>
          {/* <li className='mt-4 text-neutral-600 font-medium tracking-wide'>
            <Link to='/room'>開發用: Room Page</Link>
          </li> */}
          <li className='mt-4 text-neutral-600 font-medium tracking-wide'>
            <Link to='/member'>Sign up / Sign in</Link>
          </li>
        </ul>
      </nav>
      {/* Main */}
      <main className='grow z-[1]'>
        <Spacer width='w-[76px]' height='h-[76px]' minWidth='min-w-full' minHeight='min-h-full' />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/room' element={<RoomPage />} />
            <Route path='/setup-room' element={<SettingsPage />} />
          </Routes>
        </Container>
      </main>
      {/* Footer */}
      <footer className='z-[1] mb-10'>
        <Container>
          <h1 className='text-center text-4xl font-bold mb-8'>Contact</h1>
          <div className='w-40 h-40 rounded-full mx-auto'>
            <img alt='avatar-kyo' src={`${process.env.PUBLIC_URL + '/images/avatar-kyo.png'}`}></img>
          </div>
          <h2 className='text-center text-2xl font-medium my-3'>Kyo</h2>
          <h5 className='text-center font-mediu  m'>Web Developer who built this website.</h5>
          <ul className='flex gap-16 justify-center items-center my-10'>
            <li className='rounded-full bg-stone-800 p-2'>
              <FiLinkedin size='1.5rem' className='stroke-[1.5] text-white' />
            </li>
            <li className='rounded-full bg-stone-800 p-2'>
              <a target='_blank' href='https://github.com/kyo144' rel='noreferrer'>
                <FiGithub size='1.5rem' className='stroke-[1.5] text-white' />
              </a>
            </li>
            <li className='rounded-full bg-stone-800 p-2'>
              <a target='_blank' href='https://kyo144.dev/' rel='noreferrer'>
                <FiGlobe size='1.5rem' className='stroke-[1.5] text-white' />
              </a>
            </li>
          </ul>
          <p className='text-center'>Copyright © 2022 kyo144</p>
        </Container>
      </footer>
      {/* Background Big Circle */}
      <div className='w-full fixed top-[300px] lg:top-[310px] z-0'>
        <div className='mx-auto relative w-full h-[990px] bg-no-repeat bg-top lg:bg-[center_10px] bg-image-circle bg-contain'></div>
      </div>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookieContext.Provider value={cookies}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CookieContext.Provider>
    </Provider>
  </React.StrictMode>
);
