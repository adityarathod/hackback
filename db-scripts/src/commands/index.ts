import { Choice } from 'prompts'
import createAdminUser, { meta as cauMeta } from './create-admin-user'

export type Command = () => Promise<void>
export type CommandMetadata = { name: string; description?: string }

const commands: Command[] = [createAdminUser]
const meta: CommandMetadata[] = [cauMeta]

const choices: Choice[] = meta.map((cmd, idx) => ({
  title: cmd.name,
  description: cmd.description,
  value: idx,
}))

const resolver = (value: number): Command | null => {
  if (value < 0 || value >= commands.length) return null
  return commands[value]
}

export { choices, resolver }
