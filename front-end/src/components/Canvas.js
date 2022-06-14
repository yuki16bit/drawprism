import { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socketIoActions } from '../features/socketIoSlice';
import { useLazyGetPreviousDrawLogQuery } from '../features/apiSlice';
import DotsLoader from './DotsLoader';

const Canvas = ({ locationState, width = 2000, height = 2000 }) => {
  const dispatch = useDispatch();
  const drawingData = useSelector((state) => state.socketIo.drawingData);
  const currentColor = useSelector((state) => state.toolBox.colorCode);
  const currentPenSize = useSelector((state) => state.toolBox.penSize);

  const [
    getPreviousDrawLog,
    {
      data: previousDrawLog,
      isLoading: isPreviousDrawLogLoading,
      isSuccess: isPreviousDrawLogSuccess,
    },
  ] = useLazyGetPreviousDrawLogQuery();

  const canvasRef = useRef(null);
  const context = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [beginPoint, setBeginPoint] = useState({ x: null, y: null });
  const [points, setPoints] = useState([]);

  useEffect(() => {
    getPreviousDrawLog(locationState?.roomUuid);
  }, [getPreviousDrawLog, locationState?.roomUuid]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
      context.current.fillStyle = '#ffffff';
      context.current.fillRect(0, 0, width, height);
      context.current.lineJoin = 'round';
      context.current.lineCap = 'round';
      if (isPreviousDrawLogSuccess && previousDrawLog !== '') {
        const previousCanvas = new Image();
        previousCanvas.onload = () => {
          context.current.drawImage(previousCanvas, 0, 0);
        };
        previousCanvas.src = previousDrawLog;
      }
    }
  }, [height, isPreviousDrawLogSuccess, previousDrawLog, width]);

  const getPosition = (e) => {
    const canvasOffset = canvasRef.current.getBoundingClientRect();
    return {
      x:
        e.pageX - canvasOffset.left - window.scrollX ||
        e.touches[0].pageX - canvasOffset.left - window.scrollX,
      y:
        e.pageY - canvasOffset.top - window.scrollY ||
        e.touches[0].pageY - canvasOffset.top - window.scrollY,
    };
  };

  const getPressure = (e) => {
    return Math.pow(e.pressure, 2) * currentPenSize;
  };

  const drawLine = useCallback(
    (beginPoint, controlPoint, endPoint, color, lineWidth, emit) => {
      context.current.beginPath();
      context.current.lineWidth = lineWidth;
      context.current.strokeStyle = color;
      context.current.moveTo(beginPoint?.x, beginPoint?.y);
      context.current.quadraticCurveTo(controlPoint?.x, controlPoint?.y, endPoint?.x, endPoint?.y);
      context.current.stroke();
      context.current.closePath();

      if (!emit) {
        return;
      }

      dispatch(
        socketIoActions.sendDraw({
          beginPoint,
          controlPoint,
          endPoint,
          color,
          lineWidth,
          roomUuid: locationState.roomUuid,
        })
      );
    },
    [dispatch, locationState.roomUuid]
  );

  useEffect(() => {
    const onReceiveDrawingData = (drawingData) => {
      drawLine(
        drawingData.beginPoint,
        drawingData.controlPoint,
        drawingData.endPoint,
        drawingData.color,
        drawingData.lineWidth
      );
    };
    onReceiveDrawingData(drawingData);
  }, [drawLine, drawingData]);

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

  const down = (e) => {
    setIsDown(true);
    const { x, y } = getPosition(e);
    setPoints((prevPoints) => [...prevPoints, { x, y }]);
    setBeginPoint((prevBeginPoint) => ({ ...prevBeginPoint, x, y }));
  };

  const move = (e) => {
    if (!isDown) return;

    const { x, y } = getPosition(e);
    setPoints((prevPoints) => [...prevPoints, { x, y }]);

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
        y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
      };
      const lineWidth = getPressure(e);
      drawLine(beginPoint, controlPoint, endPoint, currentColor, lineWidth, true);
      setBeginPoint((prevBeginPoint) => ({ ...prevBeginPoint, x: endPoint.x, y: endPoint.y }));
    }
  };

  const up = (e) => {
    if (!isDown) return;
    const { x, y } = getPosition(e);
    points.push({ x, y });

    if (points.length > 3) {
      const lastTwoPoints = points.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = lastTwoPoints[1];
      const lineWidth = getPressure(e);
      drawLine(beginPoint, controlPoint, endPoint, currentColor, lineWidth, true);
    }
    setBeginPoint((prevBeginPoint) => ({ ...prevBeginPoint, x: null, y: null }));
    setIsDown(false);
    setPoints([]);
    dispatch(
      socketIoActions.saveDraw({
        roomUuid: locationState.roomUuid,
        canvasSnapShot: canvasRef.current.toDataURL(),
      })
    );
  };

  return (
    <>
      {isPreviousDrawLogLoading && <DotsLoader dotSize='4' />}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className='bg-netural-50 relative top-[40px] left-[310px] m-0 touch-none border'
        onPointerDown={(e) => down(e)}
        onPointerMove={(e) => throttle(move(e), 10)}
        onPointerUp={(e) => throttle(up(e), 10)}
        onPointerOut={(e) => throttle(up(e), 10)}
      />
    </>
  );
};

export default Canvas;
