import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const ScrollToTop = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch, location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
