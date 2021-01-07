import fs from 'fs'
import util from 'util'

const readFile = util.promisify(fs.readFile)

const loadServiceAccount = async (filePath: string): Promise<string> => {
  const path = filePath
  const data = await readFile(path, { encoding: 'utf-8' })
  return JSON.parse(data)
}

export default loadServiceAccount
