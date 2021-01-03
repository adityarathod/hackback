import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import FullscreenLoader from '../components/fullscreen-loader'
import useAuth from '../hooks/useAuth'
import ApplicationForm from '../components/application-form'

const Application: FC = () => {
  const { authInitialized, isAuth } = useAuth()
  const router = useRouter()
  if (!authInitialized) return <FullscreenLoader />
  if (!isAuth) router.replace('/auth')
  return (
    <div>
      <Head>
        <title>HackBack: Apply</title>
      </Head>
      <Navbar />
      <main>
        <div className='mx-auto max-w-xl mt-8 mb-4 px-2'>
          <h1 className='title text-center font-bold text-3xl text-gray-700 mb-6'>Application</h1>
          <ApplicationForm />
        </div>
      </main>
    </div>
  )
}

export default Application
