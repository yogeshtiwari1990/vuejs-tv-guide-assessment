<script setup lang="ts">
import { onMounted } from "vue";

import ShowStorage from "@/services/storage/shows.storage";
import SearchStorage from "@/services/storage/search.storage";

import ShowsByGenreComponent from "@/ui/shows/shows-by-genre.component.vue";
import SearchResultsComponent from "@/ui/search/search-result.component.vue";

onMounted(async () => {
  if (ShowStorage.allShowsCount.value === 0) {
    await ShowStorage.loadMoreShows();
  }
});
</script>

<template>
  <div class="shows">
    <SearchResultsComponent v-if="SearchStorage.getSearchTerm.value()" />

    <div
      v-else-if="
        !ShowStorage.isLoading.value() &&
        ShowStorage.getAllGenres.value().size == 0
      "
    >
      There are no shows.
    </div>

    <template v-else>
      <ShowsByGenreComponent
        v-for="genre in ShowStorage.getAllGenres.value()"
        :key="genre"
        :title="genre"
        :shows="ShowStorage.getShowsByGenre.value(genre)"
        :can-load-more="ShowStorage.getHasMoreShows.value()"
        :is-loading="ShowStorage.isLoading.value()"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.shows {
  margin: 50px;
}
</style>
