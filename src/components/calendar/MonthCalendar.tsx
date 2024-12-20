/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

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

const getKSTDate = (date = new Date()) => {
  return new Date(date.getTime());
};

// 한국 시간(KST)으로 설정하는 함수
const getKSTDayjs = (date = dayjs()) => dayjs(date).tz('Asia/Seoul');

export default function MonthCalendar({
  currentDate,
  setCurrentDate,
  type,
  bloodDailyStatuses,
  insulinDailyStatuses,
  medicineDailyStatuses,
}: MonthCalendarType) {
  const [selectedDate, setSelectedDate] = useState(currentDate.date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(getKSTDate(currentDate.toDate()));

  useEffect(() => {
    setSelectedDate(getKSTDayjs(currentDate).date());
    setDate(getKSTDate(currentDate.toDate()));
  }, [currentDate]);

  const calendarDays = useMemo(
    () => generateCalendarDays(currentDate),
    [currentDate],
  );

  const handleSelectDate = useCallback((day: number | null) => {
    if (day) {
      setSelectedDate(day);
    }
  }, []);

  const handleOpenDate = useCallback(() => {
    setDatePickerVisibility(true); // DatePicker 열기
  }, []);

  const handleConfirm = useCallback(
    (selectDate: Date) => {
      const selectedDayjs = dayjs(selectDate);

      setDate(selectDate);
      setCurrentDate(selectedDayjs); // 선택된 날짜로 currentDate 설정
      setSelectedDate(selectedDayjs.date()); // 새로운 currentDate의 날짜로 선택된 날짜 설정
      setDatePickerVisibility(false); // DatePicker 닫기
    },
    [setCurrentDate],
  );

  const getStatusForDate = useCallback(
    (day: number) => {
      const dateStr = currentDate.date(day).format('YYYY-MM-DD');
      if (type === 'medicine') {
        return medicineDailyStatuses?.find(
          status => status.recordDate === dateStr,
        )?.recordStatus;
      } else if (type === 'insulin') {
        return insulinDailyStatuses?.find(
          status => status.recordDate === dateStr,
        )?.recordStatus;
      }
      return bloodDailyStatuses?.find(status => status.date === dateStr)
        ?.bloodSugarStatus;
    },
    [
      currentDate,
      type,
      bloodDailyStatuses,
      insulinDailyStatuses,
      medicineDailyStatuses,
    ],
  );

  const renderWeek = useCallback(
    (weekDays: DayItem[], index: number) => (
      <MonthCalendarWeekRow key={index}>
        {weekDays.map((item, idx) => (
          <MonthCalendarDayContainer key={idx}>
            {item.day ? (
              <MonthCalendarDay
                onPress={() => handleSelectDate(item.day)}
                hitSlop={10}>
                {item.day === selectedDate && <MonthCalendarDayCircle />}
                <MonthCalendarDayText selected={item.day === selectedDate}>
                  {item.day}
                </MonthCalendarDayText>
                {type === 'bloodSugar' ? (
                  <BloodSugarItem name={getStatusForDate(item.day)} />
                ) : (
                  <AverageItem name={getStatusForDate(item.day)} />
                )}
              </MonthCalendarDay>
            ) : (
              <MonthCalendarEmptyDay />
            )}
          </MonthCalendarDayContainer>
        ))}
      </MonthCalendarWeekRow>
    ),
    [getStatusForDate, handleSelectDate, selectedDate, type],
  );

  return (
    <MonthCalendarContainer>
      <MonthCalendarTitle onPress={handleOpenDate} activeOpacity={1}>
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
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={getKSTDate(date)}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)} // DatePicker 닫기
      />
    </MonthCalendarContainer>
  );
}
