export interface MealCardType {
  size: 'm' | 's';
}

export interface DayMealCardType {
  time: string;
  meal?: string;
  feedback1?: string;
  feedback2?: string;
}
