import apiSlice from '../apiSlice';
import {
  AdditionalInfoReturnType,
  FoodReturnType,
  PatientAdditionalInfoReturnType,
  SaveStatusFormType,
  UserInfoReturnType,
} from './types';

export const mainPageApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserInfoMainPage: builder.query<UserInfoReturnType, void>({
      query: () => ({
        url: '/main-api/get-user',
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getAdditionalInfoMainPage: builder.query<
      AdditionalInfoReturnType,
      {date: string}
    >({
      query: ({date}) => ({
        url: `/main-api/get-add-info?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    saveMedicineInsulinStatus: builder.mutation({
      query: ({date, insulinStatus, medicineStatus}: SaveStatusFormType) => ({
        url: '/main-api/get-add-info/save/status',
        method: 'PUT',
        params: {date, insulinStatus, medicineStatus},
      }),
      invalidatesTags: ['AdditionalInfo'],
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
    getPatientUserInfoMainPage: builder.query<UserInfoReturnType, void>({
      query: () => ({
        url: '/main-api/patient/get-user',
        method: 'GET',
      }),
    }),
    getPatientAdditionalInfoMainPage: builder.query<
      PatientAdditionalInfoReturnType,
      {date: string}
    >({
      query: ({date}) => ({
        url: `/main-api/patient/get-add-info?date=${date}`,
        method: 'GET',
      }),
    }),
    getPatientFoodAllDetail: builder.query<FoodReturnType, {date: string}>({
      query: ({date}) => ({
        url: `/main-api/patient/get-all-food?date=${date}`,
        method: 'GET',
      }),
    }),
    getPatientFoodDetailByEatTime: builder.query<
      FoodReturnType,
      {date: string; eatTime: string}
    >({
      query: ({date, eatTime}) => ({
        url: `/main-api/patient/get-time-food?date=${date}&eatTime=${eatTime}`,
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
  useSaveMedicineInsulinStatusMutation,
  useGetPatientUserInfoMainPageQuery,
  useGetPatientAdditionalInfoMainPageQuery,
  useGetPatientFoodAllDetailQuery,
  useGetPatientFoodDetailByEatTimeQuery,
} = mainPageApi;

export default mainPageApi;
