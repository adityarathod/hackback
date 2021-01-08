import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import firebase from '../../services/firebase'
import { RootState } from '..'
import { Application, AppStatus } from '../../types/application'
import { selectUser } from './auth'

export const getApplication = createAsyncThunk<
  { app: Application; status: AppStatus },
  void,
  { state: RootState }
>('applicant/getApplication', async (_, thunkAPI) => {
  const user = selectUser(thunkAPI.getState())
  if (!user) return
  if (!user.emailVerified) {
    return { app: null, status: 'unverified' }
  }
  const docSnapshot = await firebase.firestore().collection('applications').doc(user.uid).get()
  if (!docSnapshot.exists) {
    return { app: null, status: 'not started' }
  } else {
    const data = docSnapshot.data()
    return { app: data as Application, status: data.status || 'incomplete' }
  }
})

// Create slice
type ApplicantSliceState = {
  loading: boolean
  status: AppStatus
  application: Application
  error: string
}
const initialState: ApplicantSliceState = {
  loading: true,
  status: null,
  application: null,
  error: null,
}
const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getApplication.pending, state => ({ ...state, error: null, loading: true }))
    builder.addCase(getApplication.rejected, (state, action) => ({
      ...state,
      error: action.error.message,
      loading: false,
    }))
    builder.addCase(getApplication.fulfilled, (state, action) => ({
      ...state,
      error: null,
      loading: false,
      status: action.payload.status,
      application: action.payload.app,
    }))
  },
})

// Export selectors
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectApplicant = (state: RootState) => state.applicant
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectApplicantLoading = (state: RootState) => state.applicant.loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectApplicantStatus = (state: RootState) => state.applicant.status
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectApplication = (state: RootState) => state.applicant.application

// Export actions
// there's no actions here

// Export slice reducer
export default applicantSlice.reducer
