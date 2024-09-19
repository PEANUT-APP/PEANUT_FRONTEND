interface PredictionList {
  accuracy: string;
  foodName: string;
}

export interface FoodPredictReturnType {
  image_url: string;
  predictions: PredictionList[];
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

export interface FoodAISaveMealType {
  mealTime: string;
}
