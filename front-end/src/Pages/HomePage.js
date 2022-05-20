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
      <h1 className='text-3xl font-bold underline color-rose-500'>
        Home Page
      </h1>
      <div>{
        data?.length > 0
          ? data.map(({ content, img_url }, i) => <div key={i}>{content}</div>)
          : <div>Loading...</div>
      }</div>
      
      <Link to='/room-setup'>Room Setup Page</Link>
    </div>
  );
}

export default HomePage;
