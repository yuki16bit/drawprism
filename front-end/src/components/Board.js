import React from 'react';
import Canvas from './Canvas';
import ColorPicker from './ColorPicker';

const Board = () => {
  return (
    <div>
      <ColorPicker />
      <Canvas />
    </div>
  );
};

export default Board;
