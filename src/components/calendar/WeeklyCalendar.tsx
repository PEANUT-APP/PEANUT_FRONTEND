import React, {useState} from 'react';
import {
  CalendarContainer,
  CalendarMonth,
  CalendarNext,
  CalendarWeek,
  CalendarWeekBox,
  CalendarWeekItem,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback, View} from 'react-native';

export default function WeeklyCalendar() {
  // 오늘 날짜
  const [today, setToday] = useState(dayjs());

  // 현재 주의 월요일
  const monday = today.startOf('week').add(1, 'day');

  // 주간 날짜 배열
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(monday.add(i, 'day'));
  }

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    setToday(today.subtract(1, 'week'));
    console.log('previous');
  };

  const goToNextWeek = () => {
    setToday(today.add(1, 'week'));
    console.log('next');
  };

  return (
    <CalendarContainer>
      <CalendarMonth weight="bold">{today.format('M')}</CalendarMonth>
      <CalendarWeekBox>
        <TouchableWithoutFeedback onPress={goToPreviousWeek}>
          <View>
            <DesignIcon type="back" size="s" />
          </View>
        </TouchableWithoutFeedback>
        <CalendarWeek>
          {weekDays.map((day, index) => (
            <CalendarWeekItem key={index} isToday={day.isSame(dayjs(), 'day')}>
              {day.format('D')}
            </CalendarWeekItem>
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
