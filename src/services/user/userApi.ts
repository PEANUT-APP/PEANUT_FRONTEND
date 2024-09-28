import apiSlice from '../apiSlice';
import {GetPatientReturnType, UpdateFormType} from './types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPatient: builder.query<GetPatientReturnType, {email: string}>({
      query: ({email}) => ({
        url: '/user/connect/get-patient',
        method: 'GET',
        params: {email},
      }),
      transformResponse: (response: any): GetPatientReturnType => {
        return response.data;
      },
    }),
    sendInviteCode: builder.mutation({
      query: () => ({
        url: '/user/connect/send-code',
        method: 'POST',
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({formData, nickname, weight, height}: UpdateFormType) => ({
        url: '/user/update',
        method: 'PUT',
        body: formData,
        params: {
          nickName: nickname,
          weight,
          height,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useLazyGetPatientQuery,
  useSendInviteCodeMutation,
  useUpdateUserInfoMutation,
} = userApi;

export default userApi;
