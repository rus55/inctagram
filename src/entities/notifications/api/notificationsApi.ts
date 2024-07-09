import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const notificationsApi = createApi({
  reducerPath: 'notifications',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['notifications'],
  endpoints: builder => ({
    getNotifications: builder.query({
      query: accessToken => ({
        method: 'GET',
        url: '/notifications?pageSize=120',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
    updateNotifications: builder.mutation({
      query: ({ body, accessToken }) => {
        return {
          method: 'PUT',
          url: '/notifications/mark-as-read',
          credentials: 'include',
          body,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          invalidatesTags: ['notifications'],
        }
      },
    }),
  }),
})

export const { useGetNotificationsQuery, useUpdateNotificationsMutation } = notificationsApi
