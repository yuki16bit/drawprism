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
        w-72
        h-80
        min-w-[200px]
        min-h-[100px]
        resize
        rounded border border-neutral-200 z-10
        overflow-hidden
        bg-white
        flex
        flex-col
        absolute top-[100px] right-[10px] left-[1370px]'
      >
        <strong className='cursor-grab'>
          <div className='bg-amber-500 text-white px-2 py-1'>Chat Room</div>
        </strong>
        <div className='flex h-8'>
          <input
            name='chat-typing-text'
            type='text'
            value={chattingText}
            className='border border-lime-700 block px-2 py-1 w-full'
            onChange={(e) => setChattingText(e.target.value)}
            placeholder='[Enter] Talking / [Esc] Drawing'
            onKeyDown={onKeyDownInput}
          />
        </div>
        <div className='h-full overflow-y-scroll p-2'>
          <div className='mb-1'>
            <span className='text-amber-500 font-medium'>匿名柚柚 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-amber-500 font-medium'>匿名柚柚 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-amber-500 font-medium'>匿名柚柚 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-amber-500 font-medium'>匿名柚柚 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-amber-500 font-medium'>匿名柚柚</span> (998b19a) has{' '}
            <div className='text-sky-500'>joined</div> this room. (👥2)
          </div>
          <div className='mb-1'>
            <span className='text-rose-400 font-medium'>匿名蘭格 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-rose-400 font-medium'>匿名蘭格 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-rose-400 font-medium'>匿名蘭格 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <span className='text-rose-400 font-medium'>匿名蘭格 : </span>I have long scrollable content with a handle
          </div>
          <div className='mb-1'>
            <p className='mb-1 w-fit ml-auto'>Join. (👥1)</p>
            <div>
              <p className='mb-1'>
                (History) <span className='font-medium'>匿名蘭格 : </span>I have long scrollable content with a handle
              </p>
            </div>
            <p className='mb-1 w-fit ml-auto text-red-500'>You are room owner.</p>
            <p className='mb-1 w-fit ml-auto'>Canvas size : 2000 x 2000</p>
            <p className='mb-1 w-fit ml-auto'>Connected.</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ChatBox;
