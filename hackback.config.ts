import { ApplicationQuestion } from './types/application'
import { HackBackConfig } from './types/config-file'

const questions: Record<string, ApplicationQuestion> = {
  fullName: {
    type: 'text',
    title: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
  phoneNumber: {
    type: 'text',
    title: 'Phone Number',
    placeholder: '555-555-5555',
    validationRegex: '^\\d{3}-\\d{3}-\\d{4}$',
    validationFeedback: 'This must be a valid phone number in the XXX-XXX-XXXX format.',
    required: true,
  },
  description: {
    type: 'text',
    title: 'I would describe myself as a ...',
    placeholder: 'Designer, Data Scientist, iOS Wizard, Hacker Extraordinaire',
    required: true,
  },
  essay: {
    type: 'text',
    title: 'What would you like to learn or get out of HackBack?',
    placeholder: '',
    essay: true,
    required: false,
  },
  isAdult: {
    type: 'bool',
    title:
      'Checking this box affirms that you are or will be 18 years or older by the time of the hackathon.',
    description: 'We are not legally allowed to host minors (those under 18) for HackBack 2021.',
    required: true,
    label: 'I will be 18 by the time of HackBack.',
  },
  dietaryRestrictions: {
    type: 'dropdown',
    title: 'Do you have any dietary restrictions?',
    description:
      'If you select "Other" and are accepted to HackBack, we will email you for details of your dietary restriction. If you have no such restrictions, please select "No dietary restrictions".',
    choices: ['No dietary restrictions', 'Vegan', 'Vegetarian', 'Other'],
    defaultChoice: 'No dietary restrictions',
    required: true,
  },
}

const questionOrder = [
  'fullName',
  'phoneNumber',
  'description',
  'essay',
  'isAdult',
  'dietaryRestrictions',
]

const config: HackBackConfig = {
  eventName: "HackBack '21",
  questionOrder,
  questions,
}

export default config
