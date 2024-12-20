import React from 'react';
import styled from 'styled-components/native';
import {AverageItemType, BloodSugarItemType} from './types';

const ItemView = styled.View<{type?: 'guide' | 'report'}>`
  width: ${({type}) =>
    type === 'guide' ? '16px' : type === 'report' ? '20.998px' : '12px'};
  height: ${({type}) =>
    type === 'guide' ? '16px' : type === 'report' ? '20.998px' : '12px'};
  padding: ${({type}) =>
    type === 'guide' ? '1px' : type === 'report' ? '1.5px' : 0};
  border-radius: 200px;
`;

const BloodSugarItemView = styled(ItemView)<{
  name: 'good' | 'high' | 'low' | 'danger' | string | undefined;
}>`
  background-color: ${({name}) =>
    name === 'high'
      ? '#F76363'
      : name === 'good'
      ? '#FFAC33'
      : name === 'low'
      ? '#6279DD'
      : '#282828'};
  opacity: ${({name}) => (name ? 1 : 0)};
`;

const AverageItemView = styled(ItemView)<{
  name: 'great' | 'normal' | 'bad' | string | undefined;
}>`
  background-color: ${({name}) =>
    name === 'great' ? '#F76363' : name === 'normal' ? '#FFAC33' : '#6279DD'};
  opacity: ${({name}) => (name ? 1 : 0)};
`;

export function BloodSugarItem({name, type}: BloodSugarItemType) {
  return <BloodSugarItemView name={name} type={type} />;
}

export function AverageItem({name, type}: AverageItemType) {
  return <AverageItemView name={name} type={type} />;
}
