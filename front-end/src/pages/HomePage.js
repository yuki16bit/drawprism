import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateSettingMutation,
  useGetAllPreviousDrawLogQuery,
  useGetAllActiveRoomQuery,
} from '../features/apiSlice';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import RoomThumbnail from '../components/RoomThumbnail';
import DotsLoader from '../components/DotsLoader';

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const [
    createSetting,
    {
      data: createSettingRes,
      isLoading: isCreateSettingLoading,
      isSuccess: isCreateSettingSuccess,
    },
  ] = useCreateSettingMutation();

  const { data: allActiveRoom, isSuccess: isLazyGetAllActiveRoomSuccess } =
    useGetAllActiveRoomQuery(null, { pollingInterval: 10000 });

  const { data: allPreviousDrawLog, isSuccess: isGetAllPreviousDrawLogSuccess } =
    useGetAllPreviousDrawLogQuery(null, { pollingInterval: 10000 });

  const createRoom = async (e) => {
    e.preventDefault();
    createSetting(user?.uuid);
  };

  useEffect(() => {
    if (isCreateSettingSuccess) navigate(createSettingRes?.location, { replace: true });
  }, [createSettingRes?.location, isCreateSettingSuccess, navigate]);

  return (
    <Container>
      {/* Header */}
      <header className='z-[1]'>
        <div className='mt-8 h-44'>
          <h1 className='text-center text-4xl font-bold '>DrawPrism</h1>
          <h4 className='mt-3 text-center text-lg font-medium'>Real Time Online Paint Chat.</h4>
          <Link to='/setting' className='mx-auto mt-10 block h-fit w-fit'>
            <button
              onClick={createRoom}
              className='rounded bg-amber-500 px-4 py-2 text-xl font-medium text-white transition hover:bg-amber-600'
            >
              Create a room
            </button>
          </Link>
          {isCreateSettingLoading && (
            <DotsLoader wrapClassName='mt-5 flex items-center justify-center gap-1' dotSize='2' />
          )}
        </div>
      </header>
      {/* Slogan Section */}
      <section id='section-slogan' className='mt-40 mb-20'>
        <h1 className='text-center text-4xl font-bold'>Drawing and Chatting with friends!</h1>
        <h3 className='mt-6 text-center text-xl font-medium'>
          Create a free paint chat room in a second ✨
        </h3>
        <h3 className='mt-2 text-center text-xl font-medium'>
          Anonymously, no registration needed but still can sign up if you'd like to.
        </h3>
        <h3 className='mt-2 text-center text-xl font-medium'>
          Communication between client-side and server-side is handled through Socket.IO.
        </h3>
      </section>
      {/* Active Rooms Section */}
      <section id='section-active-rooms'>
        <h1 className='text-center text-4xl font-bold'>Rooms</h1>
        <p className='mt-3 mb-10 text-center text-sm font-medium'>
          Active Rooms :{isLazyGetAllActiveRoomSuccess ? ` ${allActiveRoom.length}` : ' 0'}
        </p>
        <div className='flex flex-wrap justify-center gap-y-8 lg:gap-y-10'>
          {allActiveRoom?.length > 0 ? (
            allActiveRoom.map((activeRoom, index) => (
              <RoomThumbnail
                key={activeRoom.room_uuid}
                className={`${
                  allActiveRoom.length > 3 && allActiveRoom.length - 1 === index
                    ? 'mr-auto lg:mr-auto'
                    : null
                } relative mx-2 aspect-[1.414/1] basis-full cursor-pointer overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:mx-5 lg:basis-[calc(33.3%-2.5rem)]`}
                roomIndex={`${index + 1}`}
                roomName={activeRoom.room_name}
                roomUuid={activeRoom.room_uuid}
                thumbnail={isGetAllPreviousDrawLogSuccess ? allPreviousDrawLog[index] : undefined}
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
    </Container>
  );
};

export default HomePage;
