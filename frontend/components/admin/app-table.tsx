/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { FC } from 'react'
import { Column, useRowSelect, useTable } from 'react-table'
import { Application } from '../../types/application'
import classNames from 'classnames'

import Checkbox from '../checkbox'

interface AppTableProps {
  columns: Column<Application>[]
  data?: Application[]
}

const AppTable: FC<AppTableProps> = (props: AppTableProps) => {
  const table = useTable<Application>(
    {
      columns: props.columns,
      data: props.data || [],
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            console.log(row.getToggleRowSelectedProps())
            return (
              <div className='ml-4'>
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
        },
        ...columns,
      ])
    }
  )
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } = table

  return (
    <table {...getTableProps()} className='min-w-full leading-normal'>
      <thead>
        {headerGroups.map((group, idx) => {
          return (
            <tr
              {...group.getHeaderGroupProps()}
              key={idx}
              className='text-left border border-b-1 border-t-0 border-l-0 border-r-0 bg-gray-100'>
              {group.headers.map((col, idx) => (
                <th {...col.getHeaderProps()} key={idx} className={classNames('px-4 py-4')}>
                  {col.render('Header')}
                </th>
              ))}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row)
          return (
            <tr
              className='border border-b-1 border-t-0 border-l-0 border-r-0 border-gray-200 hover:bg-gray-100'
              key={idx}>
              {row.cells.map((cell, idx) => {
                return (
                  <td key={idx}>
                    <span>{cell.render('Cell')}</span>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AppTable
