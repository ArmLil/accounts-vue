<template>
  <div class="accounts-view">
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4 font-weight-bold">{{ RU.ACCOUNTS_VIEW.TITLE }}</h1>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="addNewAccount"
        :disabled="accountsStore.loading"
        variant="flat"
      >
        {{ RU.ACCOUNTS_VIEW.ADD_BUTTON }}
      </v-btn>
    </div>

    <v-alert type="info" variant="tonal" density="compact" class="mb-6">
      <template #prepend>
        <v-icon icon="mdi-information" size="small" />
      </template>
      <div class="text-caption">
        {{ RU.ACCOUNTS_VIEW.HINT }}
      </div>
    </v-alert>

    <v-alert
      v-if="accountsStore.error"
      type="error"
      variant="tonal"
      class="mb-4"
      closable
      @click:close="accountsStore.setError(null)"
    >
      {{ accountsStore.error }}
    </v-alert>

    <!-- <v-overlay :model-value="accountsStore.loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-overlay> -->

    <div v-if="accountsStore.accounts.length > 0 || showNewForm">
      <AccountItem
        v-for="account in accountsStore.accounts"
        :key="account.id"
        :account="account"
        :loading="accountsStore.loading"
        @update="handleUpdate"
        @delete="handleDelete"
      />

      <AccountItem
        v-if="showNewForm"
        :account="newAccountData"
        key="new"
        is-new
        :loading="accountsStore.loading"
        @create="handleCreate"
        @cancel="showNewForm = false"
      />
    </div>

    <div v-else class="text-center py-12">
      <v-icon icon="mdi-account-multiple" size="80" color="grey-lighten-1" class="mb-4" />
      <h3 class="text-h6 mb-2">{{ RU.ACCOUNTS_VIEW.NO_ACCOUNTS_TITLE }}</h3>
      <p class="text-body-2 text-grey">
        {{ RU.ACCOUNTS_VIEW.NO_ACCOUNTS_MESSAGE }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountItem from '@/components/AccountItem.vue'
import { AccountType, type AccountFormData } from '@/types/account'
import { RU } from '@/constants/accountTexts'

const accountsStore = useAccountsStore()
const showNewForm = ref(false)
const newAccountData = ref<AccountFormData>({
  labelsString: '',
  type: AccountType.LOCAL,
  login: '',
  password: '',
})

const addNewAccount = () => {
  showNewForm.value = true
  newAccountData.value = {
    labelsString: '',
    type: AccountType.LOCAL,
    login: '',
    password: '',
  }
}

const handleCreate = async (data: AccountFormData) => {
  showNewForm.value = false
  await accountsStore.createAccount(data)
}

const handleUpdate = async ({ id, data }: { id: string; data: AccountFormData }) => {
  await accountsStore.updateAccount(id, data)
}

const handleDelete = async (id: string) => {
  await accountsStore.deleteAccount(id)
}

onMounted(async () => {
  await accountsStore.fetchAccounts()
})
</script>

<style scoped>
.accounts-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
</style>
