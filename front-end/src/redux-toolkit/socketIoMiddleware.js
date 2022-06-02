import { io } from 'socket.io-client';
import { cookies } from '../context/universalCookie';
import { socketActions } from '../features/socketSlice';

const endPoint =
  process.env.REACT_APP_ENV !== 'production'
    ? `${process.env.REACT_APP_DEV_ENDPOINT}`
    : `${process.env.REACT_APP_PROD_ENDPOINT}`;

const socketEvents = {
  connect: 'connect',
  authentication: 'authentication',
  anonymousSignIn: 'anonymous-signin',
  anonymousSignUp: 'anonymous-singnup',
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
    if (socketActions.startConnecting.match(action)) {
      socket = io(`${endPoint}`);
      socket.on(socketEvents.connect, () => {
        store.dispatch(socketActions.connectionEstablished());
        socket.emit('authentication', cookies.get('jwt'));
      });
      socket.on(socketEvents.anonymousSignIn, (user) => {
        store.dispatch(socketActions.anonymousSignin(user));
      });
      socket.on(socketEvents.anonymousSignUp, (jwt) => {
        cookies.set('jwt', jwt);
        socket.emit('authentication', cookies.get('jwt'));
      });
      socket.on(socketEvents.receiveChat, (chattingData) => {
        // onChatting
        console.log('mid-onChatting', chattingData, cookies);
        store.dispatch(socketActions.receiveChat(chattingData));
      });
      socket.on(socketEvents.receiveDraw, (drawingData) => {
        // onDrawing
        console.log('mid-onDrawing', drawingData);
        store.dispatch(socketActions.receiveDraw(drawingData));
      });
    }

    if (socketActions.sendChat.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendChat, action.payload);
    }
    if (socketActions.sendDraw.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendDraw, action.payload);
    }
    next(action);
  };
};

export default socketIoMiddleware;
