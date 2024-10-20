import React from 'react';
import {AverageItemType, BloodSugarItemType} from './types';
import BloodSugarHigh from '../../../assets/images/BloodSugarHigh.svg';
import BloodSugarGood from '../../../assets/images/BloodSugarGood.svg';
import BloodSugarLow from '../../../assets/images/BloodSugarLow.svg';
import BloodSugarDanger from '../../../assets/images/BloodSugarDanger.svg';
import AverageGreat from '../../../assets/images/AverageGreat.svg';
import AverageNormal from '../../../assets/images/AverageNormal.svg';
import AverageBad from '../../../assets/images/AverageBad.svg';

export function BloodSugarImageItem({name}: BloodSugarItemType) {
  switch (name) {
    case 'high':
      return <BloodSugarHigh />;
    case 'good':
      return <BloodSugarGood />;
    case 'low':
      return <BloodSugarLow />;
    case 'danger':
      return <BloodSugarDanger />;
    default:
      return null; // name이 잘못된 경우 아무것도 렌더링하지 않음
  }
}

export function AverageImageItem({name}: AverageItemType) {
  switch (name) {
    case 'great':
      return <AverageGreat />;
    case 'normal':
      return <AverageNormal />;
    case 'bad':
      return <AverageBad />;
    default:
      return null; // name이 잘못된 경우 아무것도 렌더링하지 않음
  }
}
