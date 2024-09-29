import apiSlice from '../apiSlice';
import {CommunityCreateFormType, CommunityListReturnType} from './types';

export const communityApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCommunity: builder.query<CommunityListReturnType[], void>({
      query: () => ({
        url: '/community/all/details',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    createCommunity: builder.mutation({
      query: (data: CommunityCreateFormType) => ({
        url: '/community/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Community'],
    }),
  }),
});

export const {useGetAllCommunityQuery, useCreateCommunityMutation} =
  communityApi;

export default communityApi;
