import React, { useRef, useEffect, useState, useContext } from 'react';
import { SocketContext } from '../Pages/RoomPage';

const Canvas = ({ selectedColor = '#0C40BE' }) => {
  const socket = useContext(SocketContext);
  const canvasRef = useRef(null);
  const context = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [canvasRect, setCanvasRect] = useState();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      context.current.fillStyle = '#ffffff'; //HERE, use HEX format in 6 digits
      context.current.fillRect(0, 0, 720, 480); //HERE
      setCanvasRect(canvasRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    socket.on('drawing', onDrawingEvent);
  }, [socket]);

  const throttle = (callback, delay) => {
    let previousCall = new Date().getTime();
    return function () {
      const time = new Date().getTime();

      if (time - previousCall >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  };

  const onDrawingEvent = (data) => {
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  };

  const mouseDown = (e) => {
    setDrawing(true);
    setX(e.clientX - canvasRect.left || e.touches[0].clientX - canvasRect.left);
    setY(e.clientY - canvasRect.top || e.touches[0].clientY - canvasRect.top);
  };

  const mouseMove = (e) => {
    if (!drawing) {
      return;
    }
    drawLine(
      x,
      y,
      e.clientX - canvasRect.left || e.touches[0].clientX - canvasRect.left,
      e.clientY - canvasRect.top || e.touches[0].clientY - canvasRect.top,
      selectedColor,
      true
    );
    setX(e.clientX - canvasRect.left || e.touches[0].clientX - canvasRect.left);
    setY(e.clientY - canvasRect.top || e.touches[0].clientY - canvasRect.top);
  };

  const mouseUp = (e) => {
    if (!drawing) {
      return;
    }
    setDrawing(false);
    drawLine(
      x,
      y,
      e.clientX - canvasRect.left || e.touches[0].clientX - canvasRect.left,
      e.clientY - canvasRect.top || e.touches[0].clientY - canvasRect.top,
      selectedColor,
      true
    );
  };

  const drawLine = (x0, y0, x1, y1, selectedColor, emit) => {
    context.current.beginPath();
    context.current.moveTo(x0, y0);
    context.current.lineTo(x1, y1);
    context.current.strokeStyle = selectedColor;
    context.current.lineWidth = 3;
    context.current.stroke();
    context.current.closePath();

    if (!emit) {
      return;
    }
    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      selectedColor: selectedColor,
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={720}
      height={480}
      className='border bg-netural-50'
      onMouseDown={(e) => mouseDown(e)}
      onMouseMove={(e) => throttle(mouseMove(e), 10)}
      onMouseUp={(e) => mouseUp(e)}
      onMouseOut={(e) => mouseUp(e)}
    />
  );
};

export default Canvas;
