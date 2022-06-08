import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { socketIoActions } from '../features/socketIoSlice';
import { useUpdateParticipateMutation } from '../features/apiSlice';
import Canvas from '../components/Canvas';
import ToolBox from '../components/ToolBox';
import ChatBox from '../components/ChatBox';
import Spacer from '../components/Spacer';

const RoomPage = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  let navigate = useNavigate();
  const isConnected = useSelector((state) => state.socketIo.isConnected);
  const [updateParticipate] = useUpdateParticipateMutation();
  const currentParticipate = () => {
    return {
      userUuid: state.userUuid,
      userName: state.userName,
      role: state.role,
      mode: state.mode,
    };
  };

  useEffect(() => {
    if (
      !state ||
      !state?.roomUuid ||
      !state?.mode ||
      !state?.role ||
      !state?.userName ||
      !state?.userUuid ||
      !state?.canvasSize
    ) {
      navigate('/', { replace: true });
    }
  }, [navigate, state]);

  useEffect(() => {
    dispatch(socketIoActions.startConnecting());

    const leaveAndDisconnect = () => {
      dispatch(
        socketIoActions.leaveRoom({
          roomUuid: state.roomUuid,
          participate: currentParticipate(),
        })
      );
      updateParticipate({
        roomUuid: state.roomUuid,
        action: 'leave',
        participate: currentParticipate(),
      });
    };

    window.addEventListener('beforeunload', leaveAndDisconnect);

    return () => {
      leaveAndDisconnect();
      window.removeEventListener('beforeunload', leaveAndDisconnect);
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(
        socketIoActions.joinRoom({
          roomUuid: state.roomUuid,
          participate: currentParticipate(),
        })
      );
      updateParticipate({
        roomUuid: state.roomUuid,
        action: 'join',
        participate: currentParticipate(),
      });
    }
    return;
  }, [isConnected]);

  return (
    <div className='absolute left-0 top-0 h-[10000px] max-h-[10000px] w-[10000px] max-w-[10000px] bg-neutral-300'>
      <Spacer width='w-6' height='h-6' minWidth='min-w-6' minHeight='min-h-6' />
      <ToolBox />
      <Canvas
        locationState={state}
        width={state.canvasSize === 'square' ? 2000 : 2479}
        height={state.canvasSize === 'square' ? 2000 : 1750}
      />
      <ChatBox locationState={state} />
    </div>
  );
};

export default RoomPage;
