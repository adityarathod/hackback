import { useState, useEffect } from 'react'
import firebase from '../services/firebase'

type AuthStatus = {
  isAuth: boolean
  authInitialized: boolean
  isAdmin: boolean
  user?: firebase.User
}

const useAuth = (): AuthStatus => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuth: false,
    authInitialized: false,
    isAdmin: undefined,
  })
  const handleStateChange = (user: firebase.User) => {
    const newStatus: AuthStatus = { ...authStatus, authInitialized: true, isAuth: !!user }
    if (user) {
      user.getIdTokenResult().then(tokenResult => {
        newStatus.isAdmin = !!tokenResult.claims.admin
        newStatus.user = user
        setAuthStatus(newStatus)
      })
    } else {
      setAuthStatus(newStatus)
    }
  }
  useEffect(() => firebase.auth().onAuthStateChanged(handleStateChange), [firebase])
  return authStatus
}

export default useAuth
