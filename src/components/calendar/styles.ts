import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2, Heading} from '../text/Text';

export const CalendarContainer = styled.View`
  width: 350px;
  height: 90px;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 12px 12px 15px;
  border-radius: 8px;
`;

export const CalendarMonth = styled(Body1)`
  color: ${colors.TextNormal};
  line-height: 21.344px;
  letter-spacing: -0.4px;
`;

export const CalendarWeekBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CalendarWeek = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 26px;
`;

export const CalendarNext = styled.View`
  transform: rotate(180deg);
`;

export const CalendarWeekItem = styled(Body2)<{isToday: boolean}>`
  width: ${({isToday}) => isToday && '30px'};
  height: ${({isToday}) => isToday && '30px'};
  text-align: center;
  background-color: ${({isToday}) =>
    isToday ? colors.primaryNormal : 'transparent'};
  border-radius: 100px;
  color: ${({isToday}) => (isToday ? colors.white : colors.TextNeutral)};
  border-radius: 100px;
  line-height: 18.676px;
  letter-spacing: -0.35px;
  padding-top: ${({isToday}) => isToday && '5px'};
  margin: ${({isToday}) => (isToday ? '0 -6px' : '0')};
`;

export const MonthCalendarContainer = styled.View`
  width: 350px;
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;
  gap: 24px;
`;

export const MonthCalendarTitle = styled.View`
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

export const MonthCalendarDateText = styled(Heading)`
  line-height: 26.68px;
  letter-spacing: -0.5px;
  color: ${colors.TextNeutral};
`;

export const MonthCalendarBox = styled.View`
  width: 282px;
  margin: 0 10px;
  gap: 12px;
  align-items: center;
`;

export const MonthCalendarWeekDays = styled.View`
  flex-direction: row;
  gap: 31px;
  align-items: center;
  justify-content: center;
`;

export const MonthCalendarWeekDay = styled(Body2)`
  line-height: 18.676px;
  letter-spacing: -0.35px;
  color: ${colors.TextDisabled};
`;

export const MonthCalendarDaysContainer = styled.View`
  width: 282px;
`;

export const MonthCalendarWeekRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MonthCalendarDayContainer = styled.View`
  height: 68px;
  align-items: center;
`;

export const MonthCalendarDay = styled.TouchableOpacity`
  width: 20px;
  gap: 8px;
  align-items: center;
`;

export const MonthCalendarDayText = styled(Body1)<{selected: boolean}>`
  line-height: 21.344px;
  letter-spacing: -0.4px;
  color: ${({selected}) => (selected ? colors.white : colors.TextNeutral)};
  text-align: center;
`;

export const MonthCalendarDayCircle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: ${colors.primaryNormal};
  position: absolute;
  bottom: 16px;
  left: -4.7px;
  z-index: 0;
`;

export const MonthCalendarEmptyDay = styled.View`
  width: 20px;
  height: 69px;
`;

export const MonthCalendarIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export const MonthCalendarNoneItem = styled.View`
  width: 12px;
  height: 12px;
`;
