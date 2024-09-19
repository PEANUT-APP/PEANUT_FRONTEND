import React from 'react';
import styled from 'styled-components/native';
import {GraphType} from './types';
import {Body2} from '../../text/Text';
import {colors} from '../../../styles/colors';

const GraphContainer = styled.View`
  flex-direction: row;
  gap: 7px;
  align-items: center;
`;

const GraphBox = styled.View`
  width: 256px;
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
  width: 200px;
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

const GraphPercentage = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.primaryNormal};
`;

export default function MealGraph({
  name,
  value,
  total,
  isLast,
  prevTotal,
}: GraphType) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0; // 비율 계산
  const remainingPercentage =
    isLast && prevTotal
      ? Math.max(0, 100 - Math.round((prevTotal / total) * 100))
      : percentage;
  const width = `${percentage}%`;

  return (
    <GraphContainer>
      <GraphBox>
        <GraphTitle>{name}</GraphTitle>
        <GraphBar>
          <GraphValue width={width} />
        </GraphBar>
      </GraphBox>
      <GraphPercentage weight="bold">{remainingPercentage}%</GraphPercentage>
    </GraphContainer>
  );
}
