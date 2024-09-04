import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {ToggleContainer, ToggleWheel} from './styles';
import {colors} from '../../styles/colors';
import {ToggleType} from './types';

export default function Toggle({isToggleOn, setIsToggleOn}: ToggleType) {
  const [animatedValue] = useState(new Animated.Value(isToggleOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isToggleOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isToggleOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 28],
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
