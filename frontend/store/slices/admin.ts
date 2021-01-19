import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import firebase from '../../services/firebase'
import { AppDispatch, RootState } from '..'
import UserInfo from '../../types/user-info'
import { Application, AppStatus } from '../../types/application'
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
      if (!data.status || !data.id) throw new Error('Not an application object')
      return { ...data, status: data.status, id: data.id }
    })
    return docs
  }
)

export const getAppDetail = createAsyncThunk<Application, string, { state: RootState }>(
  'admin/getAppDetail',
  async (id, thunkAPI) => {
    const admin = selectIsAdmin(thunkAPI.getState())
    if (!admin) throw new Error('Non-admin attempting to access applications')
    const query = await firebase.firestore().collection('applications').doc(id)
    const querySnapshot = await query.get()
    if (!querySnapshot.exists) throw new Error('Application with given ID does not exist')
    const data = querySnapshot.data()
    if (!data.status || !data.id) throw new Error('Not an Application object')
    return querySnapshot.data() as Application
  }
)

export const changeAppStatus = createAsyncThunk<Application, AppStatus, { state: RootState }>(
  'admin/changeDetailAppStatus',
  async (newStatus, thunkAPI) => {
    const admin = selectIsAdmin(thunkAPI.getState())
    const detailApp = selectDetailApp(thunkAPI.getState())
    if (!admin) throw new Error('Non-admin attempting to change status of applications')
    if (!detailApp) throw new Error('No app selected')
    const query = await firebase.firestore().collection('applications').doc(detailApp.id)
    await query.set({ status: newStatus }, { merge: true })
    return { ...detailApp, status: newStatus }
  }
)

// Create slice
type AdminSliceState = {
  apps: {
    loading: boolean
    data: Application[]
    error: string
  }
  detail: {
    loading: boolean
    app: Application
    error: string
  }
}
const initialState: AdminSliceState = {
  apps: {
    loading: false,
    data: null,
    error: null,
  },
  detail: {
    loading: false,
    app: null,
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
    builder.addCase(getAppDetail.pending, state => {
      return { ...state, detail: { ...state.detail, error: null, loading: true } }
    })
    builder.addCase(getAppDetail.rejected, (state, action) => {
      return { ...state, detail: { ...state.detail, error: action.error.message, loading: false } }
    })
    builder.addCase(getAppDetail.fulfilled, (state, action) => {
      return {
        ...state,
        detail: { ...state.detail, error: null, loading: false, app: action.payload },
      }
    })
    builder.addCase(changeAppStatus.pending, state => {
      return { ...state, detail: { ...state.detail, error: null, loading: true } }
    })
    builder.addCase(changeAppStatus.rejected, (state, action) => {
      return { ...state, detail: { ...state.detail, error: action.error.message, loading: false } }
    })
    builder.addCase(changeAppStatus.fulfilled, (state, action) => {
      let newApps = null
      if (state.apps.data) {
        newApps = state.apps.data.map(app => {
          let newApp = { ...app }
          if (newApp.id === action.payload.id) newApp = action.payload
          return newApp
        })
      }
      return {
        ...state,
        detail: { ...state.detail, error: null, loading: false, app: action.payload },
        apps: {
          ...state.apps,
          data: newApps,
        },
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectDetail = (state: RootState) => state.admin.detail
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectDetailLoading = (state: RootState) => state.admin.detail.loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectDetailApp = (state: RootState) => state.admin.detail.app

// Export actions
// export const { setAuthLoading, setUser } = adminSlice.actions

// Export slice reducer
export default adminSlice.reducer
