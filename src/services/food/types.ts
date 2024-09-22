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
  expectationBloodSugar: number;
  fat: number;
  foodId: number;
  giIndex: number;
  glIndex: number;
  name: string;
  protein: number;
}

export interface FoodCheckListType {
  eatTime: string;
  feedBack: string;
  foodName: string[];
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
