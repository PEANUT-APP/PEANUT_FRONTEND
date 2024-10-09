import apiSlice from '../apiSlice';
import {MedicineFormType, MedicineRecordReturnType} from './types';

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
      invalidatesTags: ['AdditionalInfo'],
    }),
    getMedicineInfoList: builder.query<MedicineRecordReturnType[], void>({
      query: () => ({
        url: '/medicine/get/record',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSaveMedicineInfoMutation,
  useGetMedicineInfoListQuery,
  useLazyGetMedicineInfoListQuery,
} = medicineApi;

export default medicineApi;
