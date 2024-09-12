import apiSlice from '../apiSlice';
import {MedicineFormType} from './types';

export const medicineApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    saveMedicineInfo: builder.mutation({
      query: (data: MedicineFormType) => ({
        url: '/medicine/save',
        method: 'POST',
        params: {
          alarm: data.alarm,
          intakeDays: data.intakeDays,
          intakeTime: data.intakeTime,
          medicineName: data.medicineName,
        },
      }),
    }),
  }),
});

export const {useSaveMedicineInfoMutation} = medicineApi;

export default medicineApi;
