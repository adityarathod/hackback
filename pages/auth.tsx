import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import firebase from '../services/firebase'
import useAuth from '../hooks/useAuth'
import FullscreenLoader from '../components/fullscreen-loader'

const Auth: FC = () => {
  const { isAuth, authInitialized } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (isAuth) {
      if (router.query.to) router.replace(router.query.to as string)
      else router.replace('/home')
    }
  }, [isAuth])
  const login = () => firebase.auth().signInWithEmailAndPassword(username, password)
  const authForm = (
    <main className='px-4'>
      <div className='min-w-lg max-w-lg p-4 bg-white border border-gray-200 shadow-md rounded-md mx-auto mt-8'>
        <h1 className='text-center font-bold text-2xl text-gray-700'>Log in to HackBack</h1>
        <div className='pt-4 pb-2 flex flex-col items-center'>
          <input
            type='email'
            placeholder='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='my-2 w-2/3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4'
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='my-2 w-2/3 focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-sm text-gray-800 placeholder-gray-500 border border-gray-200 rounded-md py-2 px-4'
          />
          <button
            className='mt-4 py-2 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full'
            onClick={login}>
            Login
          </button>
        </div>
      </div>
    </main>
  )

  return (
    <div>
      <Head>
        <title>HackBack: Authenticate</title>
      </Head>
      {!authInitialized || isAuth ? <FullscreenLoader /> : authForm}
    </div>
  )
}

export default Auth
