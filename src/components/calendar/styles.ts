import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {Body1, Body2} from '../text/Text';

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
