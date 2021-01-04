import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import FullscreenLoader from '../components/fullscreen-loader'
import useAuth from '../hooks/useAuth'
import ApplicationForm from '../components/application-form'
import config from '../hackback.config'

const { applicationDeadline } = config

const Application: FC = () => {
  const { authInitialized, isAuth } = useAuth()
  const router = useRouter()
  const appsOpen = new Date() < applicationDeadline
  if (!authInitialized) return <FullscreenLoader />
  if (!isAuth) router.replace('/auth')
  return (
    <div>
      <Head>
        <title>HackBack: Apply</title>
      </Head>
      <Navbar />
      <main>
        <div className='mx-auto max-w-xl mt-8 mb-4 px-4'>
          <h1 className='title text-center font-bold text-3xl text-gray-700 mb-2'>Application</h1>
          {appsOpen ? (
            <div>
              <p className='text-center italic text-md text-black mb-6'>
                You&apos;ll be able to view & edit your submission up till the deadline.
              </p>
              <ApplicationForm />
            </div>
          ) : (
            <div className='mt-6 text-center'>
              Unforunately, you can&apos;t view or edit your application after the deadline.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Application
