import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-upcoming-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <section class="movie-list-container">
      <h1 class="page-title">Próximamente</h1>
      <div class="movie-grid">
        @for (movie of upcomingMovies; track movie.id) {
          <div>
            <app-movie-card [movie]="movie" [disableNavigation]="true"></app-movie-card>
            <div class="movie-extra-info">
              <p><strong>Fecha de estreno:</strong> {{ movie.releaseDate | date:'longDate' }}</p>
              <p><strong>Boletos a la venta desde:</strong> {{ movie.ticketsOnSaleDate | date:'longDate' }}</p>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styleUrls: ['./upcoming-movies.component.css']
})
export class UpcomingMoviesComponent implements OnInit {
  private movieService = inject(MovieService);
  upcomingMovies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getUpcomingMovies().subscribe(movies => {
      this.upcomingMovies = movies;
    });
  }
} 