import dayjs from 'dayjs';

export interface CalendarType {
  mealRecords: MealRecords;
}

interface MealRecords {
  [date: string]: string[];
}

export interface WeeklyType {
  today: dayjs.Dayjs | undefined;
  setToday: React.Dispatch<React.SetStateAction<dayjs.Dayjs>> | undefined;
}

export interface DayItem {
  day: number | null;
}

export interface MonthCalendarType {
  type: 'bloodSugar' | 'average';
}
