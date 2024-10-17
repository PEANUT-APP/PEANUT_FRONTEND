import dayjs, {Dayjs} from 'dayjs';

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

interface DailyStatus {
  date: string;
  bloodSugarStatus: 'good' | 'high' | 'low' | 'danger' | string;
}

export interface MonthCalendarType {
  currentDate: Dayjs;
  setCurrentDate: React.Dispatch<React.SetStateAction<Dayjs>>;
  type: 'bloodSugar' | 'average';
  bloodDailyStatuses: DailyStatus[] | undefined;
}
