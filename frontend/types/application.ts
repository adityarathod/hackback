export type AppStatus =
  | 'unverified'
  | 'not started'
  | 'incomplete'
  | 'submitted'
  | 'accepted'
  | 'waitlisted'
  | 'rejected'
  | 'declined'

export interface TextQuestion {
  type: 'text'
  title: string
  required: boolean
  description?: string
  essay?: boolean
  charLimit?: number
  validationRegex?: string
  validationFeedback?: string
  placeholder: string
}

export interface BooleanQuestion {
  type: 'bool'
  title: string
  required: boolean
  description?: string
  label: string
}

export interface DropdownQuestion {
  type: 'dropdown'
  title: string
  required: boolean
  choices: string[]
  defaultChoice: string
  description?: string
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
