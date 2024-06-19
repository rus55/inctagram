import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUsers: builder.mutation({
      query: data => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`admin@gmail.com:admin`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getUsers(
                pageSize: ${data.pageSize},
                pageNumber: ${data.pageNumber},
                sortBy: "${data.sortBy}",
                sortDirection: ${data.sortDirection},
                searchTerm: "${data.searchTerm}",
                statusFilter: ${data.statusFilter}
              ) {
                users {id, userName, email, createdAt, profile {id, userName, firstName, lastName, city, dateOfBirth, aboutMe, createdAt, avatars {url, width, height, fileSize}}, userBan {reason, createdAt}}
                pagination  {pagesCount page pageSize totalCount}
              }
            }
          `,
        }),
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: data => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`admin@gmail.com:admin`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              removeUser(userId : ${data.userId}) 
            }
          `,
        }),
      }),
    }),
    banUser: builder.mutation({
      query: data => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`admin@gmail.com:admin`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              banUser(
              banReason : "${data.banReason}",
              userId : ${data.userId}) 
            }
          `,
        }),
      }),
    }),
  }),
})

export const { useGetUsersMutation, useDeleteUserMutation, useBanUserMutation } = usersApi
