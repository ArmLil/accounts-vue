export interface AccountLabel {
  text: string
}

export enum AccountType {
  LDAP = 'LDAP',
  LOCAL = 'local',
}

export interface Account {
  id: string
  labels: AccountLabel[]
  type: AccountType
  login: string
  password: string | null
}

export interface AccountFormData {
  labelsString: string
  type: AccountType
  login: string
  password: string
}
