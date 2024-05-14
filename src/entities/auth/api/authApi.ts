import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { clearLocalUserData, setLoginUser } from '@/entities/auth'
import { BACKEND_URL, BASE_WORK_URL } from '@/shared/constants/ext-urls'
import { consoleErrors } from '@/shared/lib'
import { IEmailBaseUrl, IEmailPassword, IEmailPasswordUser } from '@/shared/types'

// export const authGoogleApi = createApi({
//   reducerPath: 'authGoogle',
//   baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
//   tagTypes: ['User'],
//   endpoints: builder => ({
//     googleLogin: builder.mutation<any, string>({
//       query: code => ({
//         body: { code },
//         url: '/auth/google/login',
//         method: 'POST',
//       }),
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled

//           dispatch(setLoginUser({ email: data.email, accessToken: data.accessToken }))
//         } catch (error) {
//           const e = error as RTKError

//           if ('error' in e) {
//             consoleErrors(e.error)
//           } else console.error(e)
//         }
//       },
//     }),
//   }),
// })

// export const { useGoogleLoginMutation } = authGoogleApi

export const authApi = createApi({
  reducerPath: 'userAuth',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes: ['User'],
  endpoints: builder => ({
    registration: builder.mutation<any, IEmailPasswordUser>({
      query: body => ({
        body: body,
        url: '/auth/registration',
        method: 'POST',
      }),
    }),
    resendRegistrationLink: builder.mutation<any, IEmailBaseUrl>({
      query: ({ email, baseUrl }) => ({
        body: {
          email,
          baseUrl,
        },
        url: '/auth/registration-email-resending',
        method: 'POST',
      }),
    }),
    registrationConfirmation: builder.mutation<any, string | string[]>({
      query: code => ({
        body: { confirmationCode: code },
        url: '/auth/registration-confirmation',
        method: 'POST',
      }),
    }),
    login: builder.mutation<any, IEmailPassword>({
      query: ({ email, password }) => ({
        body: { email, password },
        url: '/auth/login',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(setLoginUser({ email: args.email, accessToken: data.accessToken }))
        } catch (error) {
          const e = error as RTKError

          if ('error' in e) {
            consoleErrors(e.error)
          } else console.error(e)
        }
      },
    }),

    loginAdmin: builder.mutation({
      query: credentials => ({
        url: '/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              loginAdmin(email: "${credentials.email}", password: "${credentials.password}") {
                logged
              }
            }
          `,
        }),
      }),
    }),

    refreshToken: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/update-tokens',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(setLoginUser({ accessToken: data.accessToken }))
        } catch (error) {
          const e = error as RTKError

          if ('error' in e) {
            consoleErrors(e.error)
          } else console.error(e)
        }
      },
    }),
    logOut: builder.mutation<any, string>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(clearLocalUserData())
      },
    }),
    sendCaptcha: builder.mutation({
      query: ({ email, recaptcha }) => ({
        body: { email, recaptcha },
        url: '/auth/password-recovery',
        method: 'POST',
      }),
    }),
    createNewPassword: builder.mutation({
      query: ({ newPassword, recoveryCode }) => ({
        body: { newPassword, recoveryCode },
        url: '/auth/new-password',
        method: 'POST',
      }),
    }),
    validCode: builder.mutation({
      query: ({ recoveryCode }) => ({
        body: { recoveryCode },
        url: '/auth/check-recovery-code',
        method: 'POST',
      }),
    }),

    googleLogin: builder.mutation<any, string>({
      query: code => ({
        body: { code },
        url: '/auth/google/login',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(setLoginUser({ email: data.email, accessToken: data.accessToken }))
        } catch (error) {
          const e = error as RTKError

          if ('error' in e) {
            consoleErrors(e.error)
          } else console.error(e)
        }
      },
    }),
  }),
})

export const {
  useRegistrationMutation,
  useRegistrationConfirmationMutation,
  useLoginMutation,
  useLoginAdminMutation,
  useSendCaptchaMutation,
  useCreateNewPasswordMutation,
  useValidCodeMutation,
  useResendRegistrationLinkMutation,
  useLogOutMutation,
  useRefreshTokenMutation,
  useGoogleLoginMutation,
} = authApi
