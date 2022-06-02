import Draggable from 'react-draggable';
import ColorPicker from '../components/ColorPicker';

const ToolBox = () => {
  return (
    <Draggable handle='strong'>
      <div
        className='
        absolute
        top-[500px]
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
          <div className='bg-amber-500 px-2 py-1 text-white'>Tool Box</div>
        </strong>
        <ColorPicker />
      </div>
    </Draggable>
  );
};

export default ToolBox;
