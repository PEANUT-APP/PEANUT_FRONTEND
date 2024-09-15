import dayjs from 'dayjs';

export interface MealCardType {
  size: 'm' | 's';
  today: dayjs.Dayjs;
}
