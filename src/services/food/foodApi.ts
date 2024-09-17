import apiSlice from '../apiSlice';
import {FoodDetailReturnType, FoodPredictReturnType} from './types';

export const foodApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPredictInfo: builder.mutation<FoodPredictReturnType, FormData>({
      query: data => ({
        url: '/food/predict',
        method: 'POST',
        body: data,
      }),
    }),
    getFoodDetailInfo: builder.query<FoodDetailReturnType[], {name: string[]}>({
      query: ({name}) => ({
        url: '/food/details',
        method: 'GET',
        params: {
          name: name,
        },
      }),
    }),
  }),
});

export const {useGetPredictInfoMutation, useGetFoodDetailInfoQuery} = foodApi;

export default foodApi;
