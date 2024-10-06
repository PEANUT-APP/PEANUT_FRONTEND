import React, {useState} from 'react';
import {colors} from '../../styles/colors';
import {GraphType} from './types';
import {
  GraphContainer,
  GraphContent,
  GraphTitle,
  GraphTop,
  AxisLabel,
  YAxisLabels,
  GraphChart,
  XAxisLabel,
  GraphMainToolTip,
  GraphMainToolTipValue,
  GraphMainToolTipValueText,
  GraphMainToolTipTimeText,
} from './styles';
import PlusButton from '../button/PlusButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {Circle, G, Line} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import moment from 'moment';
import 'moment/locale/ko';

moment.locale('ko');

export default function Graph({graphData, size}: GraphType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const userState = useSelector((state: RootState) => state.user.userState);

  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const onAddBloodSugar = () => {
    navigation.navigate('BloodSugar');
  };

  const handleCircleClick = (index: number) => {
    setSelectedPoint(index === selectedPoint ? null : index);
  };

  const formatTime = (time: number, minute: number) => {
    const momentTime = moment({hour: time, minute: minute});
    return minute !== 0
      ? momentTime.format('A h시 mm분')
      : momentTime.format('A h시');
  };

  const data = graphData?.map(point => point.value) || [];

  const chartWidth = 225; // 그래프 너비
  const chartHeight = 120; // 그래프 높이
  const padding = 20; // 그래프 여백
  const yMaxValue = 200; // Y축 최대값
  const yStep = 50; // Y축 간격

  return (
    <GraphContainer>
      <GraphTop>
        {size !== 's' && (
          <>
            <GraphTitle color={colors.TextNormal} weight="bold">
              혈당 그래프
            </GraphTitle>
            {userState === 'Patient' && (
              <PlusButton onPress={onAddBloodSugar} />
            )}
          </>
        )}
      </GraphTop>
      <GraphContent>
        <GraphChart data={data}>
          {Array.from({length: yMaxValue / yStep + 1}, (_, i) => {
            const y = chartHeight - (i * yStep * chartHeight) / yMaxValue;
            return (
              <Line
                key={`grid-line-${i}`}
                x1={0}
                y1={y}
                x2={265}
                y2={y}
                stroke={colors.LineDisabled}
                strokeWidth="1"
              />
            );
          })}

          {graphData
            .reduce((acc, point, index) => {
              // 현재 점과 다음 점이 모두 유효한 값인지 체크
              if (point.value !== null) {
                // 유효한 점이면 추가
                acc.push({index, value: point.value});
              }
              return acc;
            }, [] as Array<{index: number; value: number}>)
            .map((point, i, arr) => {
              if (i < arr.length - 1) {
                const nextPoint = arr[i + 1];

                const x1 =
                  padding + (point.index * chartWidth) / (graphData.length - 1);
                const y1 = chartHeight - (point.value * chartHeight) / 200;
                const x2 =
                  padding +
                  (nextPoint.index * chartWidth) / (graphData.length - 1);
                const y2 = chartHeight - (nextPoint.value * chartHeight) / 200;

                return (
                  <Line
                    key={`line-${point.index}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={colors.primaryNormal}
                    strokeWidth="2"
                  />
                );
              }
              return null; // 선을 그리지 않음
            })}

          {graphData.map((point, index) => {
            if (point.value !== null) {
              const x = padding + (index * chartWidth) / (graphData.length - 1); // X축 위치 계산
              const y = chartHeight - (point.value * chartHeight) / 200; // Y축 위치 계산

              const isSelected = index === selectedPoint;

              return (
                <G key={index}>
                  {isSelected ? (
                    <Circle
                      cx={x}
                      cy={y}
                      r={4}
                      fill={colors.white}
                      stroke={colors.primaryNormal}
                      strokeWidth={2}
                      onPress={() => handleCircleClick(index)}
                    />
                  ) : (
                    <Circle
                      cx={x}
                      cy={y}
                      r={3}
                      fill={colors.primaryNormal}
                      onPress={() => handleCircleClick(index)}
                    />
                  )}
                  {isSelected && (
                    <GraphMainToolTip
                      style={[
                        {
                          top: y - 61,
                          left: x - 45,
                        },
                      ]}>
                      <GraphMainToolTipValue>
                        <GraphMainToolTipValueText weight="bold">
                          식전
                        </GraphMainToolTipValueText>
                        <GraphMainToolTipValueText weight="bold">
                          {graphData[selectedPoint].value}
                        </GraphMainToolTipValueText>
                      </GraphMainToolTipValue>
                      <GraphMainToolTipTimeText>
                        {formatTime(
                          graphData[selectedPoint].time,
                          graphData[selectedPoint].minute,
                        )}
                      </GraphMainToolTipTimeText>
                    </GraphMainToolTip>
                  )}
                </G>
              );
            }
            return null; // null 값인 경우 점을 그리지 않음
          })}
        </GraphChart>
        <YAxisLabels>
          {['200', '150', '100', '50', '0'].map((label, index) => (
            <AxisLabel key={index}>{label}</AxisLabel>
          ))}
        </YAxisLabels>
      </GraphContent>
      <XAxisLabel>
        {['6시', '12시', '18시', '24시'].map((label, index) => (
          <AxisLabel key={index}>{label}</AxisLabel>
        ))}
      </XAxisLabel>
    </GraphContainer>
  );
}
