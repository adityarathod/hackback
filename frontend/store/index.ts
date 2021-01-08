import { configureStore } from '@reduxjs/toolkit'

import authReducer, { authStateListener } from './slices/auth'
import applicantReducer from './slices/applicant'

const store = configureStore({
  reducer: {
    auth: authReducer,
    applicant: applicantReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState

authStateListener(store.dispatch)

export default store
