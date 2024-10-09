import apiSlice from '../apiSlice';
import {InsulinFormType, InsulinRecordReturnType} from './types';

export const insulinApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    saveInsulinIfo: builder.mutation({
      query: (data: InsulinFormType) => ({
        url: '/insulin/save',
        method: 'POST',
        params: {
          alarm: data.alarm,
          administrationTime: data.administrationTime,
          dosage: data.dosage,
          productName: data.productName,
        },
      }),
      invalidatesTags: ['AdditionalInfo'],
    }),
    getInsulinInfoList: builder.query<InsulinRecordReturnType[], void>({
      query: () => ({
        url: '/medicine/get/record',
        method: 'GET',
      }),
    }),
  }),
});

export const {useSaveInsulinIfoMutation, useLazyGetInsulinInfoListQuery} =
  insulinApi;

export default insulinApi;
