import apiSlice from '../apiSlice';
import {SendCodeFormType, UpdateFormType} from './types';

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendInviteCode: builder.mutation({
      query: (data: SendCodeFormType) => ({
        url: '/user/connect/send-code',
        method: 'POST',
        params: {
          email: data.email,
        },
      }),
    }),
    updateUserInfo: builder.mutation({
      query: ({formData, nickname, weight, height}: UpdateFormType) => ({
        url: '/user/update',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

export const {useSendInviteCodeMutation, useUpdateUserInfoMutation} = userApi;

export default userApi;
