import React from 'react';

const Spacer = ({
  width,
  height,
  minWidth,
  minHeight,
}) => {
  return <div className={`${width} ${height} ${minWidth} ${minHeight}`}></div>;
};

export default Spacer;
