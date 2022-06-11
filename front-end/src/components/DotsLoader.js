const DotsLoader = ({ wrapClassName, dotSize }) => {
  return (
    <div className={`${wrapClassName}`}>
      {dotSize === '2' && (
        <>
          <span className='block h-2 w-2 animate-dot-flashing rounded-full'></span>
          <span className='block h-2 w-2 animate-dot-flashing rounded-full animation-delay-100'></span>
          <span className='block h-2 w-2 animate-dot-flashing rounded-full animation-delay-200'></span>
        </>
      )}
      {dotSize === '4' && (
        <>
          <span className='block h-4 w-4 animate-dot-flashing rounded-full'></span>
          <span className='block h-4 w-4 animate-dot-flashing rounded-full animation-delay-100'></span>
          <span className='block h-4 w-4 animate-dot-flashing rounded-full animation-delay-200'></span>
        </>
      )}
    </div>
  );
};

export default DotsLoader;
