import { FC, ReactNode } from 'react'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import useApplication from '../hooks/useApplication'

const ApplicationStatus: FC = () => {
  const { status } = useApplication()
  const { user } = useAuth()
  let feedback: ReactNode
  switch (status) {
    case 'unverified':
      feedback = (
        <div className='max-w-md'>
          <p>
            Verify your email address by going into your email and clicking the verification link.
          </p>
          <p>
            <button
              className='text-blue-500 font-medium text-sm'
              onClick={() => user.sendEmailVerification()}>
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
            To be considered, please complete and submit your application before the deadline.
          </p>
          <p>
            <Link href='/application'>
              <a className='text-blue-500 font-medium text-sm'>Fill out your application &rarr;</a>
            </Link>
          </p>
        </div>
      )
      break
    case 'submitted':
      feedback = (
        <div>
          <p>
            Congrats, we&apos;ve receieved your application! Missed something? You can edit the
            application before the deadline.
          </p>
          <p>
            <Link href='/application'>
              <a className='text-blue-500 font-medium text-sm'>Edit your application &rarr;</a>
            </Link>
          </p>
        </div>
      )
      break
    default:
      feedback = <div></div>
  }
  return (
    <div className='p-4 max-w-3xl mx-auto my-2 rounded-md bg-white shadow-md border border-gray-200'>
      <div className='grid grid-cols-3 my-2 items-center justify-between'>
        <div className='col-span-2'>
          <div className='text-lg font-medium text-gray-800'>Application Status</div>
          {feedback}
        </div>
        <div className='flex flex-row items-center justify-end'>
          {status ? (
            <span className='text-lg font-medium text-white uppercase py-2 px-4 bg-gray-700 rounded-full select-none'>
              {status}
            </span>
          ) : (
            <img src='/assets/loading.svg' alt='' className='w-7' />
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationStatus
