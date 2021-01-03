import { FC } from 'react'
import config from '../hackback.config'
import { TextQuestion } from '../types/application'
import { TextQuestionInput } from './question-inputs'

const ApplicationForm: FC = () => {
  const { applicationQuestions: questions } = config
  return (
    <div>
      {questions
        .filter(q => q.type === 'text')
        .map((tq, idx) => (
          <TextQuestionInput question={tq as TextQuestion} key={idx} />
        ))}
    </div>
  )
}

export default ApplicationForm
