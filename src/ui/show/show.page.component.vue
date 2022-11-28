<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

import ShowStorage from "@/services/storage/shows.storage";
import type { Show } from "@/services/tv-guide-types";
import { getShow } from "@/services/tv-guide.service";

import Poster from "@/ui/common/show-poster.vue";
import ProgressComponent from "@/ui/common/progress-loader.vue";

// Get the id of the movie from the url
const route = useRoute();
const id = route.params.id as unknown as number;

// Load the show details
const show = ref<Show | undefined>(undefined);
const isLoading = ref(false);
const error = ref(false);

const loadShow = async () => {
  isLoading.value = true;
  try {
    show.value = await getShow(id);
    ShowStorage.setCurrentShowTitle(show.value.name);
  } catch (e) {
    console.error((e as Error).message);
    error.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  loadShow();
});

onUnmounted(async () => {
  ShowStorage.setCurrentShowTitle("");
});
</script>

<template>
  <div class="show-page">
    <div v-if="isLoading">
      <ProgressComponent />
    </div>
    <div v-else-if="error || !show">
      Some error ocured. Please refresh the page.
    </div>
    <template v-else>
      <v-card>
        <v-container>
          <v-row>
            <v-col cols="3">
              <Poster :src="show.image?.medium" :name="show.name" />
            </v-col>
            <v-col cols="9">
              <v-container>
                <v-row>
                  <v-col>
                    <h1>{{ show.name }}</h1>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="text-h5">Summary</h2>
                    <div v-html="show.summary" />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="text-h5">Genre</h2>
                    <div>
                      <span
                        v-for="genre in show.genres"
                        :key="genre"
                        class="genre"
                        >{{ genre }}</span
                      >
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="text-h5">Language</h2>
                    <div>{{ show.language }}</div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.show-page {
  margin: 50px;
}
</style>
