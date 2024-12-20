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
import {Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {setToday} from '../../slices/todaySlice';

export default function WeeklyCalendar() {
  const dispatch = useDispatch();
  const today = useSelector((state: RootState) => state.today.today);

  // 'today'가 undefined일 경우 기본값 설정
  const currentDay = dayjs(today) || dayjs(); // today가 없으면 현재 날짜로 대체

  // 현재 주의 일요일
  const sunday = currentDay.startOf('week'); // 일요일로 시작하는 주

  // 주간 날짜 배열
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(sunday.add(i, 'day'));
  }

  // 날짜 클릭 시 today 상태 업데이트
  const handleDateClick = (date: Dayjs) => {
    dispatch(setToday(date.format('YYYY-MM-DD'))); // Redux 상태 업데이트
  };

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    dispatch(
      setToday(sunday.subtract(1, 'week').add(6, 'day').format('YYYY-MM-DD')),
    ); // 이전 주로 이동
  };

  // 다음 주로 이동
  const goToNextWeek = () => {
    dispatch(setToday(sunday.add(1, 'week').format('YYYY-MM-DD'))); // 다음 주로 이동
  };

  return (
    <CalendarContainer>
      <CalendarMonth weight="bold">{currentDay.format('M')}</CalendarMonth>
      <CalendarWeekBox>
        <Pressable onPress={goToPreviousWeek} hitSlop={10}>
          <View>
            <DesignIcon type="back" size="s" />
          </View>
        </Pressable>
        <CalendarWeek>
          {weekDays.map((day, index) => (
            <Pressable
              key={index}
              onPress={() => handleDateClick(day)}
              hitSlop={10}>
              <CalendarWeekItem isToday={day.isSame(today, 'day')}>
                {day.format('D')}
              </CalendarWeekItem>
            </Pressable>
          ))}
        </CalendarWeek>
        <Pressable onPress={goToNextWeek} hitSlop={10}>
          <CalendarNext>
            <DesignIcon type="back" size="s" />
          </CalendarNext>
        </Pressable>
      </CalendarWeekBox>
    </CalendarContainer>
  );
}
