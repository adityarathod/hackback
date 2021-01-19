import { FC } from 'react'
import classNames from 'classnames'

import { AppStatus } from '../types/application'

interface StatusChipProps {
  status: AppStatus
  big?: boolean
}

const StatusChip: FC<StatusChipProps> = ({ status, big = false }: StatusChipProps) => {
  return (
    <span
      className={classNames(
        big ? 'py-2' : 'py-1',
        big ? 'px-5' : 'px-3',
        'rounded-full',
        big ? 'text-lg' : 'text-sm',
        'font-semibold',
        status === 'incomplete' && 'bg-gray-300',
        status === 'incomplete' && 'text-gray-900',
        status === 'submitted' && 'bg-indigo-300',
        status === 'submitted' && 'text-indigo-900',
        status === 'accepted' && 'bg-green-300',
        status === 'accepted' && 'text-green-900',
        status === 'rejected' && 'bg-red-300',
        status === 'rejected' && 'text-red-900',
        status === 'waitlisted' && 'bg-yellow-300',
        status === 'waitlisted' && 'text-yellow-900'
      )}>
      {status}
    </span>
  )
}

export default StatusChip
