import { useRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeAppStatus, getAppDetail, selectDetail } from '../../store/slices/admin'
import Navbar from '../../components/navbar'
import FullscreenLoader from '../../components/fullscreen-loader'
import useAuthProtection from '../../hooks/useAuthProtection'
import config from '../../hackback.config'
import StatusChip from '../../components/status-chip'
import { AppStatus } from '../../types/application'
import Checkbox from '../../components/checkbox'

const featuredQKeys = config.questionOrder.filter(key => !!config.questions[key].featured)
const headerKeys = [featuredQKeys[0], featuredQKeys[1]]
const detailQKeys = config.questionOrder.filter(key => !headerKeys.includes(key))

const ApplicationDetail: FC = () => {
  const loadingAuth = useAuthProtection()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const { loading, app, error } = useSelector(selectDetail)
  useEffect(() => {
    if (!query.id || loadingAuth) return
    else dispatch(getAppDetail(query.id as string))
  }, [query.id, loadingAuth])

  if (loadingAuth) return <FullscreenLoader />
  if (!query.id || error) return <Error statusCode={404} />

  return (
    <div>
      <Head>
        <title>HackBack: Home</title>
      </Head>
      <Navbar />
      {!loading && app && (
        <div className='mt-4 max-w-4xl mx-auto p-4'>
          <div className='mb-6 flex flex-row items-center justify-center w-full'>
            <button
              className='mx-2 w-32 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full'
              onClick={() => dispatch(changeAppStatus('accepted'))}>
              Accept
            </button>
            <button
              className='mx-2 w-32 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full'
              onClick={() => dispatch(changeAppStatus('rejected'))}>
              Reject
            </button>
            <button
              className='mx-2 w-32 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full'
              onClick={() => dispatch(changeAppStatus('waitlisted'))}>
              Waitlist
            </button>
            <button
              className='mx-2 w-32 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-full'
              onClick={() => dispatch(changeAppStatus('submitted'))}>
              Clear decision
            </button>
          </div>
          {/* Header */}
          <div className='flex flex-row items-center'>
            <div>
              <h1 className='title font-bold text-3xl'>{app[headerKeys[0]]}</h1>
              <h2 className='title text-gray-500 text-2xl mb-7'>{app[headerKeys[1]]}</h2>
            </div>
            <div className='flex-1'></div>
            <div className='mb-4'>
              <StatusChip status={app.status as AppStatus} />
            </div>
          </div>
          <div>
            {detailQKeys.map(key => {
              const q = config.questions[key]
              const ans = app[key]
              return (
                <div className='py-4' key={key}>
                  <h3 className='font-bold'>{q.title}</h3>
                  {q.description && <p className='text-gray-800 italic'>{q.description}</p>}
                  {q.type === 'bool' && (
                    <div className='mt-4 flex items-center'>
                      <Checkbox checked={ans} disabled />
                      <span className='ml-3'>{q.label}</span>
                    </div>
                  )}
                  {q.type !== 'bool' && <div className='mt-4'>{ans}</div>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ApplicationDetail
