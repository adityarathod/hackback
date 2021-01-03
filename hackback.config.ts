import { ApplicationQuestion } from './types/application'
import { HackBackConfig } from './types/config-file'

const application: ApplicationQuestion[] = [
  {
    type: 'text',
    label: 'Phone Number',
    placeholder: '555-555-5555',
    validationRegex: '\\d{3}-\\d{3}-\\d{4}',
    validationFeedback: 'This must be a valid phone number in the XXX-XXX-XXXX format.',
    required: true,
  },
  {
    type: 'text',
    label: 'I would describe myself as a ...',
    placeholder: 'Designer, Data Scientist, iOS Wizard, Hacker Extraordinaire',
    required: true,
  },
  {
    type: 'text',
    label: 'What would you like to learn or get out of HackBack?',
    placeholder: '',
    essay: true,
    required: false,
  },
  {
    type: 'bool',
    label:
      'Checking this box affirms that you are or will be 18 years or older by the time of the hackathon.',
    notice: 'We are not legally allowed to host minors (those under 18) for HackBack 2021.',
    required: true,
  },
  {
    type: 'dropdown',
    label: 'Do you have any dietary restrictions?',
    notice:
      'If you select "Other" and are accepted to HackBack, we will email you for details of your dietary restriction.',
    choices: ['No dietary restrictions', 'Vegan', 'Vegetarian', 'Other'],
    defaultChoice: 0,
    required: true,
  },
]

const config: HackBackConfig = {
  eventName: "HackBack '21",
  applicationQuestions: application,
}

export default config
