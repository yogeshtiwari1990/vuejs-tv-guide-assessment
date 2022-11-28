/**
 * Api calls to get data from the endpoint
 */
import type { Show } from "./tv-guide-types";

export async function getShows(page: number): Promise<Show[]> {
  const query = new URLSearchParams({
    page: page.toString(),
  }).toString();

  const url = `${BASE_URL}?${query}`;

  const response = await GetAPIHelper<Show[]>(url);
  return response;
}

export async function getShow(id: number): Promise<Show> {
  const url = `${BASE_URL}/${id}`;

  const response = await GetAPIHelper<Show>(url);

  return response;
}

export async function searchShows(search: string): Promise<Show[]> {
  const query = new URLSearchParams({
    q: search,
  }).toString();

  const url = `${BASE_URL}?${query}`;

  const response = await GetAPIHelper<Show[]>(url);

  return response;
}

/**
 * Wrapper for the http requests
 * (Can be extracted to a separate file)
 */
const BASE_URL = "https://api.tvmaze.com/shows";
const GetAPIHelper = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    console.error("Error while fetching: " + response.status);
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
};
