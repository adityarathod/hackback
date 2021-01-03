import { FC, useEffect, useState } from 'react'
import { TextQuestion } from '../types/application'

interface TextQuestionInputProps {
  question: TextQuestion
}

export const TextQuestionInput: FC<TextQuestionInputProps> = ({
  question,
}: TextQuestionInputProps) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  const [valRegex, setValRegex] = useState<RegExp>(null)
  useEffect(() => {
    if (question.validationRegex) {
      setValRegex(new RegExp(question.validationRegex))
    }
  }, [question])
  const change = e => setText(e.target.value)
  const validate = e => {
    if (question.required && e.target.value.length === 0) {
      setError('This question cannot be blank.')
    } else if (valRegex && !valRegex.test(e.target.value)) {
      setError(question.validationFeedback ? question.validationFeedback : 'Invalid value.')
    } else {
      setError(null)
    }
  }
  return (
    <div className='py-3'>
      <div className='mb-3'>
        <label htmlFor={question.label} className='text-md font-semibold block px-2'>
          {question.required ? '(required)' : '(optional)'} {question.label}
        </label>
        <label htmlFor={question.label} className='text-md font-semibold block px-2'>
          {question.notice}
        </label>
        <label
          htmlFor={question.label}
          className='text-md font-semibold text-red-500 block my-1 px-2'>
          {error}
        </label>
      </div>
      {question.essay ? (
        <textarea
          placeholder={question.placeholder}
          name={question.label}
          required={question.required}
          maxLength={question.charLimit}
          onChange={change}
          onBlur={validate}
          value={text}
          className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'></textarea>
      ) : (
        <input
          type='text'
          placeholder={question.placeholder}
          name={question.label}
          maxLength={question.charLimit}
          required={question.required}
          onChange={change}
          onBlur={validate}
          value={text}
          className='px-3 py-2 text-sm text-black placeholder-gray-400 border border-gray-200 w-full rounded-md'
        />
      )}
    </div>
  )
}
