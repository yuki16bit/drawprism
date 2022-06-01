import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { socketActions } from '../features/socketSlice';
import Spacer from '../components/Spacer';
import RoomThumbnail from '../components/RoomThumbnail';

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
        <div className='mt-8 h-44'>
          <h1 className='text-center text-4xl font-bold '>DrawPrism</h1>
          <h4 className='mt-3 text-center text-lg font-medium'>Real Time Online Paint Chat.</h4>
          <Link to='/settings'>
            <button className='mx-auto mt-10 block rounded border bg-amber-500 px-4 py-2 text-xl font-medium text-white transition hover:bg-amber-600'>
              Create a room
            </button>
          </Link>
        </div>
      </header>
      {/* Slogan Section */}
      <section id='section-slogan' className='mt-40 mb-20'>
        <h1 className='text-center text-4xl font-bold'>Drawing and Chatting with friends!</h1>
        <h3 className='mt-6 text-center text-xl font-medium'>
          Create a free drawing chat in a second ✨
        </h3>
        <h3 className='mt-2 text-center text-xl font-medium'>
          Anonymously, but still can sign up if you'd like to.
        </h3>
        <h3 className='mt-2 text-center text-xl font-medium'>
          Works only with a browser. No need Flash Player or JavaVM.
        </h3>
      </section>
      {/* Active Rooms Section */}
      <section id='section-active-rooms'>
        <h1 className='mb-10 text-center text-4xl font-bold'>Rooms</h1>
        <div className='flex flex-wrap justify-center gap-y-8 lg:gap-y-10'>
          {activeRooms?.length > 0 ? (
            activeRooms.map((activeRoom, index) => (
              <RoomThumbnail
                key={activeRoom.roomID}
                className={`${
                  activeRooms.length > 3 && activeRooms.length - 1 === index
                    ? 'mr-auto lg:mr-auto'
                    : null
                } relative mx-2 aspect-[1.414/1] basis-full cursor-pointer overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:mx-5 lg:basis-[calc(33.3%-2.5rem)]`}
                roomIndex={index}
                roomName={activeRoom.roomName}
              />
            ))
          ) : (
            <div className='flex aspect-[1.414/1] basis-full flex-col items-center justify-center overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)]'>
              <p className='h-10 w-10 cursor-pointer rounded-full bg-amber-500 text-center font-bold leading-10 text-white transition hover:bg-amber-600'>
                ＋
              </p>
              <p className='mt-3 text-center'>
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
        <h1 className='mb-10 text-center text-4xl font-bold'>History</h1>
        <div className='flex flex-wrap justify-center gap-y-8 lg:gap-y-10'>
          {historyRooms?.length > 0 ? (
            historyRooms.map((historyRoom, index) => (
              <RoomThumbnail
                key={historyRoom.roomID}
                className={`${
                  historyRooms.length > 3 && historyRooms.length - 1 === index
                    ? 'mr-auto lg:mr-auto'
                    : null
                } relative mx-2 aspect-[1.414/1] basis-full cursor-pointer overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:mx-5 lg:basis-[calc(33.3%-2.5rem)]`}
                roomIndex={index}
                roomName={historyRoom.roomName}
              />
            ))
          ) : (
            <div className='flex aspect-[1.414/1] basis-full flex-col items-center justify-center overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)]'>
              <p className='h-10 w-10 rounded-full bg-amber-500 text-center font-bold leading-10 text-white transition hover:bg-amber-600'>
                ×
              </p>
              <p className='mt-3 text-center'>You haven't participate a room yet.</p>
            </div>
          )}
        </div>
      </section>
      <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
    </>
  );
};

export default HomePage;
