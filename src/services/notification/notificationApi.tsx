import apiSlice from '../apiSlice';
import {NotificationType} from './types';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotificationList: builder.query<NotificationType[], void>({
      query: () => ({
        url: '/notification/get-all',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetNotificationListQuery} = notificationApi;

export default notificationApi;
