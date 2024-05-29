import React from 'react';
import {FitIconType} from './types';
import FitIconXL from '../../assets/images/fitIconXL.svg';
import FitIconL from '../../assets/images/fitIconL.svg';
import FitIconM from '../../assets/images/fitIconM.svg';
import FitIconS from '../../assets/images/fitIconS.svg';

export default function FitIcon({size}: FitIconType) {
  return size === 'xl' ? (
    <FitIconXL />
  ) : size === 'l' ? (
    <FitIconL />
  ) : size === 'm' ? (
    <FitIconM />
  ) : (
    <FitIconS />
  );
}
