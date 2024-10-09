import apiSlice from '../apiSlice';
import {
  AlarmFormType,
  GetPatientReturnType,
  GetPatientInfoReturnType,
  MyCommunityReturnType,
  UpdateFormType,
  GetUserInfoReturnType,
  GetConnectingInfoReturnType,
  GetGuardianReturnType,
  GuardianRelationFormType,
} from './types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserInfoMyPage: builder.query<GetUserInfoReturnType, void>({
      query: () => ({
        url: '/user/get-info',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPatientInfo: builder.query<GetPatientInfoReturnType, void>({
      query: () => ({
        url: '/user/get-patient',
        method: 'GET',
      }),
    }),
    getGuardianInfo: builder.query<GetGuardianReturnType, void>({
      query: () => ({
        url: '/user/get-guardian',
        method: 'GET',
      }),
      providesTags: ['Connect'],
    }),
    getPatient: builder.query<GetPatientReturnType, {email: string}>({
      query: ({email}) => ({
        url: '/user/connect/get-patient',
        method: 'GET',
        params: {email},
      }),
      transformResponse: (response: any): GetPatientReturnType => {
        return response.data;
      },
      providesTags: ['Connect'],
    }),
    getConnectingInfo: builder.query<GetConnectingInfoReturnType[], void>({
      query: () => ({
        url: '/user/get-connecting-info',
        method: 'GET',
      }),
      providesTags: ['Connect'],
    }),
    sendInviteCode: builder.mutation({
      query: () => ({
        url: '/user/connect/send-code',
        method: 'POST',
      }),
      invalidatesTags: ['Connect'],
    }),
    confirmGuardianRelation: builder.mutation({
      query: (data: GuardianRelationFormType) => ({
        url: `/user/connect/patient-guardian?confirmationCode=${data.guardianCode}`,
        method: 'POST',
      }),
      invalidatesTags: ['Connect'],
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
    userAlamInfo: builder.mutation({
      query: ({guardianAlam, insulinAlam, medicationAlam}: AlarmFormType) => ({
        url: '/user/alam-info',
        method: 'PUT',
        params: {
          guardianAlam,
          insulinAlam,
          medicationAlam,
        },
      }),
    }),
  }),
});

export const {
  useGetUserInfoMyPageQuery,
  useGetPatientInfoQuery,
  useGetPatientQuery,
  useLazyGetPatientQuery,
  useGetGuardianInfoQuery,
  useGetConnectingInfoQuery,
  useSendInviteCodeMutation,
  useConfirmGuardianRelationMutation,
  useUpdateUserInfoMutation,
  useGetCreateCommunityByUserQuery,
  useLazyGetCreateCommunityByUserQuery,
  useGetLikeCommunityByUserQuery,
  useLazyGetLikeCommunityByUserQuery,
  useGetCommentAllCommunityByUserQuery,
  useLazyGetCommentAllCommunityByUserQuery,
  useUserAlamInfoMutation,
} = userApi;

export default userApi;
