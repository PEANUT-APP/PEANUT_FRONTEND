import apiSlice from '../apiSlice';
import {
  GetPatientReturnType,
  MyCommunityReturnType,
  UpdateFormType,
} from './types';

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
    getCreateCommunityByUser: builder.query<MyCommunityReturnType[], void>({
      query: () => ({
        url: '/user/create/community',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    getLikeCommunityByUser: builder.query<MyCommunityReturnType[], void>({
      query: () => ({
        url: '/user/like/community',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    getCommentAllCommunityByUser: builder.query<MyCommunityReturnType[], void>({
      query: () => ({
        url: '/user/comment/community',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
  }),
});

export const {
  useGetPatientQuery,
  useLazyGetPatientQuery,
  useSendInviteCodeMutation,
  useUpdateUserInfoMutation,
  useGetCreateCommunityByUserQuery,
  useLazyGetCreateCommunityByUserQuery,
  useGetLikeCommunityByUserQuery,
  useLazyGetLikeCommunityByUserQuery,
  useGetCommentAllCommunityByUserQuery,
  useLazyGetCommentAllCommunityByUserQuery,
} = userApi;

export default userApi;
