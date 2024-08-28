import apiSlice from '../apiSlice';
import {SendEmailReturnType, SignInFormType, SignUpFormType} from './types';

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
    verifyEmail: builder.mutation({
      query: (code: string) => ({
        url: '/sign/verified',
        method: 'POST',
        params: {
          confirmationCode: code,
        },
      }),
    }),
    signUp: builder.mutation({
      query: (data: SignUpFormType) => ({
        url: '/sign/sign-up',
        method: 'POST',
        params: {
          birth: data.birth,
          gender: data.gender,
          height: data.height,
          name: data.name,
          nickname: data.nickname,
          password: data.password,
          weight: data.weight,
          phoneNumber: data.phoneNumber,
        },
      }),
    }),
    signIn: builder.mutation({
      query: (data: SignInFormType) => ({
        url: '/sign/sign-in',
        method: 'POST',
        params: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
  }),
});

export const {
  useSendSimpleMessageMutation,
  useVerifyEmailMutation,
  useSignUpMutation,
  useSignInMutation,
} = signApi;

export default signApi;
