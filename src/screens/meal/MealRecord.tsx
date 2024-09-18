import React from 'react';
import Layout from '../layout/Layout';
import {
  RecordBox,
  RecordContainer,
  RecordContentBox,
  RecordingTitle,
  RecordingTitleBox,
} from './styles';
import {TouchableOpacity} from 'react-native';
import {useMeal} from './hooks';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import TertiaryButton from '../../components/button/TertiaryButton';
import DayMealCard from '../../components/card/DayMealCard';

export default function MealRecord() {
  const {handleBack, today, setToday} = useMeal();

  return (
    <Layout paddingBottom={130}>
      <RecordContainer>
        <RecordBox>
          <RecordingTitleBox>
            <TouchableOpacity activeOpacity={1} onPress={handleBack}>
              <DesignIcon type="back" size="l" color={colors.TextNeutral} />
            </TouchableOpacity>
            <RecordingTitle color={colors.TextNormal} weight="bold">
              식사 기록
            </RecordingTitle>
            <WeeklyCalendar today={today} setToday={setToday} />
          </RecordingTitleBox>
          <RecordContentBox>
            <DayMealCard time="아침" />
            <DayMealCard time="점심" />
            <DayMealCard time="저녁" />
          </RecordContentBox>
        </RecordBox>
        <TertiaryButton size="l">그 외 식사 추가하기</TertiaryButton>
      </RecordContainer>
    </Layout>
  );
}
