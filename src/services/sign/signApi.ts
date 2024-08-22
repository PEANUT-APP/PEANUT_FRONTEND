import apiSlice from '../apiSlice';
import {SendEmailReturnType} from './types';

export const signApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendSimpleMessage: builder.mutation<SendEmailReturnType, string>({
      query: (email: string) => ({
        url: '/sign/send-mail',
        method: 'POST',
        params: {
          email: email,
        },
      }),
    }),
  }),
});

export const {useSendSimpleMessageMutation} = signApi;

export default signApi;
