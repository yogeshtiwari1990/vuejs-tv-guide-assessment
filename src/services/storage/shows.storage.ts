import { ref, computed } from "vue";

import type { Show } from "../tv-guide-types";
import { getShows } from "../tv-guide.service";

/**
 * Simple storage for all shows/show related functionality
 */
export default class ShowsStorage {
  private static allShows = ref<Show[]>([]);
  private static currentPage = ref(0);
  private static loading = ref(false);
  private static error = ref<string>("");
  private static hasMoreShows = ref(true);
  private static currentShowTitle = ref<string>("");

  public static getCurrentShowTitle = computed(() => {
    return (): string => {
      return ShowsStorage.currentShowTitle.value;
    };
  });

  public static setCurrentShowTitle = (title: string) => {
    ShowsStorage.currentShowTitle.value = title;
  };

  public static getAllShows = computed(() => {
    return (): Show[] => {
      return ShowsStorage.allShows.value;
    };
  });

  public static isLoading = computed(() => {
    return (): boolean => {
      return ShowsStorage.loading.value;
    };
  });

  public static getError = computed(() => {
    return (): string => {
      return ShowsStorage.error.value;
    };
  });

  public static getHasMoreShows = computed(() => {
    return (): boolean => {
      return ShowsStorage.hasMoreShows.value;
    };
  });

  public static loadMoreShows = async () => {
    ShowsStorage.loading.value = true;
    ShowsStorage.error.value = "";

    try {
      const result = await getShows(ShowsStorage.currentPage.value);

      ShowsStorage.allShows.value = ShowsStorage.allShows.value.concat(result);
      ShowsStorage.currentPage.value++;

      if (result.length === 0) {
        ShowsStorage.hasMoreShows.value = false;
      }
    } catch (e) {
      const err = e as Error;
      ShowsStorage.error.value = err.message;
    } finally {
      ShowsStorage.loading.value = false;
    }
  };

  public static allShowsCount = computed(
    () => ShowsStorage.allShows.value.length
  );

  public static getShowsByGenre = computed(() => {
    return (genre: string): Show[] => {
      return ShowsStorage.allShows.value.filter((show) => {
        return show.genres.includes(genre);
      });
    };
  });

  public static getAllGenres = computed(() => {
    return (): Set<string> => {
      const allGenresUnique = new Set<string>();
      ShowsStorage.allShows.value.reduce((allGenresUnique, show) => {
        for (const genre of show.genres) {
          if (genre) {
            allGenresUnique.add(genre);
          }
        }
        return allGenresUnique;
      }, allGenresUnique);

      return allGenresUnique;
    };
  });
}
