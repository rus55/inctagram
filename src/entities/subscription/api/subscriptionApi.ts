import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/entities/posts'
import { ISubscriptionBodyWithToken } from '@/shared/types'

export const subscriptionApi = createApi({
  reducerPath: 'subscription',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['subscription'],
  endpoints: builder => ({
    subscribe: builder.mutation<{ url: string }, ISubscriptionBodyWithToken>({
      query: ({ body, accessToken }) => ({
        url: '/subscriptions',
        method: 'POST',
        credentials: 'include',
        body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
      invalidatesTags: ['subscription'],
    }),
    currentSubscription: builder.query({
      query: accessToken => ({
        method: 'GET',
        url: `/subscriptions/current-subscriptions`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
    getPayments: builder.query({
      query: accessToken => ({
        method: 'GET',
        url: `/subscriptions/my-payments`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
    autoRenewal: builder.mutation({
      query: accessToken => ({
        url: '/subscriptions/canceled-auto-renewal',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    }),
  }),
})

export const {
  useSubscribeMutation,
  useAutoRenewalMutation,
  useCurrentSubscriptionQuery,
  useGetPaymentsQuery,
} = subscriptionApi
