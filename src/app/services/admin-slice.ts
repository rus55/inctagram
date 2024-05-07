import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../appStore'
type InitType = {
  isAdmin: boolean
}

const initialState: InitType = {
  isAdmin: false,
}

export const adminSlice = createSlice({
  initialState,
  name: 'adminSlice',
  reducers: {
    isAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
  },
})
export const { isAdmin } = adminSlice.actions
export const selectIsAdmin = (state: RootState) => state.adminSlice.isAdmin
