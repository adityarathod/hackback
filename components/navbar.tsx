import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import config from '../hackback.config'
import useAuth from '../hooks/useAuth'
import firebase from '../services/firebase'

const Navbar: FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const signOut = async () => {
    firebase.auth().signOut()
    router.push('/auth')
  }
  return (
    <div className='w-full shadow-md flex flex-row items-center bg-gray-800 text-white'>
      <Link href='/home'>
        <div className='title font-bold tracking-tight text-xl hover:bg-gray-900 cursor-pointer h-full py-4 px-4'>
          {config.eventName}
        </div>
      </Link>
      <div className='spacer flex-1'></div>
      <div className='p-4'>
        <span>{user && user.email}</span>
        <button className='ml-2 text-blue-400' onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Navbar
