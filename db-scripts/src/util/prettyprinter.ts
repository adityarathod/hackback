import kleur from 'kleur'

export const logError = (text: string): void => {
  const errText = kleur.bgRed().white().bold('  ERROR  ')
  console.log(`\n${errText} ${text}\n`)
}

export const logWarning = (text: string): void => {
  const errText = kleur.bgYellow().black().bold('  WARNING  ')
  console.log(`\n${errText} ${text}\n`)
}
