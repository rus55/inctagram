import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.mutation({
      query: data => {
        const authHeader = 'Basic ' + btoa('admin@gmail.com' + ':' + 'admin')

        return {
          url: '/graphql',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
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
        }
      },
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetUsersMutation } = usersApi
