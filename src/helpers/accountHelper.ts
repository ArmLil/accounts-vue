import { AccountType } from '@/types/account'
import { RU } from '@/constants/accountTexts'

export const accountTypes = [
  { title: 'LDAP', value: AccountType.LDAP },
  { title: 'Локальная', value: AccountType.LOCAL },
]

const MAX_LABELS_LENGTH = 50
const MAX_LOGIN_LENGTH = 100
const MAX_PASSWORD_LENGTH = 100

export const parseLabels = (labelsString: string) => {
  if (!labelsString.trim()) return []

  return labelsString
    .split(';')
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
    .map((text) => ({ text }))
}

export const labelRules = [
  (v: string) => !v || v.length <= MAX_LABELS_LENGTH || RU.VALIDATION.MAX_LABELS_LENGTH,
]

export const typeRules = [(v: string) => !!v || RU.VALIDATION.TYPE_REQUIRED]

export const loginRules = [
  (v: string) => !!v?.trim() || RU.VALIDATION.LOGIN_REQUIRED,
  (v: string) => (v && v.length <= MAX_LOGIN_LENGTH) || RU.VALIDATION.LOGIN_MAX_LENGTH,
]

export const getPasswordRules = (type: AccountType) => {
  if (type === AccountType.LOCAL) {
    return [
      (v: string) => !!v?.trim() || RU.VALIDATION.PASSWORD_REQUIRED,
      (v: string) => (v && v.length <= MAX_PASSWORD_LENGTH) || RU.VALIDATION.PASSWORD_MAX_LENGTH,
    ]
  }
  return []
}
