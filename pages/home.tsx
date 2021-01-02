import { FC } from 'react'
import { useRouter } from 'next/router'
import ApplicationStatus from '../components/application-status'
import FullscreenLoader from '../components/fullscreen-loader'
import Navbar from '../components/navbar'
import useAuth from '../hooks/useAuth'

const Home: FC = () => {
  const { authInitialized, isAuth, isAdmin } = useAuth()
  const router = useRouter()
  if (!authInitialized) return <FullscreenLoader />
  if (!isAuth) router.replace('/auth')
  return (
    <div>
      <Navbar />
      {!isAdmin && <ApplicationStatus />}
    </div>
  )
}

export default Home
