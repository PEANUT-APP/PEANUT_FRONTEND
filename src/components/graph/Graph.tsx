import React from 'react';
import {colors} from '../../styles/colors';
import {GraphType} from './types';
import {
  GraphContainer,
  GraphContent,
  GraphTitle,
  GraphTop,
  AxisLabel,
  YAxisLabels,
  XAxisLabel,
} from './styles';
import PlusButton from '../button/PlusButton';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/types';
import {LineChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

export default function Graph({graphData, size}: GraphType) {
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const userState = useSelector((state: RootState) => state.user.userState);

  const onAddBloodSugar = () => {
    navigation.navigate('BloodSugar');
  };

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
        <LineChart
          data={graphData} // 변환된 데이터
          width={245} // 차트 너비
          adjustToWidth
          height={148} // 차트 높이
          initialSpacing={20} // 차트 시작 부분의 간격
          color={colors.primaryNormal} // 선 색상
          thickness={2} // 선 두께
          maxValue={200} // Y축 최대값
          noOfSections={4} // Y축 구간 (200까지니까 4 구간)
          hideYAxisText // Y축의 텍스트 숨기기
          yAxisLabelTexts={['0', '50', '100', '150', '200']} // Y축 레이블
          yAxisThickness={0} // Y축 선 두께를 0으로 설정하여 숨기기
          xAxisThickness={1} // X축 선 두께를 0으로 설정하여 숨기기
          xAxisColor={colors.LineDisabled}
          dataPointsColor={colors.primaryNormal} // 데이터 포인트 색상
          yAxisColor={colors.LineDisabled} // Y축의 가로줄 색상
          yAxisLabelWidth={29} // Y축 레이블 넓이
          showVerticalLines={false} // 세로줄 숨기기
          hideRules={false} // Y축 가로선은 표시
          rulesColor={colors.LineDisabled} // 가로선 색상
          rulesType={'solid'} // 가로선 스타일을 solid로 설정
          isAnimated={false}
        />
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
