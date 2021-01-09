import { FC } from 'react'
import AppGrid from './app-grid'

const AppManager: FC = () => {
  return (
    <div className='mt-4 max-w-4xl mx-auto p-4'>
      <h1 className='title font-bold text-3xl pb-3'>Manage Applications</h1>
      <AppGrid />
    </div>
  )
}

export default AppManager
