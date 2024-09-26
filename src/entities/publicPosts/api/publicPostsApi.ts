import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BACKEND_URL } from '@/shared/constants/ext-urls'

export const transformPostData = (el: PostDataType): PostDataType => {
  return {
    id: el.id,
    ownerId: el.ownerId,
    description: el.description,
    images: el.images,
    owner: el.owner,
    avatarOwner: el.avatarOwner,
    updatedAt: el.updatedAt,
    userName: el.userName,
    createdAt: el.createdAt,
  }
}
export const transformCommentsData = (el: CommentsDataType): CommentsDataType => {
  return {
    id: el.id,
    postId: el.postId,
    from: el.from,
    content: el.content,
    createdAt: el.createdAt,
    isLiked: el.isLiked,
    likeCount: el.likeCount,
  }
}
export const transformAnswerData = (el: any): any => {
  return {
    id: el.id,
    postId: el.postId,
    from: el.from,
    content: el.content,
  }
}

export const publicPostsApi = createApi({
  reducerPath: 'publicPosts',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['PublicPosts', 'SinglePost'],
  endpoints: builder => ({
    getPublicPosts: builder.query<PublicPostsResponseData, void>({
      query: () => ({
        url: '/public-posts/all/?pageSize=4&sortDirection=desc',
        method: 'GET',
      }),
      providesTags: ['PublicPosts'],
      transformResponse: (response: PublicPostsResponseData) => {
        const publicPostsData = response?.items.map(transformPostData)

        return {
          items: publicPostsData,
          totalUsers: response.totalUsers,
          totalCount: response.totalCount,
          pageSize: response.pageSize,
        }
      },
    }),
    getSinglePost: builder.query<PostDataType, number>({
      query: postId => ({
        url: `/public-posts/${postId}`,
        method: 'GET',
      }),
      providesTags: ['SinglePost'],
      transformResponse: (response: PostDataType) => {
        return transformPostData(response)
      },
    }),
  }),
})

export const { useGetPublicPostsQuery, useGetSinglePostQuery } = publicPostsApi
