import React, {SetStateAction} from 'react';
import {
  CalendarContainer,
  CalendarMonth,
  CalendarNext,
  CalendarWeek,
  CalendarWeekBox,
  CalendarWeekItem,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import dayjs, {Dayjs} from 'dayjs';
import {TouchableWithoutFeedback, View} from 'react-native';
import {WeeklyType} from './types';

export default function WeeklyCalendar({today, setToday}: WeeklyType) {
  // 'today'가 undefined일 경우 기본값 설정
  const currentDay = today || dayjs(); // today가 없으면 현재 날짜로 대체

  // 현재 주의 월요일
  const monday = currentDay.startOf('week').add(1, 'day');

  // 주간 날짜 배열
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(monday.add(i, 'day'));
  }

  // 날짜 클릭 시 today 상태 업데이트
  const handleDateClick = (date: SetStateAction<Dayjs>) => {
    if (setToday) {
      setToday(date);
    }
  };

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    if (setToday) {
      setToday(currentDay.subtract(1, 'week'));
    }
  };

  const goToNextWeek = () => {
    if (setToday) {
      setToday(currentDay.add(1, 'week'));
    }
  };

  return (
    <CalendarContainer>
      <CalendarMonth weight="bold">{currentDay.format('M')}</CalendarMonth>
      <CalendarWeekBox>
        <TouchableWithoutFeedback onPress={goToPreviousWeek}>
          <View>
            <DesignIcon type="back" size="s" />
          </View>
        </TouchableWithoutFeedback>
        <CalendarWeek>
          {weekDays.map((day, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleDateClick(day)}>
              <CalendarWeekItem isToday={day.isSame(today, 'day')}>
                {day.format('D')}
              </CalendarWeekItem>
            </TouchableWithoutFeedback>
          ))}
        </CalendarWeek>
        <TouchableWithoutFeedback onPress={goToNextWeek}>
          <CalendarNext>
            <DesignIcon type="back" size="s" />
          </CalendarNext>
        </TouchableWithoutFeedback>
      </CalendarWeekBox>
    </CalendarContainer>
  );
}
