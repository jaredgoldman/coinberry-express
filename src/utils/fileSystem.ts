const fs = require('fs')

type ActivationRecord = {
  [key: string]: {
    active: boolean
    points: number
  }
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
    [username]: {
      ...activationRecord[username],
      active: isActivated,
    },
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

export const queryPoints = (token: string) => {
  if (!fs.existsSync('activationRecord.json')) {
    fs.writeFileSync('activationRecord.json', '')
    return 0
  }

  const activationRecord: ActivationRecord = JSON.parse(
    fs.readFileSync('activationRecord.json', 'utf8')
  )

  if (activationRecord[token]) return activationRecord[token].points
}
