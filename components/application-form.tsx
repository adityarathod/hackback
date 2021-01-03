import { FC } from 'react'
import config from '../hackback.config'
import { BooleanQuestion, TextQuestion } from '../types/application'
import { BooleanQuestionInput, TextQuestionInput } from './question-inputs'

const ApplicationForm: FC = () => {
  const { applicationQuestions: questions } = config
  return (
    <div>
      {questions
        .filter(q => q.type === 'text' || q.type === 'bool')
        .map((q, idx) => {
          if (q.type === 'text') return <TextQuestionInput question={q as TextQuestion} key={idx} />
          else if (q.type === 'bool')
            return <BooleanQuestionInput question={q as BooleanQuestion} key={idx} />
        })}
    </div>
  )
}

export default ApplicationForm
