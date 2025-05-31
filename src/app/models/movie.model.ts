import { Showtime } from './showtime.model';

export interface Movie {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  duration: number;
  rating: string;
  director: string;
  genre: string;
  showtimes: Showtime[];
  releaseDate?: string;
  ticketsOnSaleDate?: string;
}