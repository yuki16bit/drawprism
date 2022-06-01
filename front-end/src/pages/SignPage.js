import { useEffect, useState } from 'react';
import useQueryString from '../custom-hooks/useQueryString';
import { FiTwitter } from 'react-icons/fi';

const SignPage = () => {
  let queryString = useQueryString();
  const [signType, setSignType] = useState('up');

  useEffect(() => {
    queryString.get('type') ? setSignType(queryString.get('type')) : setSignType('up');
  }, [queryString]);

  return (
    <>
      <h1 className='text-center text-4xl font-bold mt-8 mb-16'>
        {signType === 'up' && 'Sign up'}
        {signType === 'in' && 'Sign in'}
      </h1>
      <h4 className='text-lg text-center font-medium mb-6'>
        {signType === 'up' && 'Already have an account ?　'}
        {signType === 'in' && `Doesn't have an account ?　`}
        <span className='underline cursor-pointer' onClick={() => setSignType(signType === 'in' ? 'up' : 'in')}>
          {signType === 'up' && 'Sign in'}
          {signType === 'in' && 'Sign up'}
        </span>
      </h4>
      <div className='border border-amber-500 rounded bg-white px-4 py-5 mx-0 sm:mx-20 lg:mx-48 xl:mx-80 mb-20'>
        <form>
          {signType === 'up' && (
            <div className='mb-6'>
              <input
                type='text'
                className='form-control block w-full px-4 py-2 border border-stone-300 rounded transition ease-in-out m-0 focus:border-stone-400 focus:outline-none'
                placeholder='Name'
              />
            </div>
          )}
          <div className='mb-6'>
            <input
              type='text'
              className='form-control block w-full px-4 py-2 border border-stone-300 rounded transition ease-in-out m-0 focus:border-stone-400 focus:outline-none'
              placeholder='Email'
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              className='form-control block w-full px-4 py-2 border border-stone-300 rounded transition ease-in-out m-0 focus:border-stone-400 focus:outline-none'
              placeholder='Password'
            />
          </div>
          <button className='block w-full rounded bg-amber-500 text-white py-2 hover:bg-amber-600 transition'>
            {signType === 'up' && 'Sign up'}
            {signType === 'in' && 'Sign in'}
          </button>
        </form>
        <div className='relative flex py-6 items-center'>
          <div className='flex-grow border-t border-stone-300'></div>
          <span className='flex-shrink mx-4 font-medium'>OR</span>
          <div className='flex-grow border-t border-stone-300'></div>
        </div>
        <button className='flex justify-center items-center gap-2 block w-full rounded bg-sky-500 text-white py-2 mb-6 hover:bg-sky-600/80 transition'>
          <FiTwitter />
          Continue with Twitter
        </button>
      </div>
    </>
  );
};

export default SignPage;
