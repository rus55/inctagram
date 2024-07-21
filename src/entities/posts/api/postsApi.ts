import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '..'

import { getLargeImage } from '@/shared/lib'
import {transformCommentsData, transformPostData} from "@/entities/publicPosts/api/publicPostsApi";

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts', 'PublicPosts'],
  endpoints: builder => ({
    getPosts: builder.query<PostsDataToComponentCounter, PostsQuery>({
      query: ({ userId, postId }) => {
        return {
          method: 'GET',
          url: `/public-posts/user/${userId}/${postId ? postId : ''}?pageSize=8`,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      },
      providesTags: ['Posts'],
      transformResponse: (response: PostsData): PostsDataToComponentCounter => {
        return { posts: response?.items.map(getLargeImage), totalCount: response.totalCount }
      },
    }),
    publishPostsImage: builder.mutation<any, { postsPhoto: any; accessToken: string | undefined }>({
      query: ({ postsPhoto, accessToken }) => {
        const formData = new FormData()

        const b64toBlob = (dataURI: string) => {
          const byteString = atob(dataURI.split(',')[1])
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          return new Blob([ab], { type: 'image/jpeg' })
        }

        postsPhoto.forEach((file: any) => {
          const blob = b64toBlob(file.image)

          formData.append('file', blob)
        })

        return {
          url: '/posts/image',
          body: formData,
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
    }),
    publishPosts: builder.mutation<
      any,
      {
        description: string
        childrenMetadata: { uploadId: string | number }[]
        accessToken: string | undefined
      }
    >({
      query: ({ description, accessToken, childrenMetadata }) => {
        return {
          url: '/posts',
          body: { description, childrenMetadata },
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: [],
    }),
    updatePost: builder.mutation<
      any,
      {
        description: string
        postId: number
        accessToken: string | undefined
      }
    >({
      query: ({ description, postId, accessToken }) => {
        return {
          url: `/posts/${postId}`,
          body: { description },
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<
      any,
      {
        postId: number
        accessToken: string | undefined
      }
    >({
      query: ({ postId, accessToken }) => {
        return {
          url: `/posts/${postId}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: [],
    }),
    getPostOfFollowers: builder.query<PublicPostsResponseData,any>({
      query: ({accessToken}) => ({
        url: `/home/publications-followers`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      providesTags: ['Posts'],
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
    updateComment: builder.mutation<
        any,
        {
          content: string
          postId: number
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
      query: ({ postId}) => {
        return {
          method: 'GET',
          // body: { content },
          url: `/posts/${postId}/comments`,
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      providesTags: ['Posts'],
    }),


  }),
})

export const {
  useGetPostsQuery,
  usePublishPostsImageMutation,
  usePublishPostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostOfFollowersQuery,
    useUpdateCommentMutation,
    useGetCommentQuery
} = postsApi

