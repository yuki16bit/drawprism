import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyGetAllOwnedRoomQuery } from '../features/apiSlice';
import Spacer from '../components/Spacer';
import Container from '../components/Container';
import DotsLoader from '../components/DotsLoader';
import RoomThumbnail from '../components/RoomThumbnail';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  const [
    getAllOwnedRoom,
    {
      data: allOwnedRoom,
      isLoading: isLazyGetAllOwnedRoomLoading,
      isSuccess: isLazyGetAllOwnedRoomSuccess,
    },
  ] = useLazyGetAllOwnedRoomQuery();

  useEffect(() => {
    if (user?.isAnonymous) {
      navigate('/', { replace: true });
    }
    if (user?.uuid) {
      getAllOwnedRoom(user?.uuid);
    }
  }, [navigate, user]);

  return (
    <Container>
      {!user?.isAnonymous ? (
        <>
          <h1 className='mt-8 mb-16 text-center text-4xl font-bold'>Profile</h1>
          <h4 className='text-center text-lg font-bold'>Member Name</h4>
          <h4 className='mb-12 text-center text-lg font-medium'>{`${user?.name}`}</h4>
          <h4 className='text-center text-lg font-bold'>Member Email</h4>
          <h4 className='mb-12 text-center text-lg font-medium'>{`${user?.email}`}</h4>
          <h4 className='mb-3 text-center text-lg font-bold'>Room You Created</h4>
          <section id='section-owned-rooms'>
            <div className='flex flex-wrap justify-center gap-y-8 lg:gap-y-10'>
              {allOwnedRoom?.length > 0 ? (
                allOwnedRoom.map((ownedRoom, index) => (
                  <RoomThumbnail
                    key={ownedRoom.room_uuid}
                    className={`${
                      allOwnedRoom.length > 3 && allOwnedRoom.length - 1 === index
                        ? 'mr-auto lg:mr-auto'
                        : null
                    } relative mx-2 aspect-[1.414/1] basis-full cursor-pointer overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:mx-5 lg:basis-[calc(33.3%-2.5rem)]`}
                    roomUuid={ownedRoom.room_uuid}
                    roomIndex={`${index + 1}`}
                    roomName={ownedRoom.room_name}
                    thumbnail={ownedRoom.draw_log}
                  />
                ))
              ) : (
                <div className='flex aspect-[1.414/1] basis-full flex-col items-center justify-center overflow-hidden rounded border border-amber-500 bg-white sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.3%-2.5rem)]'>
                  <p className='h-10 w-10 rounded-full bg-amber-500 text-center font-bold leading-10 text-white transition hover:bg-amber-600'>
                    ×
                  </p>
                  <p className='mt-3 text-center'>You haven't owned a room yet.</p>
                </div>
              )}
            </div>
          </section>
          <Spacer width='w-24' height='h-24' minWidth='min-w-full' minHeight='min-h-full' />
        </>
      ) : (
        <DotsLoader wrapClassName='flex h-96 items-center justify-center gap-2' dotSize='4' />
      )}
    </Container>
  );
};

export default ProfilePage;
