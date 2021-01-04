import { FC } from 'react'
import Head from 'next/head'
import config from '../hackback.config'

const FullscreenLoader: FC = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Head>
        <title>{config.eventName}: Loading...</title>
      </Head>
      <div className='flex flex-col items-center'>
        <h1 className='text-center font-bold text-3xl text-gray-800 tracking-tight'>
          {config.eventName}
        </h1>
        <div>
          <img src='/assets/loading.svg' alt='' className='w-7 mt-4' />
        </div>
      </div>
    </div>
  )
}

export default FullscreenLoader
