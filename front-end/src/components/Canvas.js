import React, { useRef, useEffect } from 'react';

const Canvas = ({ selectedColor }) => {
  const canvasRef = useRef(null);
  const context = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      context.current.fillStyle = '#ffffff'; //HERE, use HEX format in 6 digits
      context.current.fillRect(0, 0, 720, 480); //HERE
    }
  });

  return <canvas ref={canvasRef} width={720} height={480} className='border bg-netural-50' />;
};

export default Canvas;
