export type AppStatus =
  | 'unverified'
  | 'not started'
  | 'incomplete'
  | 'submitted'
  | 'accepted'
  | 'rsvped'
  | 'waitlisted'
  | 'rejected'
  | 'declined'

interface Question {
  // Type of the question
  type: string
  // Name of this question as displayed to the user.
  name: string
  // The short title of this question when displayed to admins.
  title: string
  // Whether or not this question requires an answer.
  required: boolean
  // A description of this question below the question title.
  description?: string
  // Whether or not the question should be displayed initially in the admin view.
  featured?: boolean
}

export type TextQuestion = Question & {
  type: 'text'
  essay?: boolean
  charLimit?: number
  validationRegex?: string
  validationFeedback?: string
  placeholder: string
}

export type BooleanQuestion = Question & {
  type: 'bool'
  label: string
}

export type DropdownQuestion = Question & {
  type: 'dropdown'
  choices: string[]
  defaultChoice: string
}

export interface TextAnswer {
  type: 'text'
  value: string
}

export interface BooleanAnswer {
  type: 'bool'
  value: boolean
}

export interface DropdownAnswer {
  type: 'dropdown'
  value: string
}

export type ApplicationQuestion = TextQuestion | BooleanQuestion | DropdownQuestion
export type ApplicationAnswer = TextAnswer | BooleanAnswer | DropdownAnswer

export interface Application {
  status: AppStatus
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export type ApplicationWithoutStatus = Omit<Application, 'status'>
