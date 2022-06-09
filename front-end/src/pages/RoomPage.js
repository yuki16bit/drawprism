import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { socketIoActions } from '../features/socketIoSlice';
import { useUpdateParticipateMutation } from '../features/apiSlice';
import Canvas from '../components/Canvas';
import ToolBox from '../components/ToolBox';
import ChatBox from '../components/ChatBox';

const RoomPage = () => {
  const dispatch = useDispatch();

  const { state } = useLocation();
  let navigate = useNavigate();

  const [updateParticipate] = useUpdateParticipateMutation();

  const currentParticipate = useCallback(() => {
    return {
      userUuid: state?.userUuid,
      userName: state?.userName,
      role: state?.role,
      mode: state?.mode,
    };
  }, [state?.mode, state?.role, state?.userName, state?.userUuid]);

  useEffect(() => {
    if (state === null) {
      navigate('/', { replace: true });
    } else {
      dispatch(
        socketIoActions.joinRoom({
          roomUuid: state?.roomUuid,
          participate: currentParticipate(),
        })
      );
      updateParticipate({
        roomUuid: state?.roomUuid,
        action: 'join',
        participate: currentParticipate(),
      });
    }

    const leave = () => {
      dispatch(
        socketIoActions.leaveRoom({
          roomUuid: state?.roomUuid,
          participate: currentParticipate(),
        })
      );
      updateParticipate({
        roomUuid: state?.roomUuid,
        action: 'leave',
        participate: currentParticipate(),
      });
    };

    window.addEventListener('beforeunload', leave);

    return () => {
      if (state !== null) leave();
      window.removeEventListener('beforeunload', leave);
    };
  }, [currentParticipate, dispatch, navigate, state, updateParticipate]);

  return (
    <div className='h-[1920px] w-[3000px] bg-neutral-300'>
      <>
        <ToolBox />
        <Canvas
          locationState={state}
          width={state?.canvasSize === 'square' ? 2000 : 2479}
          height={state?.canvasSize === 'square' ? 2000 : 1750}
        />
        <ChatBox locationState={state} />
      </>
    </div>
  );
};

export default RoomPage;
