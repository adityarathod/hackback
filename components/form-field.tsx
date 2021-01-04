import { FC, ReactNode } from 'react'
import { ErrorMessage, Field } from 'formik'
import { ApplicationQuestion } from '../types/application'
interface FormFieldProps {
  question: ApplicationQuestion
  id: string
  children?: ReactNode
}

const FormField: FC<FormFieldProps> = (props: FormFieldProps) => {
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

export default FormField
