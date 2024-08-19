import React from 'react';
import styled from 'styled-components/native';
import {DesignIconType} from './types';
import {designIconSize} from './designIconSize';
import {Circle, Path, Svg} from 'react-native-svg';
import {getDesignIconSize} from '../../modules/getSize';
import {colors} from '../../styles/colors';

const IconBox = styled.View<DesignIconType>`
  width: ${({size}) => getDesignIconSize(size)};
  height: ${({size}) => getDesignIconSize(size)};
  align-items: center;
  justify-content: center;
`;

const getPathProps = (
  type: string,
  color: string,
  strokeWidth: number | string,
) => {
  if (type === 'kakao' || type === 'comment') {
    return {
      fill: color,
    };
  }

  let dropColor;
  if (type === 'dropClose') {
    dropColor = colors.LineDisabled;
  } else if (type === 'dropOpen') {
    dropColor = colors.primaryNormal;
  } else {
    dropColor = color;
  }
  return {
    stroke: dropColor,
    strokeWidth: strokeWidth,
    fill: 'none',
    strokeLinecap: 'round' as 'round',
  };
};

export default function DesignIcon({
  type = 'check',
  size,
  color = 'black',
}: DesignIconType) {
  const {strokeWidth, viewBox, d} = designIconSize[type][size];
  const {r, cx, cy} = designIconSize.kebab[size];
  const pathProps = getPathProps(type, color, strokeWidth);

  return (
    <IconBox size={size}>
      <Svg viewBox={viewBox} fill="none">
        {type === 'kebab' ? (
          <>
            <Circle cx={cx} cy={cy[0]} r={r} fill={color} />
            <Circle cx={cx} cy={cy[1]} r={r} fill={color} />
            <Circle cx={cx} cy={cy[2]} r={r} fill={color} />
          </>
        ) : (
          <Path {...pathProps} d={d} />
        )}
      </Svg>
    </IconBox>
  );
}
