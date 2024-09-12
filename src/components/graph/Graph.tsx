import React from 'react';
import {colors} from '../../styles/colors';
import {GraphType} from './types';
import {
  GraphContainer,
  GraphChart,
  GraphContent,
  GraphTitle,
  GraphTop,
  YAxisLabel,
  YAxisLabels,
} from './styles';
import PlusButton from '../button/PlusButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';

export default function Graph({graphData}: GraphType) {
  const labels = ['6시', '', '12시', '', '18시', '', '24시'];

  const data = {
    labels,
    datasets: [
      {
        data: graphData,
        color: () => colors.primaryNormal,
        strokeWidth: 2,
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
      stroke: colors.LineDisabled,
    },
    propsForDots: {
      r: 3,
      fill: colors.primaryNormal,
    },
    labelColor: () => colors.TextDisabled,
    propsForLabels: {
      fontSize: 12,
      fontFamily: 'Pretendard',
    },
    yAxisLabel: '',
    yAxisSuffix: '',
  };

  const navigation = useNavigation<NavigationProp<ParamList>>();

  const onAddBloodSugar = () => {
    navigation.navigate('BloodSugar');
  };

  return (
    <GraphContainer>
      <GraphTop>
        <GraphTitle color={colors.TextNormal} weight="bold">
          혈당 그래프
        </GraphTitle>
        <PlusButton onPress={onAddBloodSugar} />
      </GraphTop>
      <GraphContent>
        <GraphChart
          data={data}
          chartConfig={chartConfig}
          width={330}
          height={160}
          withVerticalLines={false}
          withHorizontalLabels={false}
          segments={4}
          withHorizontalLines={true}
          yAxisInterval={1}
        />
        <YAxisLabels>
          {['200', '150', '100', '50', '0'].map((label, index) => (
            <YAxisLabel key={index}>{label}</YAxisLabel>
          ))}
        </YAxisLabels>
      </GraphContent>
    </GraphContainer>
  );
}
