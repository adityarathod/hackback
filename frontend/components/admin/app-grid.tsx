import { FC, useEffect } from 'react'
import { useTable } from 'react-table'

import config from '../../hackback.config'

import { useDispatch, useSelector } from 'react-redux'
import { getNextApplicationPage, selectApps } from '../../store/slices/admin'

const AppGrid: FC = () => {
  const cols = [...config.questionOrder, 'status']
  const { data, loading } = useSelector(selectApps)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(getNextApplicationPage(1))
    }
  }, [data])

  return (
    <div>
      <div>
        {data &&
          data.map((app, idx) => (
            <p key={idx} className='py-2'>
              {JSON.stringify(app)}
            </p>
          ))}
      </div>
      <button onClick={() => dispatch(getNextApplicationPage(1))}>Next &rarr;</button>
    </div>
  )
}

export default AppGrid
