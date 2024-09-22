import apiSlice from '../apiSlice';
import {
  FoodAISaveMealType,
  FoodByDateReturnType,
  FoodCheckListType,
  FoodDetailReturnType,
  FoodPredictReturnType,
  FoodSaveImageReturnType,
} from './types';

export const foodApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFoodCheckByDate: builder.query<FoodByDateReturnType, {date: string}>({
      query: ({date}) => ({
        url: '/food/food-record-check',
        method: 'GET',
        params: {
          date,
        },
      }),
      transformResponse: (response: {foodCheckList: FoodCheckListType[]}) => {
        // 데이터 변환: 아침, 점심, 저녁 데이터를 구조화
        const foodByTime = {
          아침:
            response.foodCheckList.find(meal => meal.eatTime === '아침') ||
            null,
          점심:
            response.foodCheckList.find(meal => meal.eatTime === '점심') ||
            null,
          저녁:
            response.foodCheckList.find(meal => meal.eatTime === '저녁') ||
            null,
        };
        return foodByTime;
      },
    }),
    getPredictInfo: builder.mutation<FoodPredictReturnType, FormData>({
      query: data => ({
        url: '/food/ai/predict',
        method: 'POST',
        body: data,
      }),
    }),
    saveNormalMealInfoImage: builder.mutation<
      FoodSaveImageReturnType,
      FormData
    >({
      query: data => ({
        url: '/food/normal/save-image',
        method: 'POST',
        body: data,
      }),
    }),
    getFoodDetailInfo: builder.query<FoodDetailReturnType[], {name: string[]}>({
      query: ({name}) => ({
        url: '/food/ai/details',
        method: 'GET',
        params: {
          name: name,
        },
      }),
    }),
    getFoodNutritionByName: builder.query<
      FoodDetailReturnType[],
      {name: string}
    >({
      query: ({name}) => ({
        url: '/food/normal/details',
        method: 'GET',
        params: {
          name,
        },
      }),
    }),
    createAIMealInfo: builder.mutation({
      query: (data: FoodAISaveMealType) => ({
        url: '/food/ai/save-meal',
        method: 'POST',
        params: {
          mealTime: data.mealTime,
        },
      }),
      invalidatesTags: ['Meal'],
    }),
  }),
});

export const {
  useGetFoodCheckByDateQuery,
  useGetPredictInfoMutation,
  useSaveNormalMealInfoImageMutation,
  useGetFoodDetailInfoQuery,
  useGetFoodNutritionByNameQuery,
  useLazyGetFoodNutritionByNameQuery,
  useCreateAIMealInfoMutation,
} = foodApi;

export default foodApi;
