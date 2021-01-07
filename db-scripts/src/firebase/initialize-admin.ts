import loadServiceAccount from '../util/serviceaccount'
import admin from 'firebase-admin'

const initializeAdmin = async (filePath: string): Promise<void> => {
  const acct = await loadServiceAccount(filePath)
  admin.initializeApp({ credential: admin.credential.cert(acct) })
}

export default initializeAdmin
