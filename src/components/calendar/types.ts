export interface CalendarType {
  mealRecords: MealRecords;
}

interface MealRecords {
  [date: string]: string[];
}
