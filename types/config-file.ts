import { ApplicationQuestion } from './application'

export type HackBackConfig = {
  eventName: string
  questionOrder: string[]
  questions: Record<string, ApplicationQuestion>
  applicationDeadline: Date
}
