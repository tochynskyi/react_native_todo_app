import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './todoSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
	  user: userSlice,
	  todo: todoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch