import { FC, ReactNode, useMemo, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import config from '../hackback.config'
import { ApplicationQuestion } from '../types/application'

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

const ApplicationForm: FC = () => {
  const [markAsSubmit, setMarkAsSubmit] = useState<boolean>(false)
  const { questions, questionOrder } = config
  const initialValues = useMemo(() => {
    const iv = {}
    questionOrder.forEach(qid => (iv[qid] = ''))
    return iv
  }, [questionOrder])
  const formFields = useMemo(
    () => questionOrder.map(id => <AppFormField question={questions[id]} key={id} id={id} />),
    [questions, questionOrder]
  )

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
    console.log(markAsSubmit)
    console.log(values)
  }

  return (
    <div>
      <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
        <Form>
          {formFields}
          <div className='mt-4 text-center flex flex-row justify-around'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
              onClick={() => {
                setMarkAsSubmit(false)
              }}>
              Save Without Submitting
            </button>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
              onClick={() => {
                setMarkAsSubmit(true)
              }}>
              Save & Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default ApplicationForm
