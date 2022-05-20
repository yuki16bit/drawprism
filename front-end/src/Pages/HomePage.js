import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState([])
  const fetchData = async () => {
    const res = await fetch('/api/test');
    const test = await res.json();
    setData(test.data);
  };

  useEffect(() => {
    fetchData()
    console.log('YOOO!')
  }, [])

  return (
    <div>
      <header className='z-[1]'>
        <div className='h-[174px] mt-[50px]'>
          <h1 className='text-center text-3xl font-bold text-netural-800'>DrawPrism</h1>
          <h3 className='text-center text-lg font-medium text-netural-800 mt-2'>Real Time Online Paint Chat.</h3>
          <button className='block w-48 h-12 mx-auto mt-9 border rounded text-xl'>
            <Link to='/room-setup'>Create a room</Link>
          </button>
        </div>
      </header>
      <div className='mt-[160px] mb-[80px]'>
        <h1 className='text-center text-3xl font-bold text-netural-800 mt-2'>Drawing and Chatting with your friends!</h1>
        <h2 className='text-center text-2xl font-medium text-netural-800 mt-6'>Create a free drawing chat in a second!</h2>
        <h2 className='text-center text-2xl font-medium text-netural-800 mt-2'>There is no need to register. Anonymously.</h2>
        <h2 className='text-center text-2xl font-medium text-netural-800 mt-2'>Works only with a browser. No need Flash and JavaVM.</h2>
      </div>
      <h1 className='text-center text-3xl font-bold'>
        Rooms
      </h1>
      <p className='text-xl font-bold'>RDS 連線測試</p>
      <div>{
        data?.length > 0
          ? data.map(({ content, img_url }, i) =>
            <div key={i}>
              {content}
            </div>
          )
          : <div>Loading...</div>
      }</div>
      
      <Link to='/room-setup'>Room Setup Page</Link>
    </div>
  );
}

export default HomePage;
