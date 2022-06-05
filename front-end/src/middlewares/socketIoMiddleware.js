import { io } from 'socket.io-client';
import { cookies } from '../context/universalCookie';
import { socketIoActions } from '../features/socketIoSlice';

const endPoint =
  process.env.REACT_APP_ENV !== 'production'
    ? `${process.env.REACT_APP_DEV_ENDPOINT}`
    : `${process.env.REACT_APP_PROD_ENDPOINT}`;

const socketEvents = {
  connect: 'connect',
  joinRoom: 'join-room',
  leaveRoom: 'leave-room',
  sendDraw: 'send-draw',
  receiveDraw: 'receive-draw',
  sendChat: 'send-chat',
  receiveChat: 'receive-chat',
  requestChatLog: 'request-chatlog',
  requestDrawLog: 'request-drawlog',
  disconnect: 'disconnect',
};

const socketIoMiddleware = (store) => {
  let socket;
  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().socket.isConnected;
    if (socketIoActions.startConnecting.match(action)) {
      socket = io(`${endPoint}`);
      socket.on(socketEvents.connect, () => {
        store.dispatch(socketIoActions.connectionEstablished());
        console.log('connected!');
      });
      socket.on(socketEvents.receiveChat, (chattingData) => {
        // onChatting
        console.log('mid-onChatting', chattingData, cookies);
        store.dispatch(socketIoActions.receiveChat(chattingData));
      });
      socket.on(socketEvents.receiveDraw, (drawingData) => {
        // onDrawing
        console.log('mid-onDrawing', drawingData);
        store.dispatch(socketIoActions.receiveDraw(drawingData));
      });
    }

    if (socketIoActions.sendChat.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendChat, action.payload);
    }
    if (socketIoActions.sendDraw.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendDraw, action.payload);
    }
    next(action);
  };
};

export default socketIoMiddleware;
