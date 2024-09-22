import {AddMealType} from '../../../screens/search/types';

export interface MealListType {
  mealListData: AddMealType[] | undefined;
  onDelete: (index: number) => void;
}

export interface MealListItemType {
  name: string;
  giIndex: number;
  onDelete: () => void;
}

export interface MealTextListItemType {
  name: string;
  value: string | number;
}
