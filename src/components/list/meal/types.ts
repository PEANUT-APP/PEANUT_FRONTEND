import {FoodDetailReturnType} from '../../../services/food/types';

export interface MealListType {
  mealListData: FoodDetailReturnType[] | undefined;
  onDelete: (index: number) => void;
}

export interface MealListItemType {
  name: string;
  giIndex: number;
  onDelete: () => void;
}
