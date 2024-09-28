import React from 'react';
import {ErrorIconType} from './types';
import ErrorIconXL from '../../assets/images/errorIconXL.svg';
import ErrorIconL from '../../assets/images/errorIconL.svg';
import ErrorIconM from '../../assets/images/errorIconM.svg';
import ErrorIconS from '../../assets/images/errorIconS.svg';

export default function ErrorIcon({size}: ErrorIconType) {
  return size === 'xl' ? (
    <ErrorIconXL />
  ) : size === 'l' ? (
    <ErrorIconL />
  ) : size === 'm' ? (
    <ErrorIconM />
  ) : (
    <ErrorIconS />
  );
}
