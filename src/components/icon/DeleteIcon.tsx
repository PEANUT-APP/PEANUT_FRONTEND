import React from 'react';
import {DeleteIconType} from './types';
import {Path, Svg} from 'react-native-svg';

const XLargeDeleteIcon = ({color}: {color: string}) => (
  <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Path
      d="M3 3L25 25"
      stroke={color}
      stroke-width="5"
      stroke-linecap="round"
    />
    <Path
      d="M3 25L25 3"
      stroke={color}
      stroke-width="5"
      stroke-linecap="round"
    />
  </Svg>
);

const LargeDeleteIcon = ({color}: {color: string}) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path
      d="M2 2L14 14"
      stroke={color}
      stroke-width="3"
      stroke-linecap="round"
    />
    <Path
      d="M2 14L14 2"
      stroke={color}
      stroke-width="3"
      stroke-linecap="round"
    />
  </Svg>
);

const MediumDeleteIcon = ({color}: {color: string}) => (
  <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <Path
      d="M2 2L12 12"
      stroke={color}
      stroke-width="3"
      stroke-linecap="round"
    />
    <Path
      d="M2 12L12 2"
      stroke={color}
      stroke-width="3"
      stroke-linecap="round"
    />
  </Svg>
);

const SmallDeleteIcon = ({color}: {color: string}) => (
  <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <Path
      d="M2 2L10 10"
      stroke={color}
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <Path
      d="M2 10L10 2"
      stroke={color}
      stroke-width="2.6"
      stroke-linecap="round"
    />
  </Svg>
);

export default function DeleteIcon({size, color}: DeleteIconType) {
  switch (size) {
    case 'xl':
      return <XLargeDeleteIcon color={color} />;
    case 'l':
      return <LargeDeleteIcon color={color} />;
    case 'm':
      return <MediumDeleteIcon color={color} />;
    default:
      return <SmallDeleteIcon color={color} />;
  }
}
