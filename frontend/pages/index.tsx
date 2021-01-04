import { FC } from 'react'
import Link from 'next/link'

const Index: FC = () => {
  return (
    <div className='text-center py-4'>
      <h1 className='text-4xl text-gray-700 font-bold'>HackBack</h1>
      <div className='py-4'>
        <Link href='/auth'>
          <a className='text-blue-500'>Auth Test</a>
        </Link>
      </div>
    </div>
  )
}

export default Index
