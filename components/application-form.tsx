import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage, FormikProps, FormikHelpers } from 'formik'
import config from '../hackback.config'
import { ApplicationQuestion } from '../types/application'
import useApplication from '../hooks/useApplication'

interface AppFormFieldProps {
  question: ApplicationQuestion
  id: string
  children?: ReactNode
}

const AppFormField: FC<AppFormFieldProps> = (props: AppFormFieldProps) => {
  let widget: ReactNode
  if (props.question.type === 'text') {
    widget = (
      <Field
        type='text'
        as={props.question.essay ? 'textarea' : 'input'}
        name={props.id}
        placeholder={props.question.placeholder}
        className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'
      />
    )
  } else if (props.question.type === 'bool') {
    widget = (
      <label htmlFor={props.id} className='block px-2'>
        <Field type='checkbox' name={props.id} value='checked' className='mr-2' />
        {props.question.label}
      </label>
    )
  } else {
    widget = (
      <Field
        as='select'
        name={props.id}
        className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'>
        <option value=''>Pick a value</option>
        {props.question.choices.map((choice, idx) => (
          <option value={choice} key={idx}>
            {choice}
          </option>
        ))}
      </Field>
    )
  }
  return (
    <div className='py-2'>
      <div className='my-3'>
        <label htmlFor={props.id} className='text-md font-semibold block px-2'>
          {props.question.title}
          {props.question.required ? '*' : ' (optional)'}
        </label>
        <label htmlFor={props.id} className='text-sm block px-2'>
          {props.question.description}
        </label>
        <ErrorMessage name={props.id} component='div' className='px-2 font-medium text-red-500' />
      </div>
      {widget}
    </div>
  )
}

const { questions, questionOrder } = config
const iv = {}
questionOrder.forEach(qid => (iv[qid] = ''))

const ApplicationForm: FC = () => {
  const [markAsSubmit, setMarkAsSubmit] = useState<boolean>(false)
  const { data: appData, update } = useApplication()
  const [initialVals, setInitialVals] = useState(iv)
  const router = useRouter()
  useEffect(() => {
    if (appData) setInitialVals(appData)
  }, [appData])
  const formFields = questionOrder.map(id => (
    <AppFormField question={questions[id]} key={id} id={id} />
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

  const submit = async (values, helpers: FormikHelpers<any>) => {
    helpers.setSubmitting(true)
    await update({ ...values, status: markAsSubmit ? 'submitted' : 'incomplete' })
    helpers.setSubmitting(false)
    if (markAsSubmit) router.push('/home')
  }

  return (
    <div>
      <Formik initialValues={initialVals} validate={validate} onSubmit={submit}>
        {(props: FormikProps<any>) => {
          useEffect(() => props.setValues(initialVals), [initialVals])
          return (
            <Form>
              {formFields}
              <div className='mt-4 text-center flex flex-row justify-around'>
                {appData && appData.status !== 'submitted' && (
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                      setMarkAsSubmit(false)
                    }}
                    disabled={props.isSubmitting}>
                    Save Without Submitting
                  </button>
                )}
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                  onClick={() => {
                    setMarkAsSubmit(true)
                  }}
                  disabled={props.isSubmitting}>
                  {appData && appData.status !== 'submitted'
                    ? 'Save & Submit'
                    : 'Save & Update Application'}
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
