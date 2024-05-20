import React from 'react';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Caption2, Title} from '../text/Text';
import {CalendarType} from './types';
import {
  formatDateKey,
  getDaysArray,
  splitWeeks,
} from '../../modules/calendarUtils';

const CalendarContainer = styled.View`
  width: 350px;
  border-radius: 8px;
  background: ${colors.white};
  align-items: center;
  padding: 20px 0 4px;
  gap: 8px;
`;

const CalendarHeader = styled(Title)`
  line-height: 32.016px;
  letter-spacing: -0.6px;
  text-align: center;
`;

const CalendarDateContainer = styled.View`
  width: 100%;
`;

const WeekView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const DateView = styled(Body1)`
  background-color: ${colors.SolidSecondaryActive};
  width: 100%;
  text-align: center;
  line-height: 21.344px;
  letter-spacing: -0.4px;
  margin: 4px 0;
`;

const RecordView = styled.View`
  height: 60px;
`;

const RecordText = styled(Caption2)`
  line-height: 13.34px;
  letter-spacing: -0.25px;
`;

export default function Calendar({mealRecords}: CalendarType) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  const daysArray = getDaysArray(currentYear, currentMonth);
  const weeks = splitWeeks(daysArray);

  return (
    <CalendarContainer>
      <CalendarHeader color={colors.TextNeutral} weight="bold">
        {currentMonth}
      </CalendarHeader>
      <CalendarDateContainer>
        {weeks.map((week, index) => (
          <WeekView key={index}>
            {week.map((date, dateIndex) => {
              const dateKey = formatDateKey(currentYear, currentMonth, date);
              const meals = dateKey ? mealRecords[dateKey] || [] : [];
              const isToday = date === today;
              return (
                <DateContainer key={dateIndex}>
                  <DateView
                    color={isToday ? colors.primaryStrong : colors.TextNeutral}
                    weight={isToday ? 'bold' : 'normal'}>
                    {date || ''}
                  </DateView>
                  <RecordView>
                    {meals.map((meal, mealIndex) => (
                      <RecordText key={mealIndex} color={colors.TextDisabled}>
                        {meal}
                      </RecordText>
                    ))}
                  </RecordView>
                </DateContainer>
              );
            })}
          </WeekView>
        ))}
      </CalendarDateContainer>
    </CalendarContainer>
  );
}
