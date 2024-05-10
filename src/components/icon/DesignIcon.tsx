import React from 'react';
import styled from 'styled-components/native';
import {DesignIconType} from './types';
import {designIconSize} from '../../modules/designIconSize';
import {Path, Svg} from 'react-native-svg';
import {getDesignIconSize} from '../../modules/getSize';

const IconBox = styled.View<DesignIconType>`
  width: ${({size}) => getDesignIconSize(size)};
  height: ${({size}) => getDesignIconSize(size)};
  align-items: center;
  justify-content: center;
`;

export default function DesignIcon({
  type = 'check',
  size,
  color = 'black',
}: DesignIconType) {
  const {strokeWidth, viewBox, d} = designIconSize[type][size];

  const pathProps =
    type === 'check'
      ? {stroke: color, strokeWidth: strokeWidth, fill: 'none'}
      : {fill: color};

  return (
    <IconBox size={size}>
      <Svg viewBox={viewBox} fill="none">
        <Path {...pathProps} d={d} />
      </Svg>
    </IconBox>
  );
}
