const Divider = ({ message, pyNum = 0 }) => {
  return (
    <div className={`relative flex items-center ${pyNum ? `py-${pyNum}` : null}`}>
      <div className='flex-grow border-t border-stone-300'></div>
      <span className='mx-4 flex-shrink font-medium'>{message}</span>
      <div className='flex-grow border-t border-stone-300'></div>
    </div>
  );
};

export default Divider;
