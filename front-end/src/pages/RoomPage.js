import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { socketIoActions } from '../features/socketIoSlice';

import Canvas from '../components/Canvas';
import ToolBox from '../components/ToolBox';
import ChatBox from '../components/ChatBox';
import Spacer from '../components/Spacer';

const RoomPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    console.log(state?.roomUuid, state?.mode);
    if (!state || !state?.roomUuid || !state?.mode) {
      navigate('/', { replace: true });
    }
  }, [navigate, state]);

  useEffect(() => {
    dispatch(socketIoActions.startConnecting());
  }, [dispatch]);

  return (
    <div className='absolute left-0 top-0 h-[10000px] max-h-[10000px] w-[10000px] max-w-[10000px] bg-neutral-300'>
      <Spacer width='w-6' height='h-6' minWidth='min-w-6' minHeight='min-h-6' />
      <ToolBox />
      <Canvas />
      <ChatBox />
    </div>
  );
};

export default RoomPage;
