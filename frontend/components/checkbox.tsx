import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

interface CheckboxProps {
  onChange?: (e: any) => unknown
  className?: string
  checked?: boolean
  disabled?: boolean
}

const Checkbox: FC<CheckboxProps> = (props: CheckboxProps) => {
  const [check, setCheck] = useState<boolean>(false)
  const onClick = e => {
    if (props.disabled) return
    if (props.onChange) props.onChange(e)
    setCheck(!check)
  }
  useEffect(() => setCheck(props.checked), [props.checked])
  return (
    <button
      className={classNames(
        'p-1',
        'rounded-md',
        'border',
        'border-gray-300',
        'w-5',
        'h-5',
        'flex',
        'items-center',
        'justify-center',
        'focus:outline-none',
        !props.disabled && 'focus:ring-2',
        'ring-blue-300',
        props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        !check && 'shadow-inner',
        'bg-white',
        check && 'bg-blue-600',
        check && 'border-blue-600',
        props.disabled && 'opacity-50',
        'text-white',
        props.className
      )}
      onClick={onClick}>
      {check && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          className='fill-current select-none'>
          <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z' />
        </svg>
      )}
    </button>
  )
}

export default Checkbox
