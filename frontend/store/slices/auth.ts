import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import firebase from '../../services/firebase'
import { AppDispatch, RootState } from '..'
import UserInfo from '../../types/user-info'

export const handleAuthStateChange = createAsyncThunk(
  'auth/handleAuthStateChange',
  async (_user: firebase.User) => {
    console.log('change state')
    let admin = false
    let user: UserInfo = null
    if (_user) {
      user = { uid: _user.uid, email: _user.email, emailVerified: _user.emailVerified }
      try {
        const tokenResult = await _user.getIdTokenResult()
        admin = !!tokenResult.claims.admin
      } catch (err) {
        throw new Error(err.message as string)
      }
    }
    return { admin, user }
  }
)

// Create slice
type AuthSliceState = { loading: boolean; user: UserInfo; isAdmin: boolean; error: string }
const initialState: AuthSliceState = { loading: true, user: null, isAdmin: false, error: null }
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    setUser: (state, action: PayloadAction<firebase.User>) => ({
      ...state,
      user: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(handleAuthStateChange.pending, state => {
      return { ...state, error: null, loading: true }
    })
    builder.addCase(handleAuthStateChange.rejected, (state, action) => {
      return { ...state, error: action.error.message, loading: false }
    })
    builder.addCase(handleAuthStateChange.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
        loading: false,
        isAdmin: action.payload.admin,
        user: action.payload.user,
      }
    })
  },
})

// Event listeners
export const authStateListener = (dispatch: AppDispatch): void => {
  if (typeof window === 'undefined') return
  firebase.auth().onAuthStateChanged((user: firebase.User) => {
    dispatch(handleAuthStateChange(user))
  })
}

// Export selectors
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAuth = (state: RootState) => state.auth
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectAuthLoading = (state: RootState) => state.auth.loading
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectUser = (state: RootState) => state.auth.user
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectError = (state: RootState) => state.auth.error

// Export actions
export const { setAuthLoading, setUser } = authSlice.actions

// Export slice reducer
export default authSlice.reducer
