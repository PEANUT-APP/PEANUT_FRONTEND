/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Layout from '../layout/Layout';
import {
  RecordBox,
  RecordContainer,
  RecordContentBox,
  MealTitle,
  RecordingTitleBox,
} from './styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import DesignIcon from '../../components/icon/DesignIcon';
import {colors} from '../../styles/colors';
import WeeklyCalendar from '../../components/calendar/WeeklyCalendar';
import TertiaryButton from '../../components/button/TertiaryButton';
import DayMealCard from '../../components/card/DayMealCard';
import {useBackHandler} from '../../modules/commonHooks';
import {useMeal, useRecord} from './hooks';

export default function MealRecord() {
  const {handleBack} = useBackHandler();
  const {isFoodByDateSuccess} = useMeal();
  const {foodByDate, foodData, handleAddMore, refreshing, onRefresh} =
    useRecord();

  return (
    <Layout refreshing={refreshing} onRefresh={onRefresh}>
      <RecordContainer>
        <RecordingTitleBox>
          <TouchableOpacity activeOpacity={1} onPress={handleBack}>
            <DesignIcon type="back" size="l" color={colors.TextNeutral} />
          </TouchableOpacity>
          <MealTitle weight="bold">식사 기록</MealTitle>
          <WeeklyCalendar />
        </RecordingTitleBox>
        <ScrollView
          contentContainerStyle={{paddingBottom: 117}}
          showsVerticalScrollIndicator={false}>
          <RecordBox>
            {isFoodByDateSuccess && (
              <RecordContentBox>
                <DayMealCard time="아침" foodData={foodData.아침} />
                <DayMealCard time="점심" foodData={foodData.점심} />
                <DayMealCard time="저녁" foodData={foodData.저녁} />
                {foodByDate?.간식 && (
                  <DayMealCard time="간식" foodData={foodData.간식} />
                )}
              </RecordContentBox>
            )}
            <TertiaryButton
              size="l"
              onPress={handleAddMore}
              disabled={!!foodByDate?.간식}>
              그 외 식사 추가하기
            </TertiaryButton>
          </RecordBox>
        </ScrollView>
      </RecordContainer>
    </Layout>
  );
}
