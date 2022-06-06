const ScreenShotThumbnail = ({ isNone = true, thumbnailId = '—', thumbnail = '' }) => {
  return (
    <div
      className={`aspect-square overflow-hidden rounded border border-amber-500 bg-white ${
        isNone ? 'flex items-center justify-center' : null
      }`}
    >
      {isNone ? (
        <p className='h-10 w-10 rounded-full bg-amber-500 text-center font-bold leading-10 text-white transition hover:bg-amber-600'>
          ×
        </p>
      ) : (
        <img
          className='h-full w-full object-cover'
          alt={`screen-shot-${thumbnailId}`}
          src={thumbnail}
        />
      )}
    </div>
  );
};

export default ScreenShotThumbnail;
