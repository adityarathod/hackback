import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import firebase from '../../services/firebase'
import { AppDispatch, RootState } from '..'
import UserInfo from '../../types/user-info'
import { Application } from '../../types/application'
import { selectIsAdmin } from './auth'

export const getNextApplicationPage = createAsyncThunk<Application[], number, { state: RootState }>(
  'admin/getNextApplicationPage',
  async (pageSize, thunkAPI) => {
    const admin = selectIsAdmin(thunkAPI.getState())
    if (!admin) throw new Error('Non-admin attempting to access applications')
    const data = selectAppsData(thunkAPI.getState())
    let query: firebase.firestore.Query<firebase.firestore.DocumentData>

    if (data) {
      const lastID = data[data.length - 1].id
      query = await firebase
        .firestore()
        .collection('applications')
        .orderBy('id')
        .startAfter(lastID)
        .limit(pageSize)
    } else {
      query = await firebase.firestore().collection('applications').orderBy('id').limit(pageSize)
    }
    const querySnapshot = await query.get()
    const docs = querySnapshot.docs.map<Application>(doc => {
      const data = doc.data()
      if (!data.status) throw new Error('Not an application object')
      return { ...data, status: data.status, id: data.id }
    })
    return docs
  }
)

// Create slice
type AdminSliceState = {
  apps: {
    loading: boolean
    data: Application[]
    error: string
  }
}
const initialState: AdminSliceState = {
  apps: {
    loading: false,
    data: null,
    error: null,
  },
}
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNextApplicationPage.pending, state => {
      return { ...state, apps: { ...state.apps, error: null, loading: true } }
    })
    builder.addCase(getNextApplicationPage.rejected, (state, action) => {
      return { ...state, apps: { ...state.apps, error: action.error.message, loading: false } }
    })
    builder.addCase(getNextApplicationPage.fulfilled, (state, action) => {
      let arr: Application[] = state.apps.data || []
      arr = [...arr, ...action.payload]
      return {
        ...state,
        apps: { ...state.apps, data: arr, error: null, loading: false },
      }
    })
  },
})

// Export selectors
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAdmin = (state: RootState) => state.admin
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectApps = (state: RootState) => state.admin.apps
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAppsLoading = (state: RootState) => state.admin.apps.loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAppsData = (state: RootState) => state.admin.apps.data

// Export actions
// export const { setAuthLoading, setUser } = adminSlice.actions

// Export slice reducer
export default adminSlice.reducer
