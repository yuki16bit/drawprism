import { useState, useContext, useEffect } from 'react';
// import { SocketContext } from '../context/socketIo';
import Draggable from 'react-draggable';

const ChatBox = () => {
  // const socket = useContext(SocketContext);
  const [chattingText, setChattingText] = useState('');
  const [chatLines, setChatLines] = useState([]);
  const onKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      // chattingText !== '' && socket.emit('chatting', String(chattingText));
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
  };

  // useEffect(() => {
  //   socket.on('chat', (chatLine) => setChatLines([chatLine, ...chatLines]));
  // }, [chatLines, socket]);

  return (
    <Draggable handle='strong'>
      <div
        className='
        absolute
        top-[100px]
        right-[10px]
        left-[1370px]
        z-10
        flex h-80 min-h-[100px] w-72
        min-w-[200px]
        resize
        flex-col
        overflow-hidden
        rounded border border-neutral-200 bg-white'
      >
        <strong className='cursor-grab'>
          <div className='bg-amber-500 px-2 py-1 text-white'>Chat Room</div>
        </strong>
        <div className='flex h-8'>
          <input
            name='chat-typing-text'
            type='text'
            value={chattingText}
            className='block w-full border border-lime-700 px-2 py-1'
            onChange={(e) => setChattingText(e.target.value)}
            placeholder='[Enter] Talking / [Esc] Drawing'
            onKeyDown={onKeyDownInput}
          />
        </div>
        <div className='h-full overflow-y-scroll p-2'>
          <div className='mb-1'>
            <span className='font-medium text-amber-500'>匿名柚柚 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-amber-500'>匿名柚柚 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-amber-500'>匿名柚柚 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-amber-500'>匿名柚柚 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-amber-500'>匿名柚柚</span> (998b19a) has{' '}
            <div className='text-sky-500'>joined</div> this room. (👥2)
          </div>
          <div className='mb-1'>
            <span className='font-medium text-rose-400'>匿名蘭格 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-rose-400'>匿名蘭格 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-rose-400'>匿名蘭格 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <span className='font-medium text-rose-400'>匿名蘭格 : </span>I have long scrollable
            content with a handle
          </div>
          <div className='mb-1'>
            <p className='mb-1 ml-auto w-fit'>Join. (👥1)</p>
            <div>
              <p className='mb-1'>
                (History) <span className='font-medium'>匿名蘭格 : </span>I have long scrollable
                content with a handle
              </p>
            </div>
            <p className='mb-1 ml-auto w-fit text-red-500'>You are room owner.</p>
            <p className='mb-1 ml-auto w-fit'>Canvas size : 2000 x 2000</p>
            <p className='mb-1 ml-auto w-fit'>Connected.</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ChatBox;
