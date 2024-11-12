import apiSlice from '../apiSlice';
import {
  BloodSugarFormType,
  BloodSugarReportType,
  TransformedBloodSugarReportType,
} from './types';

const mapBloodSugarStatus = (status: string) => {
  switch (status) {
    case '정상 수치':
      return 'good';
    case '고혈당 수치':
      return 'high';
    case '저혈당 수치':
      return 'low';
    case '위험 수치':
      return 'danger';
    default:
      return 'unknown'; // 알 수 없는 상태 처리
  }
};

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
      invalidatesTags: ['AdditionalInfo'],
    }),
    getMonthlyBloodSugarStatus: builder.query<
      TransformedBloodSugarReportType,
      {month: number; year: number}
    >({
      query: ({month, year}) => ({
        url: `/blood-sugar/monthly-report?month=${month}&year=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: BloodSugarReportType) => {
        const transformedDailyStatuses = response.dailyStatuses.map(status => ({
          ...status,
          bloodSugarStatus: mapBloodSugarStatus(status.bloodSugarStatus), // 변환
        }));

        return {
          ...response,
          dailyStatuses: transformedDailyStatuses,
          monthlyAvgStatus: mapBloodSugarStatus(response.monthlyAvgStatus), // 변환
        };
      },
    }),
    getGuardianMonthlyBloodSugarStatus: builder.query<
      TransformedBloodSugarReportType,
      {month: number; year: number}
    >({
      query: ({month, year}) => ({
        url: `/blood-sugar/guardian-monthly-report?month=${month}&year=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: BloodSugarReportType) => {
        const transformedDailyStatuses = response.dailyStatuses.map(status => ({
          ...status,
          bloodSugarStatus: mapBloodSugarStatus(status.bloodSugarStatus), // 변환
        }));

        return {
          ...response,
          dailyStatuses: transformedDailyStatuses,
          monthlyAvgStatus: mapBloodSugarStatus(response.monthlyAvgStatus), // 변환
        };
      },
    }),
  }),
});

export const {
  useSaveBloodSugarMutation,
  useGetMonthlyBloodSugarStatusQuery,
  useGetGuardianMonthlyBloodSugarStatusQuery,
} = bloodSugarApi;

export default bloodSugarApi;
