import { createSlice } from '@reduxjs/toolkit'
import { JwtPayload, jwtDecode } from 'jwt-decode'

import { RootState } from '@/application/appStore'

interface IInitialState {
  userId: number
  userName?: string
  email?: string
  accessToken?: string
}
interface MyJwtPayload extends JwtPayload {
  userId: string
}

const initialState: IInitialState = {
  userId: -1,
  userName: '',
  email: '',
  accessToken: '',
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.email = action.payload.email
      state.userId = action.payload.userId
      state.accessToken = action.payload.accessToken
    },
    clearLocalUserData: state => {
      state.accessToken = ''
      state.email = ''
      state.userId = -1
      localStorage.clear()
    },
    setUser: (state, { payload: { userName, email } }) => {
      state.userName = userName
      state.email = email
      state.accessToken = ''
      localStorage.setItem('email', email)
      localStorage.setItem('userId', '')
      localStorage.setItem('token', '')
    },
    setLoginUser: (state, { payload: { email, accessToken } }) => {
      const userId = jwtDecode<MyJwtPayload>(accessToken).userId

      state.email = email ? email : localStorage.getItem('email')

      state.accessToken = accessToken
      state.userId = +userId

      localStorage.setItem('userId', '' + userId)
      localStorage.setItem('email', email)
      localStorage.setItem('token', accessToken)
    },
  },
})

export const { addUser, clearLocalUserData, setUser, setLoginUser } = authSlice.actions

export const selectAuthUser = (state: RootState) => state.user

export default authSlice.reducer
