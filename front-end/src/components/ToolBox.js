import { useDispatch, useSelector } from 'react-redux';
import { toolBoxActions } from '../features/toolBoxSlice';
import Draggable from 'react-draggable';

const ToolBox = () => {
  const dispatch = useDispatch();
  const currentColor = useSelector((state) => state.toolBox.currentColor);
  const freeColor = useSelector((state) => state.toolBox.freeColor);
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
        flex h-64 min-h-[100px] w-72
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
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#0c40be'))}
              className='block h-6 w-6 rounded-full bg-[#0C40BE] text-white'
            >
              {currentColor === '#0c40be' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#ff8080'))}
              className='block h-6 w-6 rounded-full bg-[#ff8080] text-white'
            >
              {currentColor === '#ff8080' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#ff8000'))}
              className='block h-6 w-6 rounded-full bg-[#ff8000] text-white'
            >
              {currentColor === '#ff8000' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#a9e971'))}
              className='block h-6 w-6 rounded-full bg-[#a9e971] text-white'
            >
              {currentColor === '#a9e971' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#b36fd0'))}
              className='block h-6 w-6 rounded-full bg-[#b36fd0] text-white'
            >
              {currentColor === '#b36fd0' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#ebb847'))}
              className='block h-6 w-6 rounded-full bg-[#ebb847] text-white'
            >
              {currentColor === '#ebb847' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#d40227'))}
              className='block h-6 w-6 rounded-full bg-[#d40227] text-white'
            >
              {currentColor === '#d40227' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#4d272c'))}
              className='block h-6 w-6 rounded-full bg-[#4d272c] text-white'
            >
              {currentColor === '#4d272c' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#80ffff'))}
              className='block h-6 w-6 rounded-full bg-[#80ffff] text-white'
            >
              {currentColor === '#80ffff' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#00755e'))}
              className='block h-6 w-6 rounded-full bg-[#00755e] text-white'
            >
              {currentColor === '#00755e' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#6a6664'))}
              className='block h-6 w-6 rounded-full bg-[#6a6664] text-white'
            >
              {currentColor === '#6a6664' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#ff80ff'))}
              className='block h-6 w-6 rounded-full bg-[#ff80ff] text-white'
            >
              {currentColor === '#ff80ff' ? '✓' : undefined}
            </button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('#f1cac3'))}
              className='block h-6 w-6 rounded-full bg-[#f1cac3] text-white'
            >
              {currentColor === '#f1cac3' ? '✓' : undefined}
            </button>
            <div className='text-sm underline'>Free →</div>
            <div className='relative h-6 w-6 overflow-hidden rounded-full'>
              <input
                className='absolute top-[-6px] left-[-6px] h-10 w-10 cursor-pointer'
                type='color'
                value={freeColor}
                onChange={(e) => {
                  dispatch(toolBoxActions.changeFreeColor(`${e.target.value}`));
                  dispatch(toolBoxActions.changeCurrentColor(`${e.target.value}`));
                }}
              />
            </div>
            <div>{currentColor === freeColor ? '✓' : undefined}</div>
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
            <button
              className={`block h-7 w-7 rounded-full border bg-image-camera bg-contain bg-no-repeat bg-origin-content p-[3px]`}
            ></button>
            <button
              onClick={() => dispatch(toolBoxActions.changeCurrentColor('rgba(255,255,255)'))}
              className={`block h-7 w-7 rounded-full border bg-image-eraser bg-contain bg-no-repeat bg-origin-content p-[3px] ${
                currentColor === 'rgba(255,255,255)' ? 'border-amber-500' : null
              }`}
            ></button>
          </div>
        </section>
      </div>
    </Draggable>
  );
};

export default ToolBox;
