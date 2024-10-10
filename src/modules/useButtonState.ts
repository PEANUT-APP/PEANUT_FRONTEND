import {useCallback, useState} from 'react';

export const useButtonState = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {isPressed, handlePressIn, handlePressOut};
};
