import prompts from 'prompts'
import { Command, CommandMetadata } from '.'
import createAdminAccount from '../firebase/admin-account'
import { logError } from '../util/prettyprinter'

export const meta: CommandMetadata = {
  name: 'Create admin user',
}
const createAdminUser: Command = async () => {
  const { username, password } = await prompts([
    {
      type: 'text',
      name: 'username',
      message: 'Enter email for admin user',
      validate: inp => {
        if (inp.trim().length === 0) return "Email address can't be empty."
        else return true
      },
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password for admin user',
      validate: inp => {
        if (inp.length === 0) return "Password can't be empty."
        else if (inp.length < 6) return 'Password must be at least 6 characters.'
        else return true
      },
    },
  ])
  if (!username || !password) {
    logError("We can't have empty username/password.")
  }
  console.log(`Creating user ${username}...`)
  try {
    await createAdminAccount(username, password)
    console.log('Done.')
  } catch (err) {
    logError(`Something went wrong: ${err.message}`)
  }
}

export default createAdminUser
