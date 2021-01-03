export type AppStatus =
  | 'unverified'
  | 'incomplete'
  | 'submitted'
  | 'accepted'
  | 'waitlisted'
  | 'rejected'
  | 'declined'

export interface TextQuestion {
  type: 'text'
  label: string
  required: boolean
  notice?: string
  essay?: boolean
  charLimit?: number
  validationRegex?: string
  validationFeedback?: string
  placeholder: string
}

export interface BooleanQuestion {
  type: 'bool'
  label: string
  required: boolean
  notice?: string
  placeholder: string
}

export interface DropdownQuestion {
  type: 'dropdown'
  label: string
  required: boolean
  choices: string[]
  defaultChoice: string
  notice?: string
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
