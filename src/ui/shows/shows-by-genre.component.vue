<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

import type { Show } from "@/services/tv-guide-types";
import { useWindowSize } from "@/services/helpers/window-size";
import { POSTER_WIDTH } from "@/services/helpers/show-poster.size";
import ShowStorage from "@/services/storage/shows.storage";

import Poster from "@/ui/common/show-poster.vue";
import ProgressComponent from "@/ui/common/progress-loader.vue";

export interface IProps {
  shows: Show[];
  title?: string;
  canLoadMore: boolean;
  isLoading: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  canLoadMore: false,
  isLoading: false,
});

const { windowWidth } = useWindowSize();

const firstItemIndex = ref<number>(0);
const totalShows = computed(() => props.shows.length);
const hasPreviousItems = computed(() => firstItemIndex.value > 0);

//Calculated number of items shown in a page according to screen width and poster sie
const itemsInAPage = computed(() => {
  //Reduce 100 for margin and 100 for navigation buttons
  const windowWidthReduced = windowWidth.value - 200;

  //Increase 20 for margin
  const posterWidthIncreased = POSTER_WIDTH + 20;

  return Math.floor(windowWidthReduced / posterWidthIncreased) || 1;
});

const hasMoreItems = computed(
  () =>
    props.canLoadMore ||
    firstItemIndex.value + itemsInAPage.value > totalShows.value
);

const currentPageShows = computed(() => {
  return props.shows.slice(
    firstItemIndex.value,
    firstItemIndex.value + itemsInAPage.value
  );
});

const setFirstItemShownIndex = (offset: number) => {
  if (offset < 0) {
    return;
  }
  if (offset > totalShows.value) {
    return;
  }

  firstItemIndex.value = offset;
};
</script>

<template>
  <div class="shows-by-genre">
    <h2 class="title">{{ title }}</h2>

    <div class="shows">
      <div class="navigation">
        <div
          class="left"
          :class="{
            disabled: !hasPreviousItems,
          }"
          @click.stop="setFirstItemShownIndex(firstItemIndex - itemsInAPage)"
        >
          <v-icon size="x-large" icon="mdi-chevron-left"></v-icon>
        </div>
      </div>

      <div class="show">
        <div class="show-card" v-for="show in currentPageShows" :key="show.id">
          <RouterLink :to="`/show/${show.id}`">
            <Poster :src="show.image?.medium" :name="show.name" />
          </RouterLink>
        </div>
      </div>

      <div class="navigation">
        <div
          class="right"
          :class="{
            disabled: !hasMoreItems && !canLoadMore,
          }"
        >
          <v-icon
            v-if="!isLoading"
            size="x-large"
            icon="mdi-chevron-right"
            @click.stop="
              () => {
                setFirstItemShownIndex(firstItemIndex + itemsInAPage);

                if (canLoadMore && firstItemIndex + itemsInAPage > totalShows) {
                  ShowStorage.loadMoreShows();
                }
              }
            "
          ></v-icon>
          <ProgressComponent v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shows-by-genre {
  margin-bottom: 50px;

  .title {
    margin: 20px;
    color: violet;
  }

  .shows {
    display: flex;
    flex-direction: row;
    justify-content: left;

    .navigation {
      display: flex;
      justify-content: center;
      align-items: center;

      .left,
      .right {
        width: 50px;
        cursor: pointer;

        &.disabled {
          pointer-events: none;
          opacity: 0.4;
        }
      }
    }
  }

  .show {
    display: flex;
    flex-direction: row;

    .show-card {
      margin: 10px;
    }
  }
}
</style>
