import { configureStore } from '@reduxjs/toolkit'

import authReducer, { authStateListener } from './slices/auth'
import applicantReducer from './slices/applicant'
import adminReducer from './slices/admin'

const store = configureStore({
  reducer: {
    auth: authReducer,
    applicant: applicantReducer,
    admin: adminReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GetState = typeof store.getState

authStateListener(store.dispatch)

export default store
