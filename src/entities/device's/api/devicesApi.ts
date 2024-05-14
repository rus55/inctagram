import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'
import { OptionsType } from '@/shared/components'
import { BASE_URL } from '@/shared/constants/ext-urls'

export const devicesApi = createApi({
  reducerPath: 'apiDevices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Devices'],
  endpoints: builder => ({
    getDevices: builder.query<Device[], UserAuthData>({
      query: ({ accessToken }) => ({
        method: 'GET',
        url: '/sessions',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      providesTags: ['Devices'],
    }),
    deleteAll: builder.mutation<void, { accessToken: string | undefined }>({
      query: ({ accessToken }) => {
        return {
          url: '/sessions/terminate-all',
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Devices'],
    }),
    deleteSession: builder.mutation<
      void,
      { deviceId: number | undefined; accessToken: string | undefined }
    >({
      query: ({ deviceId, accessToken }) => {
        return {
          url: `/sessions/${deviceId}`,
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      },
      invalidatesTags: ['Devices'],
    }),
  }),
})

export const { useGetDevicesQuery, useDeleteAllMutation, useDeleteSessionMutation } = devicesApi
