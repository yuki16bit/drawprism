import { io } from 'socket.io-client';
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
  disconnect: 'disconnect',
};

const socketIoMiddleware = (store) => {
  let socket;
  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().socketIo.isConnected;
    if (socketIoActions.startConnecting.match(action)) {
      socket = io(`${endPoint}`);
      socket.on(socketEvents.connect, () => {
        store.dispatch(socketIoActions.connectionEstablished());
        console.log('??????', store.getState().api);
      });
      socket.on(socketEvents.joinRoom, (joinData) => {
        store.dispatch(socketIoActions.receiveChat(joinData));
      });
      socket.on(socketEvents.receiveChat, (chattingData) => {
        store.dispatch(socketIoActions.receiveChat(chattingData));
      });
      socket.on(socketEvents.receiveDraw, (drawingData) => {
        store.dispatch(socketIoActions.receiveDraw(drawingData));
      });
      socket.on(socketEvents.leaveRoom, (leaveData) => {
        store.dispatch(socketIoActions.receiveChat(leaveData));
      });
      socket.on(socketEvents.disconnect, (disconnectData) => {
        store.dispatch(socketIoActions.receiveChat(disconnectData));
      });
    }

    if (socketIoActions.joinRoom.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.joinRoom, action.payload);
    }
    if (socketIoActions.sendChat.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendChat, action.payload);
    }
    if (socketIoActions.sendDraw.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.sendDraw, action.payload);
    }
    if (socketIoActions.leaveRoom.match(action) && isConnectionEstablished) {
      socket.emit(socketEvents.leaveRoom, action.payload);
    }

    next(action);
  };
};

export default socketIoMiddleware;
