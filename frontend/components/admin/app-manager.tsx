/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { FC, useEffect, useMemo } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import config from '../../hackback.config'
import { Application, AppStatus } from '../../types/application'
import { Column } from 'react-table'

import AppTable from './app-table'
import StatusChip from '../status-chip'

import { useDispatch, useSelector } from 'react-redux'
import { getNextApplicationPage, selectApps } from '../../store/slices/admin'

const AppManager: FC = () => {
  const columns = useMemo(() => {
    // 1. Get only keys of featured questions
    const featuredQKeys = config.questionOrder.filter(key => !!config.questions[key].featured)
    // 2. Generate column entries for featured questions
    const featuredCols = featuredQKeys.map<Column<Application>>((key, idx) => ({
      Header: config.questions[key].name,
      accessor: key,
      Cell: ({ value }) => (
        <div
          className={classNames(
            'pl-4',
            idx === 0 && 'py-4',
            idx === 0 && 'font-semibold',
            idx !== 0 && 'text-gray-600',
            idx !== 0 && 'hidden sm:hidden md:block'
          )}>
          <span>{value}</span>
        </div>
      ),
    }))
    // 3. Add column entry for status
    const status: Column<Application> = {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <div>
          <StatusChip status={value as AppStatus} />
        </div>
      ),
    }
    // 4. Add column entry for detail view
    const detail: Column<Application> = {
      Header: '',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className='px-4 w-max'>
          <Link href={`/details/${value}`}>
            <a className='text-blue-500 font-semibold'>View &rarr;</a>
          </Link>
        </div>
      ),
    }
    // 5. Return an array of all columns
    return [...featuredCols, status, detail]
  }, [])

  // Get data from Redux
  const { data, loading } = useSelector(selectApps)
  const dispatch = useDispatch()
  const table = useMemo(() => <AppTable columns={columns} data={data} />, [columns, data])

  useEffect(() => {
    if ((!data || data.length === 0) && !loading) {
      dispatch(getNextApplicationPage(1))
    }
  }, [data, loading])

  return (
    <div className='mt-4 max-w-4xl mx-auto p-4'>
      <h1 className='title font-bold text-3xl pb-3'>Manage Applications</h1>
      <div className='shadow'>{table}</div>
      <button
        className='py-2 px-4 rounded-full bg-blue-400 text-white mt-4 focus:outline-none focus:bg-blue-500 focus:ring-2'
        onClick={() => dispatch(getNextApplicationPage(1))}>
        Next &rarr;
      </button>
    </div>
  )
}

export default AppManager
