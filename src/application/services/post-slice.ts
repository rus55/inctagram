import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../appStore'
type InitType = {
  textOfTextarea: string
}

const initialState: InitType = {
  textOfTextarea: '',
}

export const postSlice = createSlice({
  initialState,
  name: 'postSlice',
  reducers: {
    setTextOfTextarea: (state, action: PayloadAction<string>) => {
      state.textOfTextarea = action.payload
    },
  },
})
export const { setTextOfTextarea } = postSlice.actions
