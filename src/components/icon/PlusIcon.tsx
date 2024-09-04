import React from 'react';
import {PlusIconType} from './types';
import {Path, Svg} from 'react-native-svg';

const LargePlusIcon = ({color}: {color: string}) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M3 12H21" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <Path
      d="M12 21L12 3"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

const MediumPlusIcon = ({color}: {color: string}) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M2 8H14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <Path
      d="M8 14L8 2"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Svg>
);

const SmallPlusIcon = ({color}: {color: string}) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path d="M1 6H11" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Path d="M6 11L6 1" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export default function PlusIcon({size, color}: PlusIconType) {
  switch (size) {
    case 'l':
      return <LargePlusIcon color={color} />;
    case 'm':
      return <MediumPlusIcon color={color} />;
    default:
      return <SmallPlusIcon color={color} />;
  }
}
