import admin from 'firebase-admin'

const createAdminAccount = async (email: string, password: string): Promise<void> => {
  if (admin.apps.length === 0) throw new Error('Firebase Admin not initialized')
  if (email.trim().length === 0) throw new Error("Can't leave email blank")
  if (password.length === 0) throw new Error("Can't leave password blank")
  const user = await admin.auth().createUser({
    email: email,
    password: password,
    emailVerified: true,
  })
  await assignAdminPrivs(user.uid)
}

export const assignAdminPrivs = async (uid: string): Promise<void> => {
  await admin.auth().setCustomUserClaims(uid, { admin: true })
}

export const clearAllPrivs = async (uid: string): Promise<void> => {
  await admin.auth().setCustomUserClaims(uid, null)
}

export default createAdminAccount
