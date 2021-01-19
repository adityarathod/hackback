import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/auth'
import firebase from '../services/firebase'

const Auth: FC = () => {
  const { loading, user } = useSelector(selectAuth)
  const [error, setError] = useState<string>(null)
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (!loading && user) {
      if (router.query.to) router.replace(router.query.to as string)
      else router.replace('/home')
    }
  }, [loading])
  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }
  const authForm = (
    <div>
      <h1 className='text-center font-bold text-2xl text-gray-700'>Log in to HackBack</h1>
      {error && <div className='mt-2 py-4 px-4 text-white font-semibold bg-red-600'>{error}</div>}
      <form
        onSubmit={e => {
          login()
          e.preventDefault()
        }}
        className='pt-4 pb-2 flex flex-col items-center'>
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
          type='submit'
          className='mt-4 py-2 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full'
          onClick={login}>
          Login
        </button>
      </form>
    </div>
  )

  return (
    <div>
      <Head>
        <title>HackBack: Authenticate</title>
      </Head>
      <main className='px-4 w-full h-screen flex items-center justify-center bg-gray-700'>
        <div className='max-w-lg w-full p-4 bg-white border border-gray-200 shadow-md rounded-md'>
          {!loading && !user && authForm}
          {(loading || user) && (
            <div className='flex items-center justify-center'>
              <img src='/assets/loading.svg' alt='' className='w-7' />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Auth
