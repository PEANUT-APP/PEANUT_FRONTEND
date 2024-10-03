/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import dayjs from 'dayjs';
import {
  MonthCalendarBox,
  MonthCalendarContainer,
  MonthCalendarDateText,
  MonthCalendarDayCircle,
  MonthCalendarDayContainer,
  MonthCalendarDaysContainer,
  MonthCalendarDayText,
  MonthCalendarEmptyDay,
  MonthCalendarIcon,
  MonthCalendarTitle,
  MonthCalendarWeekDay,
  MonthCalendarWeekDays,
  MonthCalendarWeekRow,
} from './styles';
import DesignIcon from '../icon/DesignIcon';
import {colors} from '../../styles/colors';
import {DayItem} from './types';

// 상수 선언
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function MonthCalendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().date());

  // 현재 달의 모든 날짜 배열 생성
  const generateCalendarDays = () => {
    const startOfMonth = currentDate.startOf('month').day(); // 1일의 요일
    const daysInMonth = currentDate.daysInMonth(); // 해당 월의 총 날짜 수
    const daysArray = [];

    // 시작 날짜 앞에 빈 칸 추가
    for (let i = 0; i < startOfMonth; i++) {
      daysArray.push({day: null});
    }

    // 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({day: i});
    }

    // 마지막 줄에 필요한 빈칸 계산
    const totalDays = startOfMonth + daysInMonth; // 시작 빈칸 + 월의 총 날짜 수
    const remainingDays = 7 - (totalDays % 7); // 한 주(7일)에서 남은 칸 수

    // 남은 칸이 7보다 작으면 빈칸(null)을 추가하여 마지막 줄을 채움
    if (remainingDays < 7) {
      for (let i = 0; i < remainingDays; i++) {
        daysArray.push({day: null});
      }
    }

    return daysArray;
  };

  const renderWeek = (weekDays: DayItem[]) => {
    return (
      <MonthCalendarWeekRow>
        {weekDays.map((item, index) => (
          <MonthCalendarDayContainer key={index}>
            {item.day ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => item.day && setSelectedDate(item.day)}>
                {item.day === selectedDate && <MonthCalendarDayCircle />}
                <MonthCalendarDayText selected={item.day === selectedDate}>
                  {item.day}
                </MonthCalendarDayText>
                <MonthCalendarIcon
                  source={{uri: 'https://via.placeholder.com/20'}}
                />
              </TouchableOpacity>
            ) : (
              <MonthCalendarEmptyDay />
            )}
          </MonthCalendarDayContainer>
        ))}
      </MonthCalendarWeekRow>
    );
  };

  const splitIntoWeeks = (days: DayItem[]) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  };

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
          {splitIntoWeeks(generateCalendarDays()).map((weekDays, index) => (
            <View key={index}>{renderWeek(weekDays)}</View>
          ))}
        </MonthCalendarDaysContainer>
      </MonthCalendarBox>
    </MonthCalendarContainer>
  );
}
