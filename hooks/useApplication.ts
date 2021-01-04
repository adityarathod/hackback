import { useState, useEffect } from 'react'
import useAuth from './useAuth'
import firebase from '../services/firebase'
import { Application, AppStatus } from '../types/application'

interface UseApplication {
  status: AppStatus
  data: Application
  update: (data: Application) => Promise<void>
}

const useApplication = (): UseApplication => {
  const [status, setStatus] = useState<AppStatus>(null)
  const [application, setApplication] = useState<Application>(null)
  const { user } = useAuth()
  const getApplication = async () => {
    if (!user) return
    if (!user.emailVerified) {
      setStatus('unverified')
      setApplication(null)
      return
    }
    const docSnapshot = await firebase.firestore().collection('applications').doc(user.uid).get()
    if (!docSnapshot.exists) {
      setStatus('not started')
      setApplication(null)
    } else {
      const data = docSnapshot.data()
      setStatus(data.status || 'incomplete')
      setApplication(data as Application)
    }
  }
  useEffect(() => {
    getApplication()
  }, [user])
  const updateApplication = async (data: Application) => {
    console.log(data)
    if (!user || !user.emailVerified) return
    const docRef = await firebase.firestore().collection('applications').doc(user.uid)
    await docRef.set(data, { merge: true })
    setApplication(data)
  }
  return { status, data: application, update: updateApplication }
}

export default useApplication
