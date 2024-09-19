import apiSlice from '../apiSlice';
import {
  FoodAISaveMealType,
  FoodDetailReturnType,
  FoodPredictReturnType,
} from './types';

export const foodApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPredictInfo: builder.mutation<FoodPredictReturnType, FormData>({
      query: data => ({
        url: '/food/ai/predict',
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
    createAIMealInfo: builder.mutation({
      query: (data: FoodAISaveMealType) => ({
        url: '/food/ai/save-meal',
        method: 'POST',
        params: {
          mealTime: data.mealTime,
        },
      }),
    }),
    getFoodNutritionByName: builder.query<
      FoodDetailReturnType[],
      {name: string[]}
    >({
      query: ({name}) => ({
        url: '/food/normal/details',
        method: 'GET',
        params: {
          name: name,
        },
      }),
    }),
  }),
});

export const {
  useGetPredictInfoMutation,
  useGetFoodDetailInfoQuery,
  useCreateAIMealInfoMutation,
  useGetFoodNutritionByNameQuery,
} = foodApi;

export default foodApi;
