import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import ApplicationStatus from '../components/application-status'
import FullscreenLoader from '../components/fullscreen-loader'
import Navbar from '../components/navbar'
import AdminContainer from '../components/admin/container'

import { useSelector } from 'react-redux'
import { selectIsAdmin } from '../store/slices/auth'
import useAuthProtection from '../hooks/useAuthProtection'

const Home: FC = () => {
  const loading = useAuthProtection()
  const isAdmin = useSelector(selectIsAdmin)

  if (loading) return <FullscreenLoader />

  return (
    <div>
      <Head>
        <title>HackBack: Home</title>
      </Head>
      <Navbar />
      {!isAdmin && <ApplicationStatus />}
    </div>
  )
}

export default Home
