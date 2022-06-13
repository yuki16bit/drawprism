import { useDispatch } from 'react-redux';
import { toolBoxActions } from '../features/toolBoxSlice';
import Draggable from 'react-draggable';

const ToolBox = () => {
  const dispatch = useDispatch();
  return (
    <Draggable handle='strong'>
      <div
        className='
        absolute
        top-[40px]
        right-[1370px]
        left-[10px]
        z-10
        flex h-80 min-h-[100px] w-72
        min-w-[200px]
        touch-none flex-col
        overflow-hidden
        rounded border border-neutral-200 bg-white'
      >
        <strong className='cursor-grab touch-none'>
          <div className='touch-none bg-amber-500 px-2 py-1 text-white'>Tool Box</div>
        </strong>
        <section id='section-color-picker'>
          <input
            type='color'
            onChange={(e) => {
              dispatch(toolBoxActions.changeColor(`${e.target.value}`));
            }}
          />
        </section>
      </div>
    </Draggable>
  );
};

export default ToolBox;
