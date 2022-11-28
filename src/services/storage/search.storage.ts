import { ref, computed } from "vue";
import type { Show } from "../tv-guide-types";
import { searchShows } from "../tv-guide.service";

/**
 * Simple storage for search related functionality
 */
export default class SearchStorage {
  private static searchError = ref<boolean>(false);
  private static searchResults = ref<Show[]>([]);
  private static searching = ref<boolean>(false);
  private static searchTerm = ref<string>("");

  public static isSearching = computed(() => {
    return (): boolean => {
      return SearchStorage.searching.value;
    };
  });

  public static getSearchError = computed(() => {
    return (): boolean => {
      return SearchStorage.searchError.value;
    };
  });

  public static getSearchResults = computed(() => {
    return (): Show[] => {
      return SearchStorage.searchResults.value;
    };
  });

  public static getSearchTerm = computed(() => {
    return (): string => {
      return SearchStorage.searchTerm.value;
    };
  });

  public static closeSearch = () => {
    SearchStorage.searching.value = false;
    SearchStorage.searchError.value = false;
    SearchStorage.searchResults.value = [];
    SearchStorage.searchTerm.value = "";
  };

  public static searchShows = async (searchTerm: string) => {
    if (!searchTerm) {
      this.closeSearch();
      return;
    }

    SearchStorage.searching.value = true;
    SearchStorage.searchError.value = false;
    SearchStorage.searchTerm.value = searchTerm;

    try {
      const result = await searchShows(searchTerm);
      SearchStorage.searchResults.value = result;
    } catch (e) {
      const err = e as Error;
      console.error(err.message);
      SearchStorage.searchError.value = true;
    } finally {
      SearchStorage.searching.value = false;
    }
  };
}
