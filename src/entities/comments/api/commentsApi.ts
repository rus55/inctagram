import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Comments', 'PublicComments'],
  endpoints: builder => ({
    updateComment: builder.mutation<
      any,
      {
        content: string
        postId: number | undefined
        accessToken: string | undefined
      }
    >({
      query: ({ content, postId, accessToken }) => {
        return {
          url: `/posts/${postId}/comments`,
          body: { content },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Comments'],
    }),
    getComment: builder.query({
      query: ({ postId, accessToken }) => {
        return {
          method: 'GET',
          url: `/posts/${postId}/comments`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      providesTags: ['Comments'],
    }),
    getCommentUnAuthorization: builder.query({
      query: ({ postId }) => {
        return {
          method: 'GET',
          url: `/public-posts/${postId}/comments`,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
      providesTags: ['Comments'],
    }),

    getAnswer: builder.query({
      query: ({ postId, commentId, accessToken }) => {
        return {
          method: 'GET',
          url: `/posts/${postId}/comments/${commentId}/answers`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      providesTags: ['Comments'],
    }),
    likeComment: builder.mutation<
      any,
      {
        likeStatus: string
        postId: number | undefined
        commentId: number
        accessToken: string | undefined
      }
    >({
      query: ({ commentId, postId, accessToken, likeStatus }) => {
        return {
          url: `/posts/${postId}/comments/${commentId}/like-status`,
          body: { likeStatus },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Comments'],
    }),
    likeAnswer: builder.mutation<
      any,
      {
        likeStatus: string
        postId: number | undefined
        commentId: number
        accessToken: string | undefined
        answerId: number
      }
    >({
      query: ({ commentId, answerId, postId, accessToken, likeStatus }) => {
        return {
          url: `/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
          body: { likeStatus },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Comments'],
    }),
    createAnswer: builder.mutation<
      any,
      {
        content: string | undefined
        commentId: number | undefined
        postId: number | undefined
        accessToken: string | undefined
      }
    >({
      query: ({ content, postId, accessToken, commentId }) => {
        return {
          url: `/posts/${postId}/comments/${commentId}/answers`,
          body: { content },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Comments'],
    }),
  }),
})

export const {
  useUpdateCommentMutation,
  useGetCommentQuery,
  useGetCommentUnAuthorizationQuery,
  useLikeCommentMutation,
  useCreateAnswerMutation,
  useGetAnswerQuery,
  useLikeAnswerMutation,
} = commentsApi
