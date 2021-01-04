const prompts = require('prompts')
const admin = require('firebase-admin')

async function loadServiceAccount() {
  console.log('Welcome to HackBack')
  console.log('Loading serviceacct.json and connecting to Firebase...')
  try {
    const acct = require('../serviceacct.json')
    return admin.initializeApp({credential: admin.credential.cert(acct)})
  } catch {
    throw new Error('Missing serviceacct.json. Stop.')
  }
}

async function createAdminAccount() {
  console.log('\nStep 1: Set up admin account')
  const response = await prompts([
    {
      type: 'text',
      name: 'email',
      message: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password'
    }
  ])
  if (!response.email || !response.password || response.email.trim().length === 0 || response.password.length === 0) {
    throw new Error("Can't leave email or password blank!")
  }
  console.log('Creating user...')
  const user = await admin.auth().createUser({
    email: response.email,
    password: response.password,
    emailVerified: true
  })
  console.log('Applying custom claims...')
  await admin.auth().setCustomUserClaims(user.uid, {admin: true})
}

async function main() {
  try {
    await loadServiceAccount()
    await createAdminAccount()
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
  console.log('Setup complete.')
}

main()