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
  AlarmReturnType,
  UpdateUserFormType,
  UpdateUserReturnType,
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
    updateUserAddInfo: builder.mutation({
      query: ({formData, nickname, weight, height}: UpdateFormType) => ({
        url: '/user/update/add-info',
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
    getUserAlamInfo: builder.query<AlarmReturnType, void>({
      query: () => ({
        url: '/user/alam-info/get',
        method: 'GET',
      }),
      providesTags: ['Alarm'],
    }),
    saveUserAlamInfo: builder.mutation({
      query: ({guardianAlam, insulinAlam, medicationAlam}: AlarmFormType) => ({
        url: '/user/alam-info/save',
        method: 'PUT',
        params: {
          guardianAlam,
          insulinAlam,
          medicationAlam,
        },
      }),
      invalidatesTags: ['Alarm'],
    }),
    getUpdateUserInfo: builder.query<UpdateUserReturnType, void>({
      query: () => ({
        url: '/user/get/user-info',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUserInfo: builder.mutation({
      query: ({
        birthday,
        gender,
        password,
        phoneNumber,
        userName,
      }: UpdateUserFormType) => ({
        url: '/user/update/user-info',
        method: 'PUT',
        params: {
          birthday,
          gender,
          password,
          phoneNumber,
          userName,
        },
      }),
      invalidatesTags: ['User'],
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
  useUpdateUserAddInfoMutation,
  useGetCreateCommunityByUserQuery,
  useLazyGetCreateCommunityByUserQuery,
  useGetLikeCommunityByUserQuery,
  useLazyGetLikeCommunityByUserQuery,
  useGetCommentAllCommunityByUserQuery,
  useLazyGetCommentAllCommunityByUserQuery,
  useGetUserAlamInfoQuery,
  useSaveUserAlamInfoMutation,
  useGetUpdateUserInfoQuery,
  useUpdateUserInfoMutation,
} = userApi;

export default userApi;
