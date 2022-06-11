const Divider = ({ message, wrapClassName }) => {
  return (
    <div className={wrapClassName}>
      <div className='flex-grow border-t border-stone-300'></div>
      <span className='mx-4 flex-shrink font-medium'>{message}</span>
      <div className='flex-grow border-t border-stone-300'></div>
    </div>
  );
};

export default Divider;
