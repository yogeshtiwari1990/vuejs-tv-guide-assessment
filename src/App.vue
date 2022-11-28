<script setup lang="ts">
import { RouterView } from "vue-router";

import ShowsStorage from "@/services/storage/shows.storage";

import SearchBarComponent from "@/ui/search/search-bar.component.vue";
</script>

<template>
  <v-app theme="dark">
    <v-app-bar density="compact">
      <v-btn
        prependIcon="mdi-television-shimmer"
        variant="text"
        href="/"
        class="home-button"
      >
        TV Guide
      </v-btn>

      <div v-if="ShowsStorage.getCurrentShowTitle.value()">
        <span> / </span>
        <span class="show-title">{{
          ShowsStorage.getCurrentShowTitle.value()
        }}</span>
      </div>
      <div v-else class="search-bar">
        <SearchBarComponent />
      </div>
    </v-app-bar>
    <v-main>
      <notifications position="bottom left" />
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.home-button {
  color: violet;
  font-family: cursive;
}
.show-title {
  padding-left: 16px;
}

.search-bar {
  margin-left: 50px;
  min-width: 500px;
  margin-top: 20px;
}
</style>
