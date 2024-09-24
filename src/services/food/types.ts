interface PredictionList {
  accuracy: string;
  foodName: string;
}

export interface FoodPredictReturnType {
  image_url: string;
  predictions: PredictionList[];
}

export interface FoodSaveImageReturnType {
  success: boolean;
  code: number;
  msg: string;
  detailMessage: string;
}

export interface FoodDetailReturnType {
  carbohydrate: number;
  cholesterol: number;
  expectedBloodSugar: number;
  fat: number;
  foodId: number;
  giIndex: number;
  glIndex: number;
  name: string;
  protein: number;
  servingCount: number;
}

export interface FoodCheckListType {
  eatTime: string;
  feedBack: string;
  foodName: string[];
  imageUrl: string | null;
}

export interface FoodByDateReturnType {
  아침?: FoodCheckListType | null;
  점심?: FoodCheckListType | null;
  저녁?: FoodCheckListType | null;
  간식?: FoodCheckListType | null;
}

export interface FoodAISaveMealType {
  mealTime: string;
}

export interface FoodNormalSaveMealType {
  mealTime: string;
  servingCount: number[];
}

export interface FoodCustomFormType {
  foodName: string;
  servingCount: number;
}

export interface RemoveFoodFormType {
  foodName: string;
}
