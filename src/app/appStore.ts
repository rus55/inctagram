import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { authReducer, authApi } from '../entities/auth'

import { appSlice, postSlice } from '@/app/services'
import { croppersSlice } from '@/app/services/cropper-slice'
import { countriesApi } from '@/entities/countries/'
import { postsApi } from '@/entities/posts'
import { profileApi } from '@/entities/profile'
import { publicPostsApi } from '@/entities/publicPosts'
import {adminSlice} from "@/app/services/admin-slice";

const store = configureStore({
  reducer: {
    user: authReducer,
    [appSlice.name]: appSlice.reducer,
    [postSlice.name]: postSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [croppersSlice.name]: croppersSlice.reducer,
    [adminSlice.name]:adminSlice.reducer,
    // [authGoogleApi.reducerPath]: authGoogleApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [publicPostsApi.reducerPath]: publicPostsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      // authGoogleApi.middleware,
      profileApi.middleware,
      countriesApi.middleware,
      publicPostsApi.middleware,
      postsApi.middleware
    ),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
