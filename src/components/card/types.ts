export interface MealCardType {
  size: 'm' | 's';
  time?: string;
}

export interface DayMealCardType {
  time: string;
  foodData: DayMealDataType;
}

export interface DayMealDataType {
  meal: string;
  feedback1: string;
  feedback2: string;
}
