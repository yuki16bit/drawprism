import { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketIoActions } from '../features/socketIoSlice';

const Canvas = ({ locationState, width = 2000, height = 2000 }) => {
  const dispatch = useDispatch();
  const currentDrawLine = useSelector((state) => state.socketIo.currentDrawLine);
  const currentColor = useSelector((state) => state.colorPicker.colorCode);

  const canvasRef = useRef(null);
  const context = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState();
  const [lastY, setLastY] = useState();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      context.current.fillStyle = '#ffffff';
      context.current.fillRect(0, 0, width, height);
    }
  }, [height, width]);

  const drawLine = useCallback(
    (beginX, beginY, endX, endY, color, emit) => {
      context.current.beginPath();
      context.current.strokeStyle = color;
      context.current.lineWidth = 2;
      context.current.moveTo(beginX, beginY);
      context.current.lineTo(endX, endY);
      context.current.stroke();
      context.current.closePath();

      if (!emit) {
        return;
      }

      const w = canvasRef.current.width;
      const h = canvasRef.current.height;

      dispatch(
        socketIoActions.sendDraw({
          beginX: beginX / w,
          beginY: beginY / h,
          endX: endX / w,
          endY: endY / h,
          currentColor: currentColor,
          roomUuid: locationState.roomUuid,
        })
      );
    },
    [currentColor, dispatch, locationState.roomUuid]
  );

  const onReceiveDraw = useCallback(
    (data) => {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      drawLine(data.beginX * w, data.beginY * h, data.endX * w, data.endY * h, data.currentColor);
    },
    [drawLine]
  );

  useEffect(() => {
    onReceiveDraw(currentDrawLine);
  }, [currentDrawLine, onReceiveDraw]);

  const mouseDown = (e) => {
    const canvasOffset = canvasRef.current.getBoundingClientRect();
    setLastX(
      e.pageX - canvasOffset.left - window.scrollX ||
        e.touches[0].pageX - canvasOffset.left - window.scrollX
    );
    setLastY(
      e.pageY - canvasOffset.top - window.scrollY ||
        e.touches[0].pageY - canvasOffset.top - window.scrollY
    );
    setDrawing(true);
  };

  const mouseMove = (e) => {
    const canvasOffset = canvasRef.current.getBoundingClientRect();
    if (!drawing) {
      return;
    }
    drawLine(
      lastX,
      lastY,
      e.pageX - canvasOffset.left - window.scrollX ||
        e.touches[0].pageX - canvasOffset.left - window.scrollX,
      e.pageY - canvasOffset.top - window.scrollY ||
        e.touches[0].pageY - canvasOffset.top - window.scrollY,
      currentColor,
      true
    );
    setLastX(
      e.pageX - canvasOffset.left - window.scrollX ||
        e.touches[0].pageX - canvasOffset.left - window.scrollX
    );
    setLastY(
      e.pageY - canvasOffset.top - window.scrollY ||
        e.touches[0].pageY - canvasOffset.top - window.scrollY
    );
  };

  const mouseUp = (e) => {
    if (!drawing) {
      return;
    }
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className='bg-netural-50 relative top-[40px] left-[310px] m-0 touch-none border'
      onMouseDown={(e) => mouseDown(e)}
      onMouseMove={(e) => mouseMove(e)}
      onMouseUp={(e) => mouseUp(e)}
      onMouseOut={(e) => mouseUp(e)}
      onTouchStart={(e) => mouseDown(e)}
      onTouchMove={(e) => mouseMove(e)}
      onTouchEnd={(e) => mouseUp(e)}
      onTouchCancel={(e) => mouseDown(e)}
    />
  );
};

export default Canvas;
