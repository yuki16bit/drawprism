import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spacer from '../components/Spacer';
import RoomThumbnail from '../components/RoomThumbnail';

const SettingsPage = () => {
  const [screenShots, setScreenShots] = useState([]);
  const [chatLogs, setChatLogs] = useState([]);
  return (
    <>
      <h1 className='mt-8 mb-16 text-center text-4xl font-bold'>Settings</h1>
      <section id='section-room-info' className='mb-8 block gap-x-8 lg:flex'>
        <aside className='flex basis-2/5 flex-col'>
          <RoomThumbnail
            className={`relative mb-6 aspect-[1.414/1] overflow-hidden rounded border border-amber-500 bg-white lg:mb-3`}
            roomIndex='1750 × 2479'
            roomName={`room @ ${`uuid`}`}
          />
          <dt className='font-medium'>Participants</dt>
          <dd className='mb-6 min-h-[100px] grow rounded border bg-white text-lg font-bold md:min-h-[120px] lg:mb-0'></dd>
        </aside>
        <div className='grow basis-3/5'>
          <dt className='font-medium'>Room's Name</dt>
          <dd className='mb-6 text-lg font-bold lg:mb-2'>
            <input className='m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'></input>
          </dd>
          <dt className='font-medium'>Room's Description</dt>
          <dd className='mb-6 text-lg font-bold lg:mb-2'>
            <textarea
              rows='3'
              className='m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
            ></textarea>
          </dd>
          <dt className='font-medium'>Room's Canvas Size</dt>
          <dd className='mt-1 mb-6 flex gap-8 text-lg font-bold lg:mb-2'>
            <div class='flex items-center'>
              <input
                id='radio-square'
                type='radio'
                value='square'
                name='radio-canvas-size'
                class='h-4 w-4 bg-white text-amber-500 accent-amber-600'
              />
              <label for='radio-square' class='ml-2'>
                2000 × 2000 (Square)
              </label>
            </div>
            <div class='flex items-center'>
              <input
                id='radio-a5'
                type='radio'
                value='a5'
                name='radio-canvas-size'
                class='h-4 w-4 bg-white text-amber-500 accent-amber-600'
              />
              <label for='radio-a5' class='ml-2'>
                1750 × 2479 (A5)
              </label>
            </div>
          </dd>
          <dt className='font-medium'>Room Url</dt>
          <dd className='mb-6 text-lg font-bold lg:mb-2'>{`${
            process.env.REACT_APP_ENV !== 'production'
              ? `${process.env.REACT_APP_DEV_ENDPOINT}`
              : `${process.env.REACT_APP_PROD_ENDPOINT}`
          }`}</dd>
          <dt className='font-medium underline'>This is a public room.</dt>
          <dd className='grid grid-cols-1 gap-x-6 lg:grid-cols-2'>
            <div className='text-sm'>
              <span className='font-bold text-red-600'>Following expressions are prohibited:</span>
              <ul className='list-stars mt-1 font-bold'>
                <li>Sexual expressions that are not appropriate for minors to view.</li>
                <li>Violent or grotesque expressions.</li>
                <li>Expressions that may cause fear or discomfort to others.</li>
                <li>Other expressions that are offensive to public order and morals.</li>
              </ul>
            </div>
            <div className='flex flex-col justify-center gap-y-3'>
              <span className='mt-6 text-center lg:mt-0'>Join the Room!</span>
              <Link to='/room' className='block w-full'>
                <button className='block w-full rounded bg-amber-500 px-2 py-1 text-lg text-white transition hover:bg-amber-600'>
                  Join as a Painter.
                </button>
              </Link>
              <Link to='/room' className='block w-full'>
                <button className='block w-full rounded bg-amber-500 px-2 py-1 text-lg text-white transition hover:bg-amber-600'>
                  Join as a Viewer.
                </button>
              </Link>
            </div>
          </dd>
        </div>
      </section>
      <section id='section-room-setting'>
        <dl className='flex flex-col'>
          <dt className='font-medium'>Room's Screen Shots</dt>
          <dd className='mb-8 text-lg font-bold'>
            <div className='my-2 text-sm'>There is no screen shots of this room yet.</div>
            <div className='mt-2 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-6'>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
              <div className='aspect-square rounded border bg-white'></div>
            </div>
          </dd>
          <dt className='font-medium'>Room's Chat Logs</dt>
          <dd className='mb-8 text-lg font-bold'>
            <div className='my-2 text-sm'>Press the button below to see chat logs of this room.</div>
            <button className='block rounded bg-amber-500 px-2 py-1 text-white transition hover:bg-amber-600'>
              Request Chat Logs
            </button>
            <div className='mt-3 min-h-[2.5rem] grow rounded border bg-white text-lg font-bold'></div>
          </dd>
          <dt className='font-medium'>Room Deletion</dt>
          <dd className='mb-8 text-lg font-bold'>
            <div className='my-2 text-sm text-red-600'>All records will be removed! Can't recover.</div>
            <button className='block rounded bg-amber-500 px-2 py-1 text-white transition hover:bg-amber-600'>
              Delete the Room
            </button>
          </dd>
        </dl>
      </section>
      <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
    </>
  );
};

export default SettingsPage;
