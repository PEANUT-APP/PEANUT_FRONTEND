import React, {SetStateAction, useState} from 'react';
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

  // 날짜 클릭 시 today 상태 업데이트
  const handleDateClick = (date: SetStateAction<Dayjs>) => {
    setToday(date);
  };

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
