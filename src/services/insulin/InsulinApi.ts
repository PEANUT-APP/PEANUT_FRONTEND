import apiSlice from '../apiSlice';
import {InsulinFormType} from './types';

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
  }),
});

export const {useSaveInsulinIfoMutation} = insulinApi;

export default insulinApi;
