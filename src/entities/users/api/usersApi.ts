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

    unBanUser: builder.mutation({
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
              unbanUser(
              userId : ${data.userId}) 
            }
          `,
        }),
      }),
    }),
    getPaymentsLIst: builder.mutation({
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
              getPayments(
                pageSize: ${data.pageSize},
                pageNumber: ${data.pageNumber},
                sortBy: "${data.sortBy}",
                sortDirection: ${data.sortDirection},
                searchTerm: "${data.searchTerm}"
              ) {
                pagesCount, page, pageSize, totalCount, items {
                  id, userId, paymentMethod, amount, currency, createdAt, endDate, type, userName, avatars {
                    url, width, height, fileSize
                  }
                }
              }
            }
          `,
        }),
      }),
    }),
    getPaymentsByUser: builder.mutation({
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
              getPaymentsByUser(
                userId: ${data.userId},
                pageSize: ${data.pageSize},
                pageNumber: ${data.pageNumber},
                sortBy: "${data.sortBy}",
                sortDirection: ${data.sortDirection}
              ) {
                pagesCount, page, pageSize, totalCount, items {
                  id, businessAccountId, status, dateOfPayment, startDate, endDate, type, price, paymentType, payments {
                    id, userId, paymentMethod, amount, currency, createdAt, endDate, type
                  }
                }
              }
            }
          `,
        }),
      }),
    }),
    getPostsList: builder.mutation({
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
              getPosts(
                endCursorPostId: ${data.endCursorPostId},
                searchTerm: "${data.searchTerm}",
                pageSize: ${data.pageSize},
                sortBy: "${data.sortBy}",
                sortDirection: ${data.sortDirection},
              ) {
                pagesCount, pageSize, totalCount, items {
                  images {id, createdAt, url, width, height, fileSize}, id, ownerId, description, createdAt, updatedAt, postOwner {
                    id, userName, firstName, lastName, avatars {url, width, height, fileSize}
                  }
                }
              }
            }
          `,
        }),
      }),
    }),
    getFollowers: builder.mutation({
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
              getFollowers(
                pageSize: ${data.pageSize}
                pageNumber: ${data.pageNumber}
                sortBy: "${data.sortBy}"
                sortDirection: ${data.sortDirection}
                userId: ${data.userId}
              ) {
                pagesCount, page, pageSize, totalCount, items {
                  id, userId, userName, createdAt
                }
              }
            }
          `,
        }),
      }),
    }),
    getFollowing: builder.mutation({
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
              getFollowing(
                pageSize: ${data.pageSize}
                pageNumber: ${data.pageNumber}
                sortBy: "${data.sortBy}"
                sortDirection: ${data.sortDirection}
                userId: ${data.userId}
              ) {
                pagesCount, page, pageSize, totalCount, items {
                  id, userId, userName, createdAt
                }
              }
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

export const {
  useGetUsersMutation,
  useDeleteUserMutation,
  useGetUserMutation,
  useGetPostsByUserMutation,
  useGetPaymentsLIstMutation,
  useGetPaymentsByUserMutation,
  useGetPostsListMutation,
  useGetFollowersMutation,
  useGetFollowingMutation,
  useUnBanUserMutation,
  useBanUserMutation,
} = usersApi
