import React, {useEffect, useRef} from 'react';
import {LoadingType} from './types';
import {Animated, Easing} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {loadingIconSize} from '../../modules/loadingIconSize';
import {getLoadingColorByType} from '../../modules/getColorByType';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

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

  const {width, height, strokeWidth, viewBox, d} = loadingIconSize[size];

  const color = getLoadingColorByType(type);

  return (
    <AnimatedSvg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      style={{transform: [{rotate}]}}>
      <Path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </AnimatedSvg>
  );
}
