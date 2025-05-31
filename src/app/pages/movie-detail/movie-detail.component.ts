import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ReservationService } from '../../services/reservation.service';
import { Movie } from '../../models/movie.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="movie-detail-container" *ngIf="movie">
      <div class="movie-header">
        <button class="back-button" (click)="goBack()">← Volver</button>
        <h1 class="movie-title">{{ movie.title }}</h1>
      </div>
      
      <div class="movie-content">
        <div class="movie-poster">
          <img [src]="movie.poster" [alt]="movie.title">
          <div class="movie-rating">{{ movie.rating }}</div>
        </div>
        
        <div class="movie-info">
          <div class="movie-metadata">
            <span class="metadata-item">{{ movie.duration }} min</span>
            <span class="metadata-separator">•</span>
            <span class="metadata-item">{{ movie.genre }}</span>
            <span class="metadata-separator">•</span>
            <span class="metadata-item">Director: {{ movie.director }}</span>
          </div>
          
          <p class="movie-synopsis">{{ movie.synopsis }}</p>
          
          <div class="cta-container">
            <button class="cta-button" [routerLink]="['/showtime-selection', movie.id]">
              Seleccionar horario
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="loading-container" *ngIf="!movie">
      <p>Cargando información de la película...</p>
    </div>
  `,
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private reservationService = inject(ReservationService);
  
  movie: Movie | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') || '0', 10);
      
      if (id === 0) {
        this.router.navigate(['/']);
        return;
      }
      
      this.movieService.getMovieById(id).subscribe(movie => {
        if (movie) {
          this.movie = movie;
          this.movieService.setSelectedMovie(movie);
          this.reservationService.setMovie(movie);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se encontró la película solicitada',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/']);
        }
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}