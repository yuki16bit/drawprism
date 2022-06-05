import { useEffect, useState } from 'react';
import { useSignUpUserMutation, useSignInUserMutation } from '../features/apiSlice';
import useQueryString from '../custom-hooks/useQueryString';
import { FiTwitter } from 'react-icons/fi';
import Container from '../components/Container';

const SignPage = () => {
  let queryString = useQueryString();
  const [signMode, setSignMode] = useState('up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpUser] = useSignUpUserMutation();
  const [signInUser] = useSignInUserMutation();
  const signUser = (e) => {
    e.preventDefault();
    if (signMode === 'up') {
      signUpUser({ name, email, password });
      setEmail('');
      setName('');
      setPassword('');
    } else if (signMode === 'in') {
      signInUser({ email, password });
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    queryString.get('mode') ? setSignMode(queryString.get('mode')) : setSignMode('up');
  }, [queryString]);

  return (
    <Container>
      <h1 className='mt-8 mb-16 text-center text-4xl font-bold'>
        {signMode === 'up' && 'Sign up'}
        {signMode === 'in' && 'Sign in'}
      </h1>
      <h4 className='mb-6 text-center text-lg font-medium'>
        {signMode === 'up' && 'Already have an account ?　'}
        {signMode === 'in' && `Doesn't have an account ?　`}
        <span
          className='cursor-pointer underline'
          onClick={() => setSignMode(signMode === 'in' ? 'up' : 'in')}
        >
          {signMode === 'up' && 'Sign in'}
          {signMode === 'in' && 'Sign up'}
        </span>
      </h4>
      <div className='mx-0 mb-20 rounded border border-amber-500 bg-white px-4 py-5 sm:mx-20 lg:mx-48 xl:mx-80'>
        <form onSubmit={signUser}>
          {signMode === 'up' && (
            <div className='mb-6'>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
              />
            </div>
          )}
          <div className='mb-6'>
            <input
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='form-control m-0 block w-full rounded border border-stone-300 px-4 py-2 transition ease-in-out focus:border-stone-400 focus:outline-none'
            />
          </div>
          <button className='block w-full rounded bg-amber-500 py-2 text-white transition hover:bg-amber-600'>
            {signMode === 'up' && 'Sign up'}
            {signMode === 'in' && 'Sign in'}
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
    </Container>
  );
};

export default SignPage;
