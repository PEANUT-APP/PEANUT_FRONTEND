import apiSlice from '../apiSlice';
import {CommunityListReturnType} from './types';

export const communityApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCommunity: builder.query<CommunityListReturnType[], void>({
      query: () => ({
        url: '/community/all/details',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetAllCommunityQuery} = communityApi;

export default communityApi;
