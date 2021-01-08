import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/auth'

/**
 * Protects a route behind an auth wall.
 * @returns Whether or not you should display a loading screen.
 */
const useAuthProtection = (): boolean => {
  const router = useRouter()
  const { loading, user } = useSelector(selectAuth)

  if (loading) return true
  if (!user) {
    router.replace('/auth')
    return true
  }

  return false
}

export default useAuthProtection
