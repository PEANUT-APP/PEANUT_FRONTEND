import apiSlice from '../apiSlice';
import {BloodSugarFormType} from './types';

export const bloodSugarApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    saveBloodSugar: builder.mutation({
      query: (data: BloodSugarFormType) => ({
        url: '/blood-sugar/save',
        method: 'POST',
        params: {
          bloodSugarLevel: data.bloodSugarLevel,
          measurementCondition: data.measurementCondition,
          measurementTime: data.measurementTime,
          memo: data.memo,
        },
      }),
    }),
  }),
});

export const {useSaveBloodSugarMutation} = bloodSugarApi;

export default bloodSugarApi;
