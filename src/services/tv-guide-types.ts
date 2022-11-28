/**
 * Typings for the data returned from the api's
 */
export interface Image {
  medium: string;
}

export interface Show {
  id: number;
  name: string;
  genres: string[];
  image: Image;
  summary: string;
  language: string;
}
