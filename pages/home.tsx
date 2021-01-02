import { FC } from 'react'
import ApplicationStatus from '../components/application-status'
import FullscreenLoader from '../components/fullscreen-loader'
import Navbar from '../components/navbar'
import useAuth from '../hooks/useAuth'

const Home: FC = () => {
  const { authInitialized, isAuth, isAdmin } = useAuth()
  if (!authInitialized) return <FullscreenLoader />
  return (
    <div>
      <Navbar />
      {!isAdmin && <ApplicationStatus />}
    </div>
  )
}

export default Home
