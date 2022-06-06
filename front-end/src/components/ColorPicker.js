import { useDispatch } from 'react-redux';
import { colorPickerActions } from '../features/colorPickerSlice';

const ColorPicker = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type='color'
        onChange={(e) => {
          dispatch(colorPickerActions.changeColor(`${e.target.value}`));
        }}
      />
    </div>
  );
};

export default ColorPicker;
