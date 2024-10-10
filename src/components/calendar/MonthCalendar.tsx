/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useMemo, useState} from 'react';
import dayjs from 'dayjs';
import {
  MonthCalendarBox,
  MonthCalendarContainer,
  MonthCalendarDateText,
  MonthCalendarDay,
  MonthCalendarDayCircle,
  MonthCalendarDayContainer,
  MonthCalendarDaysContainer,
  MonthCalendarDayText,
  MonthCalendarEmptyDay,
  MonthCalendarTitle,
  MonthCalendarWeekDay,
  MonthCalendarWeekDays,
  MonthCalendarWeekRow,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import {DayItem, MonthCalendarType} from './types';
import {
  AverageItem,
  BloodSugarItem,
} from '../../screens/medical/item/CalendarItem';

// 상수 선언
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 현재 달의 모든 날짜 배열 생성
const generateCalendarDays = (currentDate: dayjs.Dayjs) => {
  const startOfMonth = currentDate.startOf('month').day(); // 1일의 요일
  const daysInMonth = currentDate.daysInMonth(); // 해당 월의 총 날짜 수
  const daysArray = [];

  // 시작 날짜 앞에 빈 칸 추가
  daysArray.push(...Array.from({length: startOfMonth}, () => ({day: null})));

  // 날짜 채우기
  daysArray.push(
    ...Array.from({length: daysInMonth}, (_, i) => ({day: i + 1})),
  );

  // 마지막 줄에 필요한 빈칸 계산
  const totalDays = startOfMonth + daysInMonth; // 시작 빈칸 + 월의 총 날짜 수
  const remainingDays = 7 - (totalDays % 7); // 한 주(7일)에서 남은 칸 수

  // 남은 칸이 7보다 작으면 빈칸(null)을 추가하여 마지막 줄을 채움
  if (remainingDays < 7) {
    daysArray.push(...Array.from({length: remainingDays}, () => ({day: null})));
  }

  return daysArray;
};

const splitIntoWeeks = (days: DayItem[]) =>
  Array.from({length: Math.ceil(days.length / 7)}, (_, i) =>
    days.slice(i * 7, i * 7 + 7),
  );

export default function MonthCalendar({type}: MonthCalendarType) {
  const [currentDate, setCurrentDate] = useState(dayjs().add(9, 'hour'));
  const [selectedDate, setSelectedDate] = useState(currentDate.date());

  const calendarDays = useMemo(
    () => generateCalendarDays(currentDate),
    [currentDate],
  );

  const handleSelectDate = useCallback((day: number | null) => {
    if (day) {
      setSelectedDate(day);
    }
  }, []);

  const renderWeek = useCallback(
    (weekDays: DayItem[], index: number) => (
      <MonthCalendarWeekRow key={index}>
        {weekDays.map((item, idx) => (
          <MonthCalendarDayContainer key={idx}>
            {item.day ? (
              <MonthCalendarDay
                activeOpacity={1}
                onPress={() => handleSelectDate(item.day)}>
                {item.day === selectedDate && <MonthCalendarDayCircle />}
                <MonthCalendarDayText selected={item.day === selectedDate}>
                  {item.day}
                </MonthCalendarDayText>
                {type === 'bloodSugar' ? (
                  <BloodSugarItem name="good" />
                ) : (
                  <AverageItem name="great" />
                )}
              </MonthCalendarDay>
            ) : (
              <MonthCalendarEmptyDay />
            )}
          </MonthCalendarDayContainer>
        ))}
      </MonthCalendarWeekRow>
    ),
    [handleSelectDate, selectedDate, type],
  );

  return (
    <MonthCalendarContainer>
      <MonthCalendarTitle>
        <MonthCalendarDateText weight="bold">
          {currentDate.format('YYYY년 M월')}
        </MonthCalendarDateText>
        <DesignIcon type="dropClose" size="l" color={colors.TextNeutral} />
      </MonthCalendarTitle>
      <MonthCalendarBox>
        <MonthCalendarWeekDays>
          {DAYS.map(day => (
            <MonthCalendarWeekDay key={day}>{day}</MonthCalendarWeekDay>
          ))}
        </MonthCalendarWeekDays>
        <MonthCalendarDaysContainer>
          {splitIntoWeeks(calendarDays).map(renderWeek)}
        </MonthCalendarDaysContainer>
      </MonthCalendarBox>
    </MonthCalendarContainer>
  );
}
