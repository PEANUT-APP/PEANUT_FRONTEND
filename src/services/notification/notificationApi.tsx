import apiSlice from '../apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    remindPatient: builder.mutation({
      query: () => ({
        url: '/notification/api/caregiver/remind',
        method: 'POST',
      }),
    }),
  }),
});

export const {useRemindPatientMutation} = notificationApi;

export default notificationApi;
