import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Board from '../components/Board';

const endPoint =
  process.env.REACT_APP_ENV !== 'production'
    ? `${process.env.REACT_APP_DEV_ENDPOINT}`
    : `${process.env.REACT_APP_PROD_ENDPOINT}`;
const socket = io(`${endPoint}`);

const RoomPage = () => {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (socket.connected) {
      socket.emit('member');
    }
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const getMembers = () => {
      socket.on('member', (member) => {
        setMembers([...members, member]);
      });
    };
    const getMessages = () => {
      socket.on('message', (msg) => {
        setMessages([...messages, msg]);
      });
    };
    if (socket.connected) {
      getMembers();
      getMessages();
    }
  }, [members, messages]);

  return (
    <div>
      <h1>Room Page</h1>
      <h3>上線的人</h3>
      <div>{members?.length > 0 && members.map((member, i) => <p key={`member-${i}`}>{member}</p>)}</div>
      <h3>聊天區</h3>
      <div>{messages?.length > 0 && messages.map((msg, i) => <p key={`message-${i}`}>{msg}</p>)}</div>
      <input value={message} name='message' onChange={(e) => setMessage(e.target.value)}></input>
      <button
        className='my-3 border'
        onClick={(e) => {
          if (message !== '') {
            socket.emit('message', message);
            setMessage('');
          } else {
            alert('Please Add A Message');
          }
        }}
      >
        傳訊息
      </button>
      <h3>畫畫區</h3>
      <Board />
    </div>
  );
};

export default RoomPage;
