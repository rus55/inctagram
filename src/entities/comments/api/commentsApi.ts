import {createApi} from '@reduxjs/toolkit/query/react'
import {baseQueryWithReauth} from "@/entities/posts";


export const commentsApi = createApi({
  reducerPath: 'posts',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts', 'PublicPosts'],
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
      invalidatesTags: ['Posts'],
    }),
    getComment: builder.query({
      query: ({ postId,accessToken}) => {
        return {
          method: 'GET',
          url: `/posts/${postId}/comments`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      providesTags: ['Posts'],
    }),
    getCommentUnAuthorization: builder.query({
      query: ({ postId}) => {
        return {
          method: 'GET',
          url: `/public-posts/${postId}/comments`,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
      providesTags: ['Posts'],
    }),
    likeComment: builder.mutation<
        any,
        {
          likeStatus:string
          postId: number | undefined
          commentId:number
          accessToken: string | undefined
        }
    >({
      query: ({ commentId, postId, accessToken,likeStatus }) => {
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
      invalidatesTags: ['Posts'],
    }),
    createAnswer: builder.mutation<
        any,
        {
          content: string | undefined
          commentId:number
          postId: number | undefined
          accessToken: string | undefined
        }
    >({
      query: ({ content, postId, accessToken,commentId }) => {
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
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
    useUpdateCommentMutation,
    useGetCommentQuery,
    useGetCommentUnAuthorizationQuery,
    useLikeCommentMutation,
    useCreateAnswerMutation
} = commentsApi

