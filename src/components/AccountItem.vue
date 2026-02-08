<template>
  <div class="account-item pa-4 mb-4 border rounded-lg bg-white">
    <v-form ref="formRef">
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="form.labelsString"
            :label="RU.ACCOUNT_ITEM.LABELS_LABEL"
            :placeholder="RU.ACCOUNT_ITEM.LABELS_PLACEHOLDER"
            :maxlength="51"
            :rules="labelRules"
            validate-on="blur"
            variant="outlined"
            density="comfortable"
            @blur="handleSave"
          />
        </v-col>

        <v-col cols="12" md="2">
          <v-select
            v-model="form.type"
            :label="RU.ACCOUNT_ITEM.TYPE_LABEL"
            :items="accountTypes"
            :rules="typeRules"
            variant="outlined"
            density="comfortable"
            @update:model-value="handleTypeChange"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            v-model="form.login"
            :label="RU.ACCOUNT_ITEM.LOGIN_LABEL"
            :maxlength="101"
            validate-on="blur"
            :rules="loginRules"
            variant="outlined"
            density="comfortable"
            required
            @blur="handleSave"
          />
        </v-col>

        <v-col cols="12" md="3" v-if="form.type === AccountType.LOCAL">
          <v-text-field
            v-model="form.password"
            :label="RU.ACCOUNT_ITEM.PASSWORD_LABEL"
            :type="showPassword ? 'text' : 'password'"
            :maxlength="101"
            :rules="passwordRules"
            validate-on="blur"
            variant="outlined"
            density="comfortable"
            @blur="handleSave"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
          />
        </v-col>

        <v-col cols="12" md="1" class="d-flex align-center justify-end">
          <div class="d-flex gap-2">
            <v-btn
              color="error"
              icon="mdi-delete"
              size="small"
              :loading="loading"
              @click="handleDelete()"
              variant="text"
            />
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { AccountType, type AccountFormData, type Account } from '@/types/account'
import { RU } from '@/constants/accountTexts'
import {
  accountTypes,
  getPasswordRules,
  labelRules,
  loginRules,
  typeRules,
} from '@/helpers/accountHelper'

interface Props {
  account: Account | AccountFormData
  isNew?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'create', data: AccountFormData): void
  (e: 'update', data: { id: string; data: AccountFormData }): void
  (e: 'delete', id: string): void
  (e: 'cancel'): void
}
const props = withDefaults(defineProps<Props>(), {
  isNew: false,
  loading: false,
})

const emit = defineEmits<Emits>()

const showPassword = ref(false)
const form = reactive<AccountFormData>({
  labelsString: '',
  type: AccountType.LOCAL,
  login: '',
  password: '',
})

const passwordRules = computed(() => getPasswordRules(form.type))

const isValid = computed(() => {
  const isLoginValid = loginRules.every((rule) => rule(form.login) === true)
  const isTypeValid = typeRules.every((rule) => rule(form.type) === true)

  let isPasswordValid = true
  if (form.type === AccountType.LOCAL) {
    isPasswordValid = passwordRules.value.every((rule) => rule(form.password) === true)
  }

  return isLoginValid && isTypeValid && isPasswordValid
})

const handleTypeChange = () => {
  if (form.type === AccountType.LDAP) {
    form.password = ''
  }
  handleSave()
}

const handleSave = () => {
  if (!isValid.value) return

  if (props.isNew) {
    emit('create', { ...form })
  } else if ('id' in props.account) {
    emit('update', { id: props.account.id, data: { ...form } })
  }
}
const handleDelete = () => {
  if (!props.isNew && 'id' in props.account) {
    emit('delete', props.account.id)
  } else {
    emit('cancel')
  }
}

const initForm = () => {
  if (props.isNew) {
    form.labelsString = ''
    form.type = AccountType.LOCAL
    form.login = ''
    form.password = ''
  } else {
    const account = props.account as Account
    form.labelsString = account.labels.map((label) => label.text).join('; ')
    form.type = account.type
    form.login = account.login
    form.password = account.password || ''
  }
}

watch(() => props.account, initForm, { immediate: true, deep: true })
</script>

<style scoped>
.account-item {
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s;
}

.account-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.gap-2 {
  gap: 8px;
}
</style>
