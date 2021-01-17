import { Application } from './types/application'

const apps: Application[] = [
  {
    description: 'CS student with interests in AI and ML',
    id: '4yEOQlayb8cAlUvgYcQLTSX5UuD3',
    phoneNumber: '123-456-1272',
    isAdult: true,
    dietaryRestrictions: 'No dietary restrictions',
    status: 'submitted',
    fullName: 'Grace Hopper',
    essay: 'Learning',
  },
  {
    phoneNumber: '555-555-5555',
    description: 'Big gaming fan looking to get into gamedev',
    essay: 'yummy food sounds nice :))',
    id: 'Sv7Ep67UTCfzOAWHyV8bljZHZlz1',
    dietaryRestrictions: 'Vegan',
    isAdult: true,
    fullName: 'Richard Hendricks',
    status: 'submitted',
  },
  {
    essay: 'hi!',
    fullName: 'Donald Knuth',
    id: 'blDdrDhtPtMBppf33vSIIDIvUUw1',
    isAdult: true,
    dietaryRestrictions: 'No dietary restrictions',
    status: 'submitted',
    description: 'Photography nerd',
    phoneNumber: '555-555-5555',
  },
  {
    dietaryRestrictions: 'Other',
    fullName: 'Jeff Dean',
    isAdult: true,
    essay: 'Meet sponsors and secure FAANG internship',
    id: 'lN3Tvy0Kh4TwACE6Rfm4V0CNR9j1',
    description: 'ACM (Cult) Member',
    phoneNumber: '789-123-4567',
    status: 'submitted',
  },
]

export default apps
