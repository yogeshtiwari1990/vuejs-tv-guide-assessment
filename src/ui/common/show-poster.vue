<script setup lang="ts">
import {
  POSTER_HEIGHT,
  POSTER_WIDTH,
} from "@/services/helpers/show-poster.size";

export interface IProps {
  src?: string;
  name: string;
}
defineProps<IProps>();
</script>

<template>
  <div
    :style="{
      width: `${POSTER_WIDTH}px`,
      height: `${POSTER_HEIGHT}px`,
    }"
  >
    <v-img v-if="!!src" :src="src" :alt="name" cover>
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            indeterminate
            color="grey-lighten-4"
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    <div v-else class="name">{{ name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.name {
  background-color: lightcoral;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
}
</style>
