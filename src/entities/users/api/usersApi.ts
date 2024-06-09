import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    getUser: builder.mutation({
      query: id => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`admin@gmail.com:admin`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              getUser(
                userId: ${id}
              ) {
                id, userName, email, createdAt, profile {id, userName, firstName, lastName, city, dateOfBirth, aboutMe, createdAt, avatars {url, width, height, fileSize}}, userBan {reason, createdAt}
              }
            }
          `,
        }),
      }),
    }),
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
    getPostsByUser: builder.mutation({
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
              getPostsByUser(
                userId: ${data.id},
                endCursorId: ${data.endCursorId}
              ) {
                pagesCount, pageSize, totalCount, items {id, createdAt, url, width, height, fileSize}
              }
            }
          `,
        }),
      }),
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
  }),
})

export const {
  useGetUsersMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetPostsByUserMutation,
} = usersApi
