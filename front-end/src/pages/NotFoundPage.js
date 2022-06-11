import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-6'>
      <div className='text-9xl font-medium'>404</div>
      <div className='text-4xl font-bold text-amber-500'>Page not found.</div>
      <Link to='/'>
        <div className='text-xl text-neutral-600 underline'>Back to home</div>
      </Link>
    </section>
  );
};

export default NotFoundPage;
