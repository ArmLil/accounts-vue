<template>
  <div class="not-found-view">
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4" class="text-center">
          <v-icon icon="mdi-alert-circle-outline" size="80" color="error" class="mb-4" />
          <h1 class="text-h3 font-weight-bold mb-2">{{ RU.NOT_FOUND_VIEW.TITLE }}</h1>
          <h2 class="text-h5 mb-4">{{ RU.NOT_FOUND_VIEW.SUBTITLE }}</h2>
          <p class="text-body-1 mb-6">{{ RU.NOT_FOUND_VIEW.MESSAGE }}</p>
          <v-btn
            color="primary"
            prepend-icon="mdi-arrow-left"
            @click="$router.push('/accounts')"
            variant="tonal"
          >
            {{ RU.NOT_FOUND_VIEW.GO_BACK_BUTTON }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { RU } from '@/constants/commonTexts'
</script>

<style scoped>
.not-found-view {
  height: 100vh;
}
</style>
