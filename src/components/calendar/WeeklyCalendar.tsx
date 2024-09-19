import React from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setToday} from '../../slices/todaySlice';

export default function WeeklyCalendar() {
  const dispatch = useDispatch();
  const today: Dayjs = dayjs(
    useSelector((state: RootState) => state.today.today),
  );

  // 'today'가 undefined일 경우 기본값 설정
  const currentDay = today || dayjs(); // today가 없으면 현재 날짜로 대체

  // 현재 주의 일요일
  const sunday = currentDay.startOf('week'); // 일요일로 시작하는 주

  // 주간 날짜 배열
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(sunday.add(i, 'day'));
  }

  // 날짜 클릭 시 today 상태 업데이트
  const handleDateClick = (date: Dayjs) => {
    dispatch(setToday(date.toISOString())); // Redux 상태 업데이트
  };

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    dispatch(setToday(sunday.subtract(1, 'week').add(6, 'day').toISOString())); // 이전 주로 이동
  };

  // 다음 주로 이동
  const goToNextWeek = () => {
    dispatch(setToday(sunday.add(1, 'week').toISOString())); // 다음 주로 이동
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
