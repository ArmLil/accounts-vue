<template>
  <v-app>
    <v-app-bar app color="primary" density="comfortable">
      <v-app-bar-title class="d-flex align-center">
        <v-icon icon="mdi-account-key" class="mr-2" />
        <span>{{ RU.APP.TITLE }}</span>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RU } from '@/constants/commonTexts'
</script>

<style></style>
