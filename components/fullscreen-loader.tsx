import { FC } from 'react'

const FullscreenLoader: FC = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='text-center font-bold text-3xl text-gray-800 tracking-tight'>HackBack</h1>
        <div>
          <img src='/assets/loading.svg' alt='' className='w-7 mt-4' />
        </div>
      </div>
    </div>
  )
}

export default FullscreenLoader
