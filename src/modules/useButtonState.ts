import {useState} from 'react';

export const useButtonState = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  return {isPressed, handlePressIn, handlePressOut};
};
