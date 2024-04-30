import React, {useEffect, useRef} from 'react';
import {LoadingType} from './types';
import {Animated, Easing} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {colors} from '../../styles/colors';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const sizeAttributes = {
  l: {
    width: 24,
    height: 24,
    strokeWidth: 3,
    viewBox: '0 0 24 24',
    d: 'M16.3544 7.60543C15.2546 6.60928 13.7805 6 12.1602 6C8.75801 6 6 8.68629 6 12C6 15.3137 8.75801 18 12.1602 18C14.2213 18 16.046 17.0141 17.1643 15.5',
  },
  m: {
    width: 20,
    height: 20,
    strokeWidth: 2,
    viewBox: '0 0 20 20',
    d: 'M14.2746 5.47165C13.2895 4.5585 11.9691 4 10.5178 4C7.47039 4 5 6.46243 5 9.5C5 12.5376 7.47039 15 10.5178 15C12.364 15 13.9984 14.0962 15 12.7083',
  },
  s: {
    width: 16,
    height: 16,
    strokeWidth: 2,
    viewBox: '0 0 16 16',
    d: 'M11.4196 4.20408C10.6316 3.45696 9.57526 3 8.41422 3C5.97631 3 4 5.01472 4 7.5C4 9.98528 5.97631 12 8.41422 12C9.89116 12 11.1987 11.2606 12 10.125',
  },
};

export default function Loading({size, type}: LoadingType) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();

    return () => animation.stop();
  }, [rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const {width, height, strokeWidth, viewBox, d} = sizeAttributes[size];

  return (
    <AnimatedSvg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      style={{transform: [{rotate}]}}>
      <Path
        d={d}
        stroke={colors[type]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </AnimatedSvg>
  );
}
