import dayjs, {Dayjs} from 'dayjs';
import {TransformedInsulinDailyStatus} from '../../services/insulin/types';
import {TransformedMedicineDailyStatus} from '../../services/medicine/types';

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
  type: 'bloodSugar' | 'insulin' | 'medicine';
  bloodDailyStatuses: DailyStatus[] | undefined;
  insulinDailyStatuses: TransformedInsulinDailyStatus[] | undefined;
  medicineDailyStatuses: TransformedMedicineDailyStatus[] | undefined;
}
