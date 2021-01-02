import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import firebase from '../services/firebase'

type AuthStatus = {
  isAuth: boolean
  authInitialized: boolean
  isAdmin: boolean
  user?: firebase.User
}

type AppStatus = 'unverified' | 'incomplete' | 'submitted' | 'accepted' | 'rejected'

const useAppStatus = (): AppStatus => {
  const [appStatus, setAppStatus] = useState<AppStatus>(null)
  const { user } = useAuth()
  const updateStatus = async () => {
    if (!user) return
    if (!user.emailVerified) {
      setAppStatus('unverified')
      return
    }
    const appSnapshot = await firebase.firestore().collection('applications').doc(user.uid).get()
    if (!appSnapshot.exists) {
      setAppStatus('incomplete')
    } else {
      const data = appSnapshot.data()
      if (data.status) setAppStatus(data.status)
      else setAppStatus('incomplete')
    }
  }
  useEffect(() => {
    updateStatus()
  }, [user, firebase])
  return appStatus
}

export default useAppStatus
