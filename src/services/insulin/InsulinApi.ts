import {mapStatus} from '../../screens/medical/hooks';
import apiSlice from '../apiSlice';
import {
  InsulinFormType,
  InsulinRecordReturnType,
  InsulinReportReturnType,
  TransformedInsulinReportReturnType,
} from './types';

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
        url: '/insulin/get/record',
        method: 'GET',
      }),
    }),
    getInsulinInfoReportList: builder.query<
      TransformedInsulinReportReturnType,
      {month: number; year: number}
    >({
      query: ({month, year}) => ({
        url: `/insulin/get/report?month=${month}&year=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: InsulinReportReturnType) => {
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
  useSaveInsulinIfoMutation,
  useLazyGetInsulinInfoListQuery,
  useGetInsulinInfoReportListQuery,
} = insulinApi;

export default insulinApi;
