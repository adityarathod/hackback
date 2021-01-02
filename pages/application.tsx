import { FC } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import FullscreenLoader from '../components/fullscreen-loader'
import useAuth from '../hooks/useAuth'

const Application: FC = () => {
  const { authInitialized, isAuth } = useAuth()
  const router = useRouter()
  if (!authInitialized) return <FullscreenLoader />
  if (!isAuth) router.replace('/auth')
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Application
