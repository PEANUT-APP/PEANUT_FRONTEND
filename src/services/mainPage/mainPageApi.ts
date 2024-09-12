import apiSlice from '../apiSlice';
import {AdditionalInfoReturnType, UserInfoReturnType} from './types';

export const insulinApi = apiSlice.injectEndpoints({
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
  }),
});

export const {useGetUserInfoMainPageQuery, useGetAdditionalInfoMainPageQuery} =
  insulinApi;

export default insulinApi;
