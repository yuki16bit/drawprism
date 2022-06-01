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
      <h1 className='mt-8 mb-16 text-center text-4xl font-bold'>
        {signType === 'up' && 'Sign up'}
        {signType === 'in' && 'Sign in'}
      </h1>
      <h4 className='mb-6 text-center text-lg font-medium'>
        {signType === 'up' && 'Already have an account ?　'}
        {signType === 'in' && `Doesn't have an account ?　`}
        <span
          className='cursor-pointer underline'
          onClick={() => setSignType(signType === 'in' ? 'up' : 'in')}
        >
          {signType === 'up' && 'Sign in'}
          {signType === 'in' && 'Sign up'}
        </span>
      </h4>
      <div className='mx-0 mb-20 rounded border border-amber-500 bg-white px-4 py-5 sm:mx-20 lg:mx-48 xl:mx-80'>
        <form>
          {signType === 'up' && (
            <div className='mb-6'>
              <input
                type='text'
                className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
                placeholder='Name'
              />
            </div>
          )}
          <div className='mb-6'>
            <input
              type='text'
              className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
              placeholder='Email'
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
              placeholder='Password'
            />
          </div>
          <button className='block w-full rounded bg-amber-500 py-2 text-white transition hover:bg-amber-600'>
            {signType === 'up' && 'Sign up'}
            {signType === 'in' && 'Sign in'}
          </button>
        </form>
        <div className='relative flex items-center py-6'>
          <div className='flex-grow border-t border-stone-300'></div>
          <span className='mx-4 flex-shrink font-medium'>OR</span>
          <div className='flex-grow border-t border-stone-300'></div>
        </div>
        <button className='mb-6 block flex w-full items-center justify-center gap-2 rounded bg-sky-500 py-2 text-white transition hover:bg-sky-600/80'>
          <FiTwitter />
          Continue with Twitter
        </button>
      </div>
    </>
  );
};

export default SignPage;
