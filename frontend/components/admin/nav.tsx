import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface NavButtonProps {
  onClick: () => any
  active: boolean
  children?: ReactNode
}

const NavButton: FC<NavButtonProps> = (props: NavButtonProps) => {
  return (
    <button
      className={classNames(
        'px-10',
        'py-2',
        'font-semibold',
        'text-sm',
        props.active ? 'text-blue-600' : 'text-gray-700',
        props.active ? 'hover:text-blue-500' : 'hover:text-gray-500',
        'transition-colors'
      )}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}

interface AdminNavProps {
  onTabChange: (n: number) => any
  tabs: string[]
  curTab: number
}

const Nav: FC<AdminNavProps> = (props: AdminNavProps) => {
  return (
    <div className='col-span-2 bg-gray-100'>
      <div className='w-full max-w-2xl mx-auto flex items-center justify-evenly py-2'>
        {props.tabs.map((tab, idx) => (
          <NavButton active={idx === props.curTab} onClick={() => props.onTabChange(idx)} key={idx}>
            {tab}
          </NavButton>
        ))}
      </div>
    </div>
  )
}

export default Nav
