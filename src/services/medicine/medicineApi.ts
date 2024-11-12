import {mapStatus} from '../../screens/medical/hooks';
import apiSlice from '../apiSlice';
import {
  MedicineFormType,
  MedicineRecordFormType,
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
    getGuardianMedicineInfoList: builder.query<
      TransformedMedicineReportReturnType,
      {month: number; year: number}
    >({
      query: ({month, year}) => ({
        url: `/medicine/get/guardian-report?month=${month}&year=${year}`,
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
    stopMedicine: builder.mutation({
      query: ({activeStatus, medicineId}: MedicineRecordFormType) => ({
        url: '/medicine/update-status/record',
        method: 'PUT',
        params: {
          activeStatus,
          medicineId,
        },
      }),
    }),
  }),
});

export const {
  useSaveMedicineInfoMutation,
  useGetMedicineInfoListQuery,
  useLazyGetMedicineInfoListQuery,
  useGetMedicineInfoReportListQuery,
  useGetGuardianMedicineInfoListQuery,
  useStopMedicineMutation,
} = medicineApi;

export default medicineApi;
