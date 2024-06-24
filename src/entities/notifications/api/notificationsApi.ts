import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'

export const notificationsApi = createApi({
  reducerPath: 'notifications',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['notifications'],
  endpoints: builder => ({
    notification: builder.query({
      query: accessToken => ({
        method: 'GET',
        url: '/notifications?pageSize=500',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
  }),
})

export const { useNotificationQuery } = notificationsApi
