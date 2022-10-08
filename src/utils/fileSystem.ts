const fs = require('fs')

type ActivationRecord = {
  [key: string]: boolean
}

export const updateActivationRecord = (
  username: string,
  isActivated: boolean
): void => {
  if (!fs.existsSync('activationRecord.json')) {
    fs.writeFileSync('activationRecord.json', '')
  }

  const activationRecord: ActivationRecord = JSON.parse(
    fs.readFileSync('activationRecord.json', 'utf8')
  )

  const updateActivationRecord: ActivationRecord = {
    ...activationRecord,
    [username]: isActivated,
  }

  fs.writeFileSync(
    'activationRecord.json',
    JSON.stringify(updateActivationRecord)
  )
}

export const checkForActivation = (token: string): boolean | undefined => {
  if (!fs.existsSync('activationRecord.json')) {
    fs.writeFileSync('activationRecord.json', '')
    return false
  }

  const activationRecord: ActivationRecord = JSON.parse(
    fs.readFileSync('activationRecord.json', 'utf8')
  )

  if (activationRecord[token]) return true
}
