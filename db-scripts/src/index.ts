import prompts from 'prompts'
import kleur from 'kleur'
import initializeAdmin from './firebase/initialize-admin'
import { logError } from './util/prettyprinter'
import { choices, resolver } from './commands'

async function loadCreds() {
  const { path } = await prompts({
    type: 'text',
    name: 'path',
    message: 'Path to Firebase service account',
    initial: './serviceacct.json',
  })
  try {
    await initializeAdmin(path)
  } catch (err) {
    logError('Had a problem initializing Firebase from the service account file.')
    process.exit(1)
  }
}

async function displayMenu() {
  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: 'CLI Menu: Pick an option',
    choices: [
      ...choices,
      {
        title: '👋 Exit',
        description: 'Exit the CLI',
        value: -1,
      },
    ],
  })
  const fn = resolver(choice)
  if (!fn) {
    console.log('Bye!')
    process.exit(0)
  }
  await fn()
}

async function main() {
  console.log(kleur.bold().cyan('HackBack DB CLI'))
  await loadCreds()
  while (true) {
    await displayMenu()
  }
}

main()
