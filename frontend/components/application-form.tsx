import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, FormikProps, FormikHelpers } from 'formik'

import config from '../hackback.config'

import FormField from './form-field'

import { useDispatch, useSelector } from 'react-redux'
import { getApplication, selectApplicant, updateApplication } from '../store/slices/applicant'

const { questions, questionOrder } = config
const iv = {}
questionOrder.forEach(qid => (iv[qid] = ''))

const ApplicationForm: FC = () => {
  const [markAsSubmit, setMarkAsSubmit] = useState<boolean>(false)
  const { application: appData, loading, status } = useSelector(selectApplicant)
  const dispatch = useDispatch()
  const [initialVals, setInitialVals] = useState(iv)
  const router = useRouter()

  useEffect(() => {
    if (!status && !loading) {
      dispatch(getApplication())
    }
    if (appData) {
      const appDataModified = { ...appData }
      questionOrder
        .filter(id => questions[id].type === 'bool')
        .forEach(id => {
          if (appDataModified[id]) appDataModified[id] = ['checked']
          else appDataModified[id] = []
        })
      setInitialVals(appDataModified)
    }
  }, [appData])
  const formFields = questionOrder.map(id => (
    <FormField question={questions[id]} key={id} id={id} />
  ))

  const validate = formValues => {
    const errors = {}
    questionOrder.forEach(id => {
      const question = questions[id]
      const formVal = formValues[id]
      if (question.type === 'text') {
        if (question.required && formVal === '') {
          errors[id] = 'This question cannot be blank.'
        } else if (question.charLimit && formVal.length > question.charLimit) {
          errors[id] = `Please don't exceed ${question.charLimit} characters for this question.`
        } else if (
          question.validationRegex &&
          !new RegExp(question.validationRegex).test(formVal)
        ) {
          errors[id] = question.validationFeedback
            ? question.validationFeedback
            : "This doesn't match the expected format for this question."
        }
      } else if (question.type === 'bool') {
        if (question.required && formVal.length === 0) {
          errors[id] = 'This box must be checked.'
        }
      } else if (question.type === 'dropdown') {
        if (question.required && formVal === '') {
          errors[id] = 'You must pick a value.'
        }
      }
    })
    return errors
  }

  const submit = async values => {
    const data = { ...values }
    questionOrder
      .filter(id => questions[id].type === 'bool')
      .forEach(id => {
        data[id] = data[id].length > 0
      })
    dispatch(updateApplication({ app: data, submit: markAsSubmit }))
    router.push('/home')
  }

  return (
    <div>
      <Formik initialValues={initialVals} validate={validate} onSubmit={submit}>
        {(props: FormikProps<any>) => {
          useEffect(() => props.setValues(initialVals), [initialVals])
          useEffect(() => props.setSubmitting(loading), [loading])
          return (
            <Form>
              {formFields}
              <div className='mt-4 text-center flex flex-row justify-around'>
                {appData?.status !== 'submitted' && (
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50'
                    onClick={() => {
                      setMarkAsSubmit(false)
                    }}
                    disabled={props.isSubmitting || Object.keys(props.errors).length > 0}>
                    Save Without Submitting
                  </button>
                )}
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50'
                  onClick={() => {
                    setMarkAsSubmit(true)
                  }}
                  disabled={props.isSubmitting || Object.keys(props.errors).length > 0}>
                  {appData?.status !== 'submitted' ? 'Save & Submit' : 'Save & Update Application'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default ApplicationForm
