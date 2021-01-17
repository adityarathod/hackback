import { FC, useState } from 'react'
import classNames from 'classnames'

interface DropdownProps {
  name: string
  options: string[]
  onClick?: (option: string, idx: number) => unknown
}

const Dropdown: FC<DropdownProps> = ({ name, options, onClick = () => null }: DropdownProps) => {
  const [hover, setHover] = useState<boolean>(false)
  const selectChoice = (choice: string, idx: number) => {
    return null
  }
  const choices = options.map((opt, idx) => (
    <a
      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      onClick={() => selectChoice(opt, idx)}
      role='menuitem'
      key={idx}>
      {opt}
    </a>
  ))

  return (
    <div
      className='relative inline-block text-left'
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-200 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'>
          {name}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <div
        className={classNames(
          'origin-top-right',
          'absolute',
          'right-0',
          'mt-0',
          'w-40',
          'rounded-md',
          'shadow-lg',
          'bg-white',
          'ring-1',
          'ring-black',
          'ring-opacity-5',
          hover ? 'block' : 'hidden'
        )}>
        <div
          className='py-1 cursor-pointer'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='options-menu'
          onMouseOver={() => setHover(true)}>
          {choices}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
