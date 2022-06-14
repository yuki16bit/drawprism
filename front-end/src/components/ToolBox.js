import { useDispatch, useSelector } from 'react-redux';
import { toolBoxActions } from '../features/toolBoxSlice';
import Draggable from 'react-draggable';

const ToolBox = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.toolBox.colorCode);
  const currentPenSize = useSelector((state) => state.toolBox.penSize);
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
        <section id='section-color-picker' className='px-2 pt-2 pb-1'>
          <p className='pb-1 text-sm font-medium text-blue-400'>Color Picker</p>
          <div className='flex flex-wrap items-center gap-2'>
            <button className='block h-6 w-6 rounded-full bg-[#0C40BE]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#FF8080]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#FF8000]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#A9E971]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#B36FD0]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#EBB847]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#D40227]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#4D272C]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#80FFFF]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#00755E]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#6A6664]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#FF80FF]'></button>
            <button className='block h-6 w-6 rounded-full bg-[#F1CAC3]'></button>
            <div className='text-sm underline'>Free →</div>
            <div className='relative h-6 w-6 overflow-hidden rounded-full'>
              <input
                className='absolute top-[-6px] left-[-6px] h-10 w-10 cursor-pointer'
                type='color'
                value={currentColor}
                onChange={(e) => {
                  dispatch(toolBoxActions.changeColor(`${e.target.value}`));
                }}
              />
            </div>
          </div>
        </section>
        <section id='section-pen-size' className='px-2 py-1'>
          <p className='py-1 text-sm font-medium text-blue-400'>Pen Size</p>
          <div className='flex items-center gap-2'>
            <input
              className='block grow outline-none'
              type='range'
              min='1'
              max='100'
              value={currentPenSize}
              onChange={(e) => {
                dispatch(toolBoxActions.changePenSize(`${e.target.value}`));
              }}
            />
            <div className='mr-2 text-sm'>{currentPenSize}</div>
          </div>
        </section>
        <section id='section-eraser' className='px-2 py-1'>
          <p className='pb-2 text-sm font-medium text-blue-400'>Little Tools</p>
          <div className='flex flex-wrap items-center gap-2'>
            <button className='block h-6 w-6 border'></button>
            <button className='block h-6 w-6 border'></button>
          </div>
        </section>
      </div>
    </Draggable>
  );
};

export default ToolBox;
