import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CookieContext, cookies } from './context/universalCookie.js';
import './index.css';
import Home from './pages/HomePage';
import SignPage from './pages/SignPage';
import RoomPage from './pages/RoomPage';
import SettingsPage from './pages/SettingsPage';
import Container from './components/Container';
import Spacer from './components/Spacer';
import { FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

const Layout = () => {
  return (
    <div
      className={`relative flex min-h-screen flex-col bg-[#f3f3f3] bg-repeat-x font-global text-base`}
    >
      {/* NavBar */}
      <nav className='fixed top-0 right-0 left-0 z-10 bg-gradient-to-b from-neutral-50'>
        <h2 className='fixed top-[25px] left-[32px] z-20 text-2xl font-medium '>
          <Link to='/'>Home</Link>
        </h2>
        <ul className='ml-auto mr-[25px] flex h-[4.75rem] w-fit items-center gap-12'>
          <li className='mt-4 rounded px-2 py-1 font-medium tracking-wide text-neutral-600'>
            <span>Active Room : 0</span>
          </li>
          {/* <li className='mt-4 text-neutral-600 font-medium tracking-wide'>
            <Link to='/room'>開發用: Room Page</Link>
          </li> */}
          <li className='mt-4 font-medium tracking-wide text-neutral-600'>
            <Link to='/sign?type=up'>
              <span className='underline'>Sign up</span>
            </Link>
            　/　
            <Link to='/sign?type=in'>
              <span className='underline'>Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Main */}
      <main className='z-[1] grow'>
        <Spacer width='w-[76px]' height='h-[76px]' minWidth='min-w-full' minHeight='min-h-full' />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/room' element={<RoomPage />} />
          </Routes>
        </Container>
      </main>
      {/* Footer */}
      <footer className='z-[1] mb-10'>
        <Container>
          <h1 className='mb-8 text-center text-4xl font-bold'>Contact</h1>
          <div className='mx-auto h-40 w-40 rounded-full'>
            <img
              alt='avatar-kyo'
              src={`${process.env.PUBLIC_URL + '/images/avatar-kyo.png'}`}
            ></img>
          </div>
          <h2 className='my-3 text-center text-2xl font-medium'>Kyo</h2>
          <h5 className='font-mediu m  text-center'>Web Developer who built this website.</h5>
          <ul className='my-10 flex items-center justify-center gap-16'>
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
      <div className='fixed top-[300px] z-0 w-full lg:top-[310px]'>
        <div className='relative mx-auto h-[990px] w-full bg-image-circle bg-contain bg-top bg-no-repeat lg:bg-[center_10px]'></div>
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
