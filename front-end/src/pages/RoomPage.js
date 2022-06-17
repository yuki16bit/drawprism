import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { socketIoActions } from '../features/socketIoSlice';
import { useLazyGetAllChatLogQuery } from '../features/apiSlice';
import Canvas from '../components/Canvas';
import ToolBox from '../components/ToolBox';
import ChatBox from '../components/ChatBox';

const RoomPage = ({ user }) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.socketIo.isConnected);
  const [getAllChatLog, { data: allChatLog, isSuccess: isAllChatLogSuccess }] =
    useLazyGetAllChatLogQuery();

  const currentParticipate = useCallback(
    (action) => {
      return {
        roomUuid: state?.roomUuid,
        action: action,
        participate: {
          userUuid: state?.userUuid,
          userName: state?.userName,
          role: state?.role,
          mode: state?.mode,
        },
      };
    },
    [state]
  );

  useEffect(() => {
    getAllChatLog(state?.roomUuid);
  }, [getAllChatLog, state?.roomUuid]);

  useEffect(() => {
    if (isAllChatLogSuccess) {
      dispatch(socketIoActions.addChatLog(allChatLog));
    }
  }, [allChatLog, dispatch, isAllChatLogSuccess]);

  useEffect(() => {
    if (state === null) {
      navigate('/', { replace: true });
    }
    if (state !== null && isConnected && isAllChatLogSuccess) {
      dispatch(socketIoActions.joinRoom(currentParticipate('join')));
    }
    return () => {
      if (state !== null && isConnected && isAllChatLogSuccess) {
        dispatch(socketIoActions.leaveRoom(currentParticipate('leave')));
      }
    };
  }, [state, isConnected, isAllChatLogSuccess, navigate, dispatch, currentParticipate]);

  useEffect(() => {
    const handleTabClose = (e) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className='h-[1920px] w-[3000px] touch-none bg-neutral-300'>
      <>
        <ToolBox />
        <Canvas
          locationState={state}
          width={state?.canvasSize === 'square' ? 1000 : 1748}
          height={state?.canvasSize === 'square' ? 1000 : 1240}
        />
        <ChatBox locationState={state} user={user} />
      </>
    </div>
  );
};

export default RoomPage;
