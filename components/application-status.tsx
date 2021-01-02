import { FC, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import firebase from '../services/firebase'

const ApplicationStatus: FC = () => {
  const [appStatus, setAppStatus] = useState('...')
  const { user } = useAuth()
  useEffect(() => {
    if (!user) return
    firebase
      .firestore()
      .collection('applications')
      .doc(user.uid)
      .get()
      .then(snapshot => {
        if (!snapshot.exists) setAppStatus('not started')
      })
  }, [user])
  if (!user) return null
  return (
    <div className='p-4 max-w-3xl mx-auto my-2 rounded-md bg-white shadow-md border border-gray-200'>
      <div className='flex flex-row my-2 items-center justify-between'>
        <span className='text-lg font-medium text-gray-800'>Application Status</span>
        <span className='text-lg font-medium text-white uppercase p-2 bg-gray-700'>
          {appStatus}
        </span>
      </div>
    </div>
  )
}

export default ApplicationStatus
