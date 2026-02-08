import axios from 'axios'
import { AccountType, type AccountFormData, type Account } from '@/types/account'
import { parseLabels } from '@/helpers/accountHelper'

const API_URL = 'http://127.0.0.1:3000'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

export const accountsApi = {
  async getAll(): Promise<Account[]> {
    try {
      const response = await api.get<Account[]>('/accounts')
      return response.data
    } catch (error) {
      console.error('Get all accounts error:', error)
      throw error
    }
  },

  async create(data: AccountFormData): Promise<Account> {
    try {
      const accountData = {
        labels: parseLabels(data.labelsString),
        type: data.type,
        login: data.login,
        password: data.type === AccountType.LOCAL ? data.password : null,
      }

      const response = await api.post<Account>('/accounts', accountData)
      return response.data
    } catch (error) {
      console.error('Account create error:', error)
      throw error
    }
  },

  async update(id: string, data: AccountFormData): Promise<Account> {
    try {
      const accountData = {
        labels: parseLabels(data.labelsString),
        type: data.type,
        login: data.login,
        password: data.type === AccountType.LOCAL ? data.password : null,
      }

      const response = await api.put<Account>(`/accounts/${id}`, accountData)
      return response.data
    } catch (error) {
      console.error('Account update error:', error)
      throw error
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/accounts/${id}`)
    } catch (error) {
      console.error('Account delete error:', error)
      throw error
    }
  },

  parseLabels,
}
