import apiSlice from '../apiSlice';
import {
  FoodAISaveMealType,
  FoodByDateReturnType,
  FoodCheckListType,
  FoodCustomFormType,
  FoodDetailReturnType,
  FoodNormalSaveMealType,
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
      providesTags: ['Meal'],
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
          간식:
            response.foodCheckList.find(meal => meal.eatTime === '간식') ||
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
    getFoodDetailInfo: builder.query<FoodDetailReturnType[], void>({
      query: () => ({
        url: '/food/ai/details',
        method: 'GET',
      }),
      providesTags: ['AI'],
    }),
    getFoodNutritionByName: builder.query<
      FoodDetailReturnType[],
      {name: string[]}
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
    }),
    saveNormalMealInfo: builder.mutation({
      query: (data: FoodNormalSaveMealType) => ({
        url: '/food/normal/save-meal',
        method: 'POST',
        params: {
          mealTime: data.mealTime,
          servingCount: data.servingCount,
        },
      }),
      invalidatesTags: ['Meal'],
    }),
    addCustomFood: builder.mutation({
      query: (data: FoodCustomFormType) => ({
        url: '/food/add-food',
        method: 'POST',
        params: {
          foodName: data.foodName,
          servingCount: data.servingCount,
        },
      }),
      invalidatesTags: ['AI'],
    }),
    removeFoodFromSession: builder.mutation({
      query: (foodName: string) => ({
        url: '/food/delete-food',
        method: 'POST',
        params: {
          foodName,
        },
      }),
      invalidatesTags: ['AI'],
    }),
  }),
});

export const {
  useGetFoodCheckByDateQuery,
  useGetPredictInfoMutation,
  useSaveNormalMealInfoImageMutation,
  useLazyGetFoodDetailInfoQuery,
  useGetFoodDetailInfoQuery,
  useGetFoodNutritionByNameQuery,
  useLazyGetFoodNutritionByNameQuery,
  useCreateAIMealInfoMutation,
  useSaveNormalMealInfoMutation,
  useAddCustomFoodMutation,
  useRemoveFoodFromSessionMutation,
} = foodApi;

export default foodApi;
