import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { socketActions } from '../features/socketSlice';
import Spacer from '../components/Spacer';

const HomePage = () => {
  const dispatch = useDispatch();
  const [activeRooms, setactiveRooms] = useState([]);
  const [historyRooms, setHistoryRooms] = useState([]);

  useEffect(() => {
    dispatch(socketActions.startConnecting());
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <header className='z-[1]'>
        <div className='h-44 mt-8'>
          <h1 className='text-center text-4xl font-bold '>DrawPrism</h1>
          <h4 className='text-center text-lg font-medium mt-3'>Real Time Online Paint Chat.</h4>
          <Link to='/setup-room'>
            <button className='block px-4 py-2 mx-auto mt-10 border rounded text-xl bg-amber-500 hover:bg-amber-500/80 transition text-white font-medium'>
              Create a room
            </button>
          </Link>
        </div>
      </header>
      {/* Slogan Section */}
      <section id='section-slogan' className='mt-40 mb-20'>
        <h1 className='text-center text-4xl font-bold'>Drawing and Chatting with friends!</h1>
        <h3 className='text-center text-xl font-medium mt-6'>Create a free drawing chat in a second!</h3>
        <h3 className='text-center text-xl font-medium mt-2'>There is no need to register. Anonymously.</h3>
        <h3 className='text-center text-xl font-medium mt-2'>Works only with a browser. No need Flash and JavaVM.</h3>
      </section>
      {/* Active Rooms Section */}
      <section id='section-active-rooms'>
        <h1 className='text-center text-4xl font-bold mb-10'>Rooms</h1>
        <div className='flex flex-wrap justify-center gap-y-8 lg:gap-y-10'>
          {activeRooms?.length > 0 ? (
            activeRooms.map((activeRoom, index) => (
              <div
                key={activeRoom.roomID}
                className={`${
                  activeRooms.length > 3 && activeRooms.length - 1 === index ? 'mr-auto lg:mr-auto' : null
                } mx-2 lg:mx-5 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)] aspect-[1.414/1] border rounded bg-white relative cursor-pointer overflow-hidden border-amber-500`}
              >
                <div className='w-8 h-8 text-center leading-8 absolute top-0 left-0 bg-amber-500 text-white font-medium opacity-90'>
                  {index}
                </div>
                <div className='w-full h-8 text-center leading-8 absolute bottom-0 bg-amber-500 text-white tracking-wider font-medium opacity-90 px-3'>
                  <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{activeRoom.roomName}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)] aspect-[1.414/1] flex flex-col justify-center items-center border rounded bg-white overflow-hidden border-amber-500'>
              <p className='text-white rounded-full w-10 h-10 bg-amber-500 font-bold text-center leading-10 cursor-pointer transition hover:bg-amber-500/80'>
                ＋
              </p>
              <p className='text-center mt-3'>
                There's no room yet, <br />
                press plus button to create one.
              </p>
            </div>
          )}
        </div>
      </section>
      <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
      {/* History Rooms Section */}
      <section id='section-history-rooms'>
        <h1 className='text-center text-4xl font-bold mb-10'>History</h1>
        <div className='flex flex-wrap gap-y-8 lg:gap-y-10 justify-center'>
          {historyRooms?.length > 0 ? (
            historyRooms.map((historyRoom, index) => (
              <div
                key={historyRoom.roomID}
                className={`${
                  historyRooms.length > 3 && historyRooms.length - 1 === index ? 'mr-auto lg:mr-auto' : null
                } mx-2 lg:mx-5 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)] aspect-[1.414/1] border rounded bg-white relative cursor-pointer overflow-hidden border-amber-500`}
              >
                <div className='w-8 h-8 text-center leading-8 absolute top-0 left-0 bg-amber-500 text-white font-medium opacity-90'>
                  {index}
                </div>
                <div className='w-full h-8 text-center leading-8 absolute bottom-0 bg-amber-500 text-white tracking-wider font-medium opacity-90 px-3'>
                  <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{historyRoom.roomName}</p>
                </div>
              </div>
            ))
          ) : (
            <div className='basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)] aspect-[1.414/1] flex flex-col justify-center items-center border rounded bg-white overflow-hidden border-amber-500'>
              <p className='text-white rounded-full w-10 h-10 bg-amber-500 font-bold text-center leading-10 transition hover:bg-amber-500/80'>
                ×
              </p>
              <p className='text-center mt-3'>You haven't participate a room yet.</p>
            </div>
          )}
        </div>
      </section>
      <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
    </>
  );
};

export default HomePage;
