import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'

const endPoint = process.env.REACT_APP_ENV !== 'production' ? 'http://localhost:8000' : 'https://drawprism.space'
const socket = io(`${endPoint}`)

const RoomPage = () => {
  const [messages, setMessages] = useState(["Hello SocketIO !"])
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    console.log('connected', socket);
    const getMessages = () => {
      socket.on('message', msg => {
        setMessages([...messages, msg]);
      })
    }
    getMessages();
  }, [messages])

  return (
    <div>
      <h1>Room Page</h1>
      <div>
        {messages?.length > 0 && messages.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
      <input value={message} name='message' onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={(e) => {
        if (message !== '') {
          socket.emit('message', message);
          setMessage('');
        } else {
          alert('Please Add A Message')
        }
      }}>Send Message</button>
    </div>
  );
}

export default RoomPage;