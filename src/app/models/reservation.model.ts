import { Movie } from './movie.model';
import { Showtime } from './showtime.model';
import { Seat } from './seat.model';

export interface Reservation {
  movie: Movie | null;
  showtime: Showtime | null;
  seats: Seat[];
  ticketCount: number;
  totalPrice: number;
}