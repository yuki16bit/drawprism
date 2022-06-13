import { useEffect } from 'react';
import { useGetUserQuery, useLogOutUserMutation } from '../features/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, matchPath, useNavigate } from 'react-router';
import { useLazyGetAllActiveRoomQuery } from '../features/apiSlice';
import { Routes, Route, Link } from 'react-router-dom';
import { socketIoActions } from '../features/socketIoSlice';
import ScrollToTop from './ScrollToTop';
import Home from './HomePage';
import SignPage from './SignPage';
import RoomPage from './RoomPage';
import SettingPage from './SettingPage';
import NotFoundPage from './NotFoundPage';
import Container from '../components/Container';
import Spacer from '../components/Spacer';
import ExternalLink from '../components/ExternalLink';
import { FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

const Layout = () => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.socketIo.isConnected);

  const { pathname } = useLocation();
  const isRoomPath = matchPath('/room', pathname);

  const {
    data: user,
    isLoading: isGetUserLoading,
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    error: getUserError,
  } = useGetUserQuery();
  const [logOutUser] = useLogOutUserMutation();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (isGetUserSuccess && !isConnected) {
      dispatch(socketIoActions.startConnecting(user?.uuid));
    }
  }, [isGetUserSuccess, isConnected]);

  return (
    <div
      className={`relative flex min-h-screen flex-col bg-neutral-100 bg-repeat-x font-global text-base`}
    >
      {/* NavBar */}
      <nav
        className={`fixed top-0 right-0 left-0 z-10 ${
          isRoomPath ? 'bg-amber-500/90' : 'bg-gradient-to-b from-neutral-50'
        }`}
      >
        {isRoomPath ? (
          <ul className='relative flex h-6 justify-end gap-12 px-4 font-medium text-white'>
            <div className='absolute left-4 underline'>
              <ExternalLink href='/'>
                <li>DrawPrism</li>
              </ExternalLink>
            </div>
            <li>👥123</li>
            <li className='underline'>Room Info</li>
            <li className='underline'>Reset Windows</li>
          </ul>
        ) : (
          <>
            <h2 className='fixed top-[25px] left-[32px] z-20 text-2xl font-medium '>
              <Link to='/'>Home</Link>
            </h2>
            <ul className='ml-auto mr-[25px] flex h-[4.75rem] w-fit items-center gap-12'>
              <li className='mt-4 rounded px-2 py-1 font-medium tracking-wide text-neutral-600'>
                <span>Active Room : 0</span>
              </li>
              <li className='mt-4 font-medium tracking-wide text-neutral-600'>
                {isGetUserLoading ? (
                  <p>isLoading</p>
                ) : isGetUserSuccess ? (
                  user.isAnonymous ? (
                    <>
                      <Link to='/sign?mode=up'>
                        <span className='underline'>Sign up</span>
                      </Link>
                      {' / '}
                      <Link to='/sign?mode=in'>
                        <span className='underline'>Sign in</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to='/member'>
                        <span className='underline'>Member</span>
                      </Link>
                      {' / '}
                      <button
                        onClick={() => {
                          logOutUser(user.uuid);
                        }}
                      >
                        <span className='underline'>Log Out</span>
                      </button>
                    </>
                  )
                ) : (
                  isGetUserError && <p>{getUserError}</p>
                )}
              </li>
            </ul>
          </>
        )}
      </nav>
      {/* Main */}
      <main className='z-[1] grow'>
        {!isRoomPath && (
          <Spacer width='w-[76px]' height='h-[76px]' minWidth='min-w-full' minHeight='min-h-full' />
        )}
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<Home user={user} />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/setting' element={<SettingPage user={user} />} />
            <Route path='/room' element={<RoomPage user={user} />} />
            <Route path='/room/:roomUuid' element={<SettingPage user={user} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ScrollToTop>
      </main>
      {/* Footer */}
      {!isRoomPath && (
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
      )}
      {/* Background Big Circle */}
      {!isRoomPath && (
        <div className='fixed top-[300px] z-0 w-full lg:top-[310px]'>
          <div className='relative mx-auto h-[990px] w-full bg-image-circle bg-contain bg-top bg-no-repeat lg:bg-[center_10px]'></div>
        </div>
      )}
    </div>
  );
};

export default Layout;
