import { FC } from 'react'
import classNames from 'classnames'

import { AppStatus } from '../types/application'

interface StatusChipProps {
  status: AppStatus
}

const StatusChip: FC<StatusChipProps> = ({ status }: StatusChipProps) => {
  return (
    <span
      className={classNames(
        'py-1',
        'px-3',
        'rounded-full',
        'text-sm',
        'font-semibold',
        status === 'incomplete' && 'bg-yellow-300',
        status === 'incomplete' && 'text-yellow-900',
        status === 'submitted' && 'bg-indigo-300',
        status === 'submitted' && 'text-indigo-900'
      )}>
      {status}
    </span>
  )
}

export default StatusChip
