import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const usersFollowApi = createApi({
  reducerPath: 'userFollow',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsersName: builder.query<
      SearchUsers,
      { name: string | null; accessToken: string | undefined }
    >({
      query: ({ name, accessToken }) => ({
        method: 'GET',
        url: `/users/?search=${name}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      providesTags: ['Users'],
    }),
    getUserName: builder.query<
      UserProfile,
      { name: string | null; accessToken: string | undefined }
    >({
      query: ({ name, accessToken }) => ({
        method: 'GET',
        url: `/users/${name}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      providesTags: ['Users'],
    }),
    following: builder.mutation({
      query: ({ userId, accessToken }) => ({
        method: 'POST',
        url: '/users/following',
        body: {
          selectedUserId: userId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    unFollowing: builder.mutation({
      query: ({ userId, accessToken }) => ({
        method: 'DELETE',
        url: `/users/follower/${userId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersNameQuery,
  useGetUserNameQuery,
  useFollowingMutation,
  useUnFollowingMutation,
} = usersFollowApi
