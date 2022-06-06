const DotsLoader = ({ wrapClassName, dotSize }) => {
  return (
    <div className={`${wrapClassName}`}>
      <span
        className={`block ${`w-${dotSize} h-${dotSize}`} animate-dot-flashing rounded-full`}
      ></span>
      <span
        className={`block ${`w-${dotSize} h-${dotSize}`} animate-dot-flashing rounded-full animation-delay-100`}
      ></span>
      <span
        className={`block ${`w-${dotSize} h-${dotSize}`} animate-dot-flashing rounded-full animation-delay-200`}
      ></span>
    </div>
  );
};

export default DotsLoader;
