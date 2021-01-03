import { FC, ReactNode } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import config from '../hackback.config'
import { ApplicationQuestion } from '../types/application'

interface AppFormFieldProps {
  question: ApplicationQuestion
  id: string
  children?: ReactNode
}

const AppFormField: FC<AppFormFieldProps> = (props: AppFormFieldProps) => {
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
      {props.children}
    </div>
  )
}

const ApplicationForm: FC = () => {
  const { questions, questionOrder } = config
  const initialValues = {}
  questionOrder.forEach(qid => (initialValues[qid] = ''))

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
  const formFields = questionOrder.map(id => {
    const question = questions[id]
    switch (question.type) {
      case 'text':
        return (
          <AppFormField question={question} key={id} id={id}>
            <Field
              type='text'
              as={question.essay ? 'textarea' : 'input'}
              name={id}
              placeholder={question.placeholder}
              className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'
            />
          </AppFormField>
        )
      case 'bool':
        return (
          <AppFormField question={question} key={id} id={id}>
            <label htmlFor={id} className='block px-2'>
              <Field type='checkbox' name={id} value='checked' className='mr-2' />
              {question.label}
            </label>
          </AppFormField>
        )
      case 'dropdown':
        return (
          <AppFormField question={question} key={id} id={id}>
            <Field
              as='select'
              name={id}
              className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'>
              <option value=''>Pick a value</option>
              {question.choices.map((choice, idx) => (
                <option value={choice} key={idx}>
                  {choice}
                </option>
              ))}
            </Field>
          </AppFormField>
        )
    }
  })
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={values => console.log(values)}>
        <Form>
          {formFields}
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  )
}

export default ApplicationForm
