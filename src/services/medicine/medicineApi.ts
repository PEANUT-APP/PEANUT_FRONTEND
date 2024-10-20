import {mapStatus} from '../../screens/medical/hooks';
import apiSlice from '../apiSlice';
import {
  MedicineFormType,
  MedicineRecordReturnType,
  MedicineReportReturnType,
  TransformedMedicineReportReturnType,
} from './types';

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
    getMedicineInfoReportList: builder.query<
      TransformedMedicineReportReturnType,
      {month: number; year: number}
    >({
      query: ({month, year}) => ({
        url: `/medicine/get/report?month=${month}&year=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: MedicineReportReturnType) => {
        const transformedDailyStatuses = response.dailyStatuses.map(status => ({
          ...status,
          recordStatus: mapStatus(status.recordStatus),
        }));

        return {
          ...response,
          dailyStatuses: transformedDailyStatuses,
        };
      },
    }),
  }),
});

export const {
  useSaveMedicineInfoMutation,
  useGetMedicineInfoListQuery,
  useLazyGetMedicineInfoListQuery,
  useGetMedicineInfoReportListQuery,
} = medicineApi;

export default medicineApi;
