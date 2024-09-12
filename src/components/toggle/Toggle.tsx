import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {ToggleContainer, ToggleWheel} from './styles';
import {colors} from '../../styles/colors';
import {ToggleType} from './types';

export default function Toggle({isToggleOn, setIsToggleOn}: ToggleType) {
  const animatedValue = useRef(new Animated.Value(isToggleOn ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isToggleOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, isToggleOn]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 28],
  });

  const handleToggle = () => {
    setIsToggleOn((prevState: boolean) => !prevState);
  };

  const color = isToggleOn ? colors.primaryNormal : colors.SolidTertiaryActive;

  return (
    <ToggleContainer
      onPress={handleToggle}
      color={color}
      accessibilityRole="togglebutton"
      activeOpacity={1}>
      <ToggleWheel
        style={{
          transform: [{translateX}],
        }}
      />
    </ToggleContainer>
  );
}
