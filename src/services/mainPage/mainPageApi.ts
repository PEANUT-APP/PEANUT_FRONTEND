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
        url: `/main-api/patient/get-add-info?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    saveGuardianMedicineInsulinStatus: builder.mutation({
      query: ({date, insulinStatus, medicineStatus}: SaveStatusFormType) => ({
        url: '/main-api/patient/get-add-info/save/status',
        method: 'PUT',
        params: {date, insulinStatus, medicineStatus},
      }),
      invalidatesTags: ['AdditionalInfo'],
    }),
    getFoodAllDetail: builder.query<FoodReturnType, {date: string}>({
      query: ({date}) => ({
        url: `/main-api/patient/get-all-food?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getFoodDetailByEatTime: builder.query<
      FoodReturnType,
      {date: string; eatTime: string}
    >({
      query: ({date, eatTime}) => ({
        url: `/main-api/patient/get-time-food?date=${date}&eatTime=${eatTime}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getPatientUserInfoMainPage: builder.query<UserInfoReturnType, void>({
      query: () => ({
        url: '/main-api/guardian/get-patient',
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getPatientAdditionalInfoMainPage: builder.query<
      PatientAdditionalInfoReturnType,
      {date: string}
    >({
      query: ({date}) => ({
        url: `/main-api/guardian/get-add-info?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getPatientFoodAllDetail: builder.query<FoodReturnType, {date: string}>({
      query: ({date}) => ({
        url: `/main-api/guardian/get-all-food?date=${date}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    getPatientFoodDetailByEatTime: builder.query<
      FoodReturnType,
      {date: string; eatTime: string}
    >({
      query: ({date, eatTime}) => ({
        url: `/main-api/guardian/get-time-food?date=${date}&eatTime=${eatTime}`,
        method: 'GET',
      }),
      providesTags: ['AdditionalInfo'],
    }),
    saveMedicineInsulinStatus: builder.mutation({
      query: ({date, insulinStatus, medicineStatus}: SaveStatusFormType) => ({
        url: '/main-api/guardian/get-add-info/save/status',
        method: 'PUT',
        params: {date, insulinStatus, medicineStatus},
      }),
      invalidatesTags: ['AdditionalInfo'],
    }),
  }),
});

export const {
  useGetUserInfoMainPageQuery,
  useGetAdditionalInfoMainPageQuery,
  useGetFoodAllDetailQuery,
  useGetFoodDetailByEatTimeQuery,
  useSaveGuardianMedicineInsulinStatusMutation,
  useGetPatientUserInfoMainPageQuery,
  useGetPatientAdditionalInfoMainPageQuery,
  useGetPatientFoodAllDetailQuery,
  useGetPatientFoodDetailByEatTimeQuery,
  useSaveMedicineInsulinStatusMutation,
} = mainPageApi;

export default mainPageApi;
