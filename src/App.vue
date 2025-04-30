<template>
  <v-app class="bg-grey-lighten-3 overflow-hidden">
    <v-main class="main-container">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
//
</script>

<style lang="css" scoped>
.main-container {
  width: 1000px;
  margin: 0 auto;
}
</style>
