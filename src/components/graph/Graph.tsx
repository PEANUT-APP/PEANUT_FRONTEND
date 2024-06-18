import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1} from '../text/Text';
import {AssistiveTextButton} from '../button/TextButton';
import {LineChart} from 'react-native-chart-kit';
import {GraphType} from './types';

const GraphContainer = styled.View`
  width: 350px;
  justify-content: space-between;
  gap: 13px;
  border-radius: 8px;
  background-color: ${colors.white};
  padding: 27px 24px 24px 0;
  overflow: hidden;
`;

const GraphTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 24px;
`;

const GraphTitle = styled(Body1)`
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

const GraphChart = styled(LineChart)`
  margin-left: -20px;
`;

export default function Graph({graphData}: GraphType) {
  const labels = ['', '6', '', '', '12', '', '', '18', '', '', '24', ''];

  const data = {
    labels,
    datasets: [
      {
        data: graphData,
        color: () => colors.primaryNormal,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    fillShadowGradientFrom: '#fff',
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientTo: '#fff',
    fillShadowGradientToOpacity: 0,
    color: () => colors.primaryNormal,
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#D7D7D7',
    },
    propsForDots: {
      r: 4.5,
      strokeWidth: '3',
      stroke: '#33DCBE',
      fill: '#FFF',
    },
    labelColor: () => colors.TextDisabled,
    propsForLabels: {
      fontSize: 12,
    },
  };

  return (
    <GraphContainer>
      <GraphTop>
        <GraphTitle color={colors.TextNeutral} weight="bold">
          혈당 그래프
        </GraphTitle>
        <AssistiveTextButton size="s">년 / 월 / 일</AssistiveTextButton>
      </GraphTop>
      <GraphChart
        data={data}
        chartConfig={chartConfig}
        width={330}
        height={160}
        withVerticalLines={false}
        segments={3}
        withHorizontalLabels={false}
      />
    </GraphContainer>
  );
}
