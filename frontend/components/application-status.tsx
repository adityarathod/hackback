import { FC, ReactNode, useEffect } from 'react'
import Link from 'next/link'

import config from '../hackback.config'

import { useDispatch, useSelector } from 'react-redux'
import { getApplication, selectApplicant } from '../store/slices/applicant'
import firebase from '../services/firebase'
import StatusChip from './status-chip'
import { AppStatus } from '../types/application'

const ApplicationStatus: FC = () => {
  const { status, loading } = useSelector(selectApplicant)
  const dispatch = useDispatch()

  // If we haven't gotten the application status yet, go retrieve it
  useEffect(() => {
    if (!status && !loading) {
      dispatch(getApplication())
    }
  }, [status])

  const appsOpen = new Date() < config.applicationDeadline
  const decisionAvailable = new Date() >= config.decisionRelease
  const actualStatus: AppStatus = decisionAvailable
    ? status
    : status === 'accepted' || status === 'rejected' || status === 'waitlisted'
    ? 'submitted'
    : status

  let feedback: ReactNode
  switch (actualStatus) {
    case 'unverified':
      feedback = (
        <div className='max-w-md'>
          <p>
            Verify your email address by going into your email and clicking the verification link.
          </p>
          <p>
            <button
              className='text-blue-500 font-medium text-sm'
              onClick={() => firebase.auth().currentUser?.sendEmailVerification()}>
              Resend confirmation email &rarr;
            </button>
          </p>
        </div>
      )
      break
    case 'incomplete':
    case 'not started':
      feedback = (
        <div>
          <p>
            {status === 'incomplete'
              ? 'Your application is incomplete.'
              : "You hasn't started working on your application."}{' '}
            {appsOpen
              ? 'To be considered, please complete and submit your application before the deadline.'
              : 'Unfortunately, the application deadline has passed.'}
          </p>
          {appsOpen && (
            <p>
              <Link href='/application'>
                <a className='text-blue-500 font-medium text-sm'>
                  Fill out your application &rarr;
                </a>
              </Link>
            </p>
          )}
        </div>
      )
      break
    case 'submitted':
      feedback = (
        <div>
          <p>
            Congrats, we&apos;ve receieved your application!{' '}
            {appsOpen
              ? 'Missed something? You can edit the application before the deadline.'
              : "We'll be releasing decisions soon via email. You can also check here."}
          </p>
          {appsOpen && (
            <p>
              <Link href='/application'>
                <a className='text-blue-500 font-medium text-sm'>Edit your application &rarr;</a>
              </Link>
            </p>
          )}
        </div>
      )
      break
    default:
      feedback = (
        <div>
          <p>
            {!decisionAvailable && <span>Congrats, we&apos;ve receieved your application! </span>}
            {decisionAvailable
              ? 'Your decision is available to the right of this message.'
              : "We'll be releasing decisions soon via email. You can also check here."}
          </p>
          {decisionAvailable && status === 'accepted' && (
            <p>
              <Link href='/rsvp'>
                <a className='text-blue-500 font-medium text-sm'>Confirm your attendance &rarr;</a>
              </Link>
            </p>
          )}
        </div>
      )
  }
  return (
    <div className='p-4 max-w-3xl mx-auto my-2 rounded-md bg-white shadow-md border border-gray-200'>
      <div className='grid grid-cols-3 my-2 items-center justify-between'>
        <div className='col-span-2'>
          <div className='text-lg font-medium text-gray-800'>Application Status</div>
          {feedback}
        </div>
        <div className='flex flex-row items-center justify-end'>
          {actualStatus ? (
            <StatusChip status={actualStatus} big />
          ) : (
            <img src='/assets/loading.svg' alt='' className='w-7' />
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationStatus
