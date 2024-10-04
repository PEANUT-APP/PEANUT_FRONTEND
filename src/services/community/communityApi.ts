import apiSlice from '../apiSlice';
import {
  CommentFormType,
  CommunityCreateFormType,
  CommunityDetailReturnType,
  CommunityLikeFormType,
  CommunityListReturnType,
} from './types';

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
    detailsCommunity: builder.query<CommunityDetailReturnType, {id: number}>({
      query: ({id}) => ({
        url: `/community/detail?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    like: builder.mutation({
      query: (data: CommunityLikeFormType) => ({
        url: '/community/like',
        method: 'POST',
        params: {
          communityId: data.communityId,
          liked: data.liked,
        },
      }),
      invalidatesTags: ['Community'],
    }),
    createComment: builder.mutation({
      query: (data: CommentFormType) => ({
        url: '/community/comment',
        method: 'POST',
        params: {
          comment: data.comment,
          id: data.id,
        },
      }),
      invalidatesTags: ['Community'],
    }),
  }),
});

export const {
  useGetAllCommunityQuery,
  useCreateCommunityMutation,
  useDetailsCommunityQuery,
  useLikeMutation,
  useCreateCommentMutation,
} = communityApi;

export default communityApi;