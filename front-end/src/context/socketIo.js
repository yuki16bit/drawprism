import { createContext } from 'react';
import { io } from 'socket.io-client';
const endPoint =
  process.env.REACT_APP_ENV !== 'production'
    ? `${process.env.REACT_APP_DEV_ENDPOINT}`
    : `${process.env.REACT_APP_PROD_ENDPOINT}`;
export const socket = io(`${endPoint}`);
console.log('context/socket', socket);
export const SocketContext = createContext();
