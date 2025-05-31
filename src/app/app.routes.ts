import { Routes } from '@angular/router';
import { MovieListComponent } from './pages/movie-list/movie-list.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { ShowtimeSelectionComponent } from './pages/showtime-selection/showtime-selection.component';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { UpcomingMoviesComponent } from './pages/upcoming-movies/upcoming-movies.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'proximamente', component: UpcomingMoviesComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'showtime-selection/:id', component: ShowtimeSelectionComponent },
  { path: 'seat-selection', component: SeatSelectionComponent },
  { path: 'reservation-summary', component: ReservationSummaryComponent },
  { path: '**', redirectTo: '' }
];