import apiSlice from '../apiSlice';
import {
  AdditionalInfoReturnType,
  FoodReturnType,
  UserInfoReturnType,
} from './types';

export const mainPageApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserInfoMainPage: builder.query<UserInfoReturnType, void>({
      query: () => ({
        url: '/main-api/get-user',
        method: 'GET',
      }),
    }),
    getAdditionalInfoMainPage: builder.query<
      AdditionalInfoReturnType,
      {date: string}
    >({
      query: ({date}) => ({
        url: `/main-api/get-add-info?date=${date}`,
        method: 'GET',
      }),
    }),
    getFoodAllDetail: builder.query<FoodReturnType, {date: string}>({
      query: ({date}) => ({
        url: `/main-api/get-all-food?date=${date}`,
        method: 'GET',
      }),
    }),
    getFoodDetailByEatTime: builder.query<
      FoodReturnType,
      {date: string; eatTime: string}
    >({
      query: ({date, eatTime}) => ({
        url: `/main-api/get-time-food?date=${date}&eatTime=${eatTime}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserInfoMainPageQuery,
  useGetAdditionalInfoMainPageQuery,
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
} = mainPageApi;

export default mainPageApi;
