import React, { useEffect, useState } from 'react';
import useQueryString from '../custom-hooks/useQueryString';
import {
  useGetSettingQuery,
  useDeleteSettingMutation,
  useUpdateSettingMutation,
  useLazyGetAllChatLogQuery,
  useGetAllParticipateQuery,
  useGetPreviousDrawLogQuery,
} from '../features/apiSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import RoomThumbnail from '../components/RoomThumbnail';
import Divider from '../components/Divider';
import ScreenShotThumbnail from '../components/ScreenShotThumbnail';
import DotsLoader from '../components/DotsLoader';

const SettingPage = ({ user }) => {
  const { roomUuid } = useParams();
  const queryString = useQueryString();
  const navigate = useNavigate();

  const {
    data: setting,
    isLoading: isGetSettingLoading,
    isSuccess: isGetSettingSuccess,
  } = useGetSettingQuery(roomUuid ? roomUuid : queryString.get('room'));

  const [deleteSetting, { isLoading: isDeleteSettingLoading, isSuccess: isDeleteSettingSuccess }] =
    useDeleteSettingMutation();

  const [updateSetting, { isLoading: isUpdateSettingLoading }] = useUpdateSettingMutation();

  const [
    getAllChatLog,
    {
      data: lazyAllChatLog,
      isLoading: isLazyGetAllChatLogLoading,
      isSuccess: isLazyGetAllChatLogSuccess,
    },
  ] = useLazyGetAllChatLogQuery();

  const { data: previousDrawLog } = useGetPreviousDrawLogQuery(
    roomUuid ? roomUuid : queryString.get('room'),
    {
      pollingInterval: 10000,
    }
  );

  const {
    data: allParticipate,
    isLoading: isGetAllParticipateLoading,
    isSuccess: isGetAllParticipateSuccess,
  } = useGetAllParticipateQuery(roomUuid ? roomUuid : queryString.get('room'), {
    pollingInterval: 10000,
  });

  const [isOwner, setIsOwner] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [canvasSize, setCanvasSize] = useState('');

  const calcCanvasSizeNum = (canvasSize) => {
    return canvasSize === 'square' ? '1000 × 1000' : '1748 × 1240';
  };

  const lazyRequestAllChatLog = () => {
    getAllChatLog(setting?.roomUuid);
  };
  const changeSetting = () => {
    if (roomName === '') {
      return;
    } else {
      updateSetting({
        roomUuid: setting?.roomUuid,
        roomName: String(roomName),
        roomDescription: String(roomDescription),
        canvasSize: String(canvasSize),
      });
    }
  };
  const deleteRoom = () => {
    deleteSetting(setting?.roomUuid);
  };

  useEffect(() => {
    if (isGetSettingSuccess) {
      setIsOwner(setting?.ownerUuid === user?.uuid ? true : false);
      setRoomName(setting?.roomName ? setting.roomName : '');
      setRoomDescription(setting?.roomDescription ? setting.roomDescription : '');
      setCanvasSize(setting?.canvasSize ? setting.canvasSize : 'square');
    }
  }, [isGetSettingSuccess, setting, user]);

  useEffect(() => {
    if (isDeleteSettingSuccess) navigate('/', { replace: true });
  }, [isDeleteSettingSuccess, navigate]);

  return (
    <Container>
      <h1 className='mt-8 mb-16 text-center text-4xl font-bold'>Setting</h1>
      {isGetSettingLoading && (
        <DotsLoader wrapClassName='flex h-96 items-center justify-center gap-2' dotSize='4' />
      )}
      {isGetSettingSuccess && (
        <>
          <section id='section-room-info' className='mb-8 block gap-x-8 lg:flex'>
            <aside className='flex basis-2/5 flex-col'>
              <RoomThumbnail
                className={`relative mb-2 aspect-[1.414/1] overflow-hidden rounded border border-amber-500 bg-white lg:mb-1`}
                roomIndex={setting?.canvasSize ? calcCanvasSizeNum(setting.canvasSize) : '—'}
                roomName={setting?.roomName ? setting.roomName : 'room @ —'}
                thumbnail={
                  previousDrawLog
                    ? previousDrawLog
                    : `${process.env.PUBLIC_URL}/images/thumbnail-room-empty.png`
                }
              />
              <dl className='mb-2 flex justify-end gap-1 text-sm'>
                <dt>Create On :</dt>
                <dd className='mr-2 font-medium'>
                  {setting?.createOn ? new Date(setting.createOn).toLocaleDateString('en-CA') : '—'}
                </dd>
                <dt>Last Activity :</dt>
                <dd className='font-medium'>
                  {setting?.lastActivity
                    ? new Date(setting.lastActivity).toLocaleDateString('en-CA')
                    : '—'}
                </dd>
              </dl>
              <dt className='flex gap-4 font-medium'>
                Participants
                {isGetAllParticipateLoading && (
                  <DotsLoader wrapClassName='flex items-center justify-center gap-1' dotSize='2' />
                )}
              </dt>
              <dd className='mb-6 h-[100px] grow basis-auto overflow-y-auto rounded border bg-white px-4 py-2 text-lg font-bold md:min-h-[120px] lg:mb-2'>
                {isGetAllParticipateSuccess && allParticipate?.length > 0 ? (
                  allParticipate.map((participate) => (
                    <div key={`${participate.id}`}>
                      <span className='font-medium text-amber-500'>{`${participate.role} : ${participate.userName} : `}</span>
                      {participate.mode}
                    </div>
                  ))
                ) : (
                  <p className='text-sm font-medium leading-[2rem] text-neutral-400'>
                    No one here yet.
                  </p>
                )}
              </dd>
            </aside>
            <div className='grow basis-3/5'>
              <dt className='font-medium'>
                <span className='text-red-600'>*</span> Room's Name
              </dt>
              <dd className='mb-6 flex gap-2 text-lg font-bold lg:mb-2'>
                <input
                  value={roomName}
                  disabled={!isOwner}
                  onChange={(e) => setRoomName(e.target.value)}
                  className={`${
                    roomName === '' ? 'border-red-600 ' : null
                  } m-0 block grow rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none`}
                ></input>
              </dd>
              <dt className='font-medium'>Room's Description</dt>
              <dd className='mb-6 text-lg font-bold lg:mb-2'>
                <textarea
                  value={roomDescription}
                  disabled={!isOwner}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  rows='3'
                  className='m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
                ></textarea>
              </dd>
              <dt className='font-medium'>Room's Canvas Size</dt>
              <dd className='mt-1 mb-6 flex gap-8 text-lg font-bold lg:mb-2'>
                <div className='flex items-center'>
                  <input
                    id='radio-square'
                    type='radio'
                    value='square'
                    checked={canvasSize === 'square'}
                    onChange={() => setCanvasSize('square')}
                    disabled={!isOwner}
                    name='radio-canvas-size'
                    className='h-4 w-4 bg-white text-amber-500 accent-amber-600'
                  />
                  <label htmlFor='radio-square' className='ml-2'>
                    1000 × 1000 (Square)
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='radio-a6'
                    type='radio'
                    value='a6'
                    checked={canvasSize === 'a6'}
                    onChange={() => setCanvasSize('a6')}
                    disabled={!isOwner}
                    name='radio-canvas-size'
                    className='h-4 w-4 bg-white text-amber-500 accent-amber-600'
                  />
                  <label htmlFor='radio-a6' className='ml-2'>
                    1748 × 1240 (A6)
                  </label>
                </div>
              </dd>
              <dt className='font-medium'>Room Url</dt>
              <dd className='mb-6 text-lg font-bold lg:mb-2'>
                <Link to={`/room/${setting?.roomUuid}`}>
                  <span className='text-blue-500 underline transition hover:text-blue-700'>
                    {process.env.REACT_APP_ENV !== 'production'
                      ? `http://127.0.0.1:3000/room/${setting?.roomUuid}`
                      : `https://drawprism.space/${setting?.roomUuid}`}
                  </span>
                </Link>
              </dd>
              <dt className='font-medium underline'>This is a public room.</dt>
              <dd className='grid grid-cols-1 gap-x-6 lg:grid-cols-2'>
                <div className='text-sm'>
                  <span className='font-bold text-red-600'>
                    Following expressions are prohibited:
                  </span>
                  <ul className='list-stars mt-1 font-bold'>
                    <li>Sexual expressions that are not appropriate for minors to view.</li>
                    <li>Violent or grotesque expressions.</li>
                    <li>Expressions that may cause fear or discomfort to others.</li>
                    <li>Other expressions that are offensive to public order and morals.</li>
                  </ul>
                </div>
                <div className='flex flex-col gap-y-3'>
                  <span className='mt-6 text-center lg:mt-0'>Join the Room!</span>
                  <Link
                    to={'/room'}
                    className='block w-full'
                    state={{
                      roomUuid: setting?.roomUuid,
                      userName: user?.name,
                      userUuid: user?.uuid,
                      role: isOwner ? 'Owner' : 'Guest',
                      mode: 'painter',
                      canvasSize: setting?.canvasSize,
                    }}
                  >
                    <button className='block w-full rounded bg-amber-500 px-2 py-1 text-lg text-white transition hover:bg-amber-600'>
                      Join as a Painter
                    </button>
                  </Link>
                  <Link
                    to={'/room'}
                    className='block w-full'
                    state={{
                      roomUuid: setting?.roomUuid,
                      userName: user?.name,
                      userUuid: user?.uuid,
                      role: isOwner ? 'Owner' : 'Guest',
                      mode: 'viewer',
                      canvasSize: setting?.canvasSize,
                    }}
                  >
                    <button className='block w-full rounded bg-amber-500 px-2 py-1 text-lg text-white transition hover:bg-amber-600'>
                      Join as a Viewer
                    </button>
                  </Link>
                </div>
              </dd>
              {isOwner && (
                <>
                  <Divider message='Owners Only' wrapClassName='relative flex items-center py-2' />
                  <button
                    onClick={changeSetting}
                    disabled={!isOwner}
                    className='block w-full rounded bg-amber-500 px-2 py-1 text-lg text-white transition hover:bg-amber-600'
                  >
                    Confirm Change
                  </button>
                  <div className='mt-2 flex items-center justify-between'>
                    {isUpdateSettingLoading && (
                      <DotsLoader
                        wrapClassName='flex items-center justify-center gap-1'
                        dotSize='2'
                      />
                    )}
                    <span className='ml-auto block text-right text-[0.9rem] font-bold text-red-600'>
                      💎 Don't forget to press after settings have been edited.
                    </span>
                  </div>
                </>
              )}
            </div>
          </section>
          <section id='section-room-setting'>
            <dl className='flex flex-col'>
              <dt className='font-medium'>Room's Screen Shots</dt>
              <dd className='mb-8 text-lg font-bold'>
                <div className='my-2 text-sm'>
                  {setting?.screenShots?.length > 0
                    ? 'Here are captured screen shot(s) of this room!'
                    : 'There is no screen shots of this room yet.'}
                </div>
                <div className='mt-2 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6'>
                  {setting?.screenShots?.length > 0 ? (
                    <ScreenShotThumbnail
                      isNone={false}
                      thumbnailId='chuan-xu-3lovxIcj6y8-unsplash'
                      thumbnail='https://d65y90rhb79bo.cloudfront.net/msgboard/chuan-xu-3lovxIcj6y8-unsplash.jpg'
                    />
                  ) : (
                    <ScreenShotThumbnail />
                  )}
                </div>
              </dd>
              <dt className='font-medium'>
                Room's Chat Logs{' '}
                <span className='ml-1 text-sm font-medium text-neutral-500 underline'>
                  Owners Only
                </span>
              </dt>
              <dd className='mb-8 text-lg'>
                <div className='my-2 text-sm font-bold'>
                  Press the button below to see chat logs of this room.
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    disabled={!isOwner}
                    onClick={lazyRequestAllChatLog}
                    className='block rounded bg-amber-500 px-2 py-1 text-white transition hover:bg-amber-600'
                  >
                    Request Chat Logs
                  </button>
                  {isLazyGetAllChatLogLoading && (
                    <DotsLoader
                      wrapClassName='flex items-center justify-center gap-1'
                      dotSize='2'
                    />
                  )}
                </div>
                <div className='mt-3 max-h-[540px] min-h-[2.5rem] grow overflow-auto rounded border bg-white px-4 py-2'>
                  {isLazyGetAllChatLogSuccess && lazyAllChatLog?.length > 0 ? (
                    lazyAllChatLog.map((chatLine) => (
                      <div key={`${chatLine.id}`}>
                        {chatLine.talkerUuid !== undefined && (
                          <span className='font-medium text-amber-500'>
                            {`${chatLine.talkerName} (${chatLine.talkerUuid}) `}:{' '}
                          </span>
                        )}
                        {chatLine.text}
                      </div>
                    ))
                  ) : (
                    <p className='text-sm font-medium leading-[2rem] text-neutral-400'>
                      Nothing here yet.
                    </p>
                  )}
                </div>
              </dd>
              <dt className='font-medium'>
                Room Deletion{' '}
                <span className='ml-1 text-sm font-medium text-neutral-500 underline'>
                  Owners Only
                </span>
              </dt>
              <dd className='mb-8 text-lg font-bold'>
                <p className='my-2 text-sm text-red-600'>
                  All records will be removed! Can't recover.
                </p>
                <div className='flex gap-4'>
                  <button
                    onClick={deleteRoom}
                    disabled={!isOwner}
                    className='block rounded bg-amber-500 px-2 py-1 text-white transition hover:bg-amber-600'
                  >
                    Delete the Room
                  </button>
                  {isDeleteSettingLoading && (
                    <DotsLoader
                      wrapClassName='flex items-center justify-center gap-1'
                      dotSize='2'
                    />
                  )}
                </div>
              </dd>
            </dl>
          </section>
        </>
      )}
      <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
    </Container>
  );
};

export default SettingPage;
