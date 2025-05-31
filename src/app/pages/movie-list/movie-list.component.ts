import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ReservationService } from '../../services/reservation.service';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,  MovieCardComponent],
  template: `
    <section class="movie-list-container">
      <h1 class="page-title">Cartelera Actual</h1>
      
      <div class="movie-grid">
        @for (movie of movies; track movie.id) {
          <app-movie-card 
            [movie]="movie" 
            (click)="selectMovie(movie)">
          </app-movie-card>
        }
      </div>
    </section>
  `,
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService);
  private reservationService = inject(ReservationService);
  
  movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
    
    // Reset reservation when landing on movie list
    this.reservationService.setMovie(null);
  }

  selectMovie(movie: Movie): void {
    this.movieService.setSelectedMovie(movie);
    this.reservationService.setMovie(movie);
  }
}