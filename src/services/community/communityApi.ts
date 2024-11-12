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
    deleteCommunity: builder.mutation({
      query: (id: number) => ({
        url: '/community/delete/{id}',
        method: 'DELETE',
        params: {
          id,
        },
      }),
      invalidatesTags: ['Community'],
    }),
    updateCommunity: builder.mutation({
      query: ({
        id,
        title,
        content,
      }: {
        id: number;
        title: string;
        content: string;
      }) => ({
        url: `/community/update/${id}`,
        method: 'PUT',
        params: {
          id,
          title,
          content,
        },
      }),
      invalidatesTags: ['Community'],
    }),
    findCommunityBySearch: builder.query<
      CommunityListReturnType[],
      {search: string}
    >({
      query: ({search}) => ({
        url: `/community/detail/{search}?search=${search}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllCommunityQuery,
  useCreateCommunityMutation,
  useDetailsCommunityQuery,
  useLikeMutation,
  useCreateCommentMutation,
  useDeleteCommunityMutation,
  useUpdateCommunityMutation,
  useLazyFindCommunityBySearchQuery,
} = communityApi;

export default communityApi;
