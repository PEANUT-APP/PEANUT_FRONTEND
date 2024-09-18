import dayjs from 'dayjs';

export interface MealCardType {
  size: 'm' | 's';
  today: dayjs.Dayjs;
}

export interface DayMealCardType {
  time: string;
  meal?: string;
  feedback1?: string;
  feedback2?: string;
}
