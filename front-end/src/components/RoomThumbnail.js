const RoomThumbnail = ({ className, roomIndex, roomName }) => {
  return (
    <div className={className}>
      <div className='px-2 w-fit h-8 text-center leading-8 absolute top-0 left-0 bg-amber-500 text-white font-medium opacity-90'>
        {roomIndex}
      </div>
      <div className='w-full h-8 text-center leading-8 absolute bottom-0 bg-amber-500 text-white tracking-wider font-medium opacity-90 px-3'>
        <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{roomName}</p>
      </div>
    </div>
  );
};

export default RoomThumbnail;
