import apiSlice from '../apiSlice';
import {SendCodeFormType} from './types';

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
  }),
});

export const {useSendInviteCodeMutation} = userApi;

export default userApi;
