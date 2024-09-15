import React from 'react';
import styled from 'styled-components/native';
import {GraphType} from './types';
import {Body2} from '../../text/Text';
import {colors} from '../../../styles/colors';

const GraphContainer = styled.View`
  width: 203px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GraphTitle = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextNormal};
`;

const GraphBar = styled.View`
  width: 147px;
  height: 12px;
  border-radius: 13px;
  background-color: ${colors.SolidDisabled};
`;

const GraphValue = styled.View<{width: string}>`
  width: ${props => props.width};
  height: 12px;
  border-radius: 13px;
  background-color: ${colors.primaryNormal};
`;

export default function MealGraph({name, value, total}: GraphType) {
  const percentage = total > 0 ? (value / total) * 100 : 0; // 비율 계산
  const width = `${percentage}%`; // 비율에 따른 너비

  return (
    <GraphContainer>
      <GraphTitle>{name}</GraphTitle>
      <GraphBar>
        <GraphValue width={width} />
      </GraphBar>
    </GraphContainer>
  );
}
