import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from '../features/apiSlice';
import { socketIoActions } from '../features/socketIoSlice';
import Draggable from 'react-draggable';

const ChatBox = ({ locationState }) => {
  const dispatch = useDispatch();
  const [chattingText, setChattingText] = useState('');
  const chatLines = useSelector((state) => state.socketIo.chatLines);
  const { data: user } = useGetUserQuery();
  const onKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      chattingText !== '' &&
        dispatch(
          socketIoActions.sendChat({
            roomUuid: locationState.roomUuid,
            talkerUuid: user.uuid,
            talkerName: user.name,
            text: chattingText,
          })
        );
      setChattingText('');
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      setChattingText('');
    }
  };

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
          <div className='bg-amber-500 px-2 py-1 text-white'>Chat Box</div>
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
          {chatLines?.length > 0 &&
            chatLines.map((chatLine) => (
              <div key={chatLine.lineId} className='mb-1'>
                <span className='font-medium text-amber-500'>
                  {`${chatLine.talkerName} (${chatLine.talkerUuid}) `}:
                </span>
                {chatLine.text}
              </div>
            ))}
        </div>
      </div>
    </Draggable>
  );
};

export default ChatBox;
