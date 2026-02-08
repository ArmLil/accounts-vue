import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account, AccountFormData } from '@/types/account'
import { accountsApi } from '@/api/accountsApi'
import { RU } from '@/constants/accountTexts'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setError = (message: string | null) => {
    error.value = message
  }

  const fetchAccounts = async () => {
    try {
      loading.value = true
      error.value = null
      const data = await accountsApi.getAll()
      accounts.value = data
    } catch (err) {
      error.value = RU.ERRORS.LOAD_ACCOUNTS
    } finally {
      loading.value = false
    }
  }

  const createAccount = async (formData: AccountFormData) => {
    console.log('createAccount', formData)
    try {
      loading.value = true
      error.value = null
      const newAccount = await accountsApi.create(formData)
      accounts.value = [...accounts.value, newAccount]

      return newAccount
    } catch (err) {
      error.value = RU.ERRORS.CREATE_ACCOUNT
    } finally {
      loading.value = false
    }
  }

  const updateAccount = async (id: string, formData: AccountFormData) => {
    try {
      loading.value = true
      error.value = null
      const updatedAccount = await accountsApi.update(id, formData)

      const index = accounts.value.findIndex((acc) => acc.id === id)
      if (index !== -1) {
        accounts.value[index] = updatedAccount
      }

      return updatedAccount
    } catch (err) {
      error.value = RU.ERRORS.UPDATE_ACCOUNT
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      await accountsApi.delete(id)
      accounts.value = accounts.value.filter((acc) => acc.id !== id)
    } catch (err) {
      error.value = RU.ERRORS.DELETE_ACCOUNT
    } finally {
      loading.value = false
    }
  }

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    setError,
  }
})
