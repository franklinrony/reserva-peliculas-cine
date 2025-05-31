import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { ReservationService } from '../../services/reservation.service';
import { Movie } from '../../models/movie.model';
import { Showtime } from '../../models/showtime.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-showtime-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="showtime-container" *ngIf="movie">
      <div class="header">
        <button class="back-button" (click)="goBack()">← Volver</button>
        <h1 class="title">Selecciona horario y entradas</h1>
      </div>
      
      <div class="movie-summary">
        <div class="movie-poster">
          <img [src]="movie.poster" [alt]="movie.title">
        </div>
        <div class="movie-info">
          <h2 class="movie-title">{{ movie.title }}</h2>
          <p class="movie-metadata">{{ movie.duration }} min • {{ movie.genre }}</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Horarios disponibles</h3>
        <div class="showtime-list">
          @for (showtime of showtimes; track showtime.id) {
            <div 
              class="showtime-card" 
              [class.selected]="selectedShowtime?.id === showtime.id"
              (click)="selectShowtime(showtime)">
              <div class="showtime-time">{{ showtime.time }}</div>
              <div class="showtime-details">
                <div class="showtime-format">{{ showtime.format }}</div>
                <div class="showtime-language">{{ showtime.language }}</div>
                <div class="showtime-room">{{ showtime.room }}</div>
              </div>
            </div>
          }
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Cantidad de entradas</h3>
        <div class="ticket-selector">
          <button 
            class="ticket-btn decrement" 
            [disabled]="ticketCount <= 1" 
            (click)="decrementTickets()">-</button>
          <span class="ticket-count">{{ ticketCount }}</span>
          <button 
            class="ticket-btn increment" 
            [disabled]="ticketCount >= 10" 
            (click)="incrementTickets()">+</button>
        </div>
        <p class="price-info" *ngIf="selectedShowtime">
          Precio total: {{ totalPrice }}usd
        </p>
      </div>
      
      <div class="action-buttons">
        <button class="continue-btn" [disabled]="!selectedShowtime" (click)="continueToSeats()">
          Continuar a selección de asientos
        </button>
      </div>
    </div>
    
    <div class="loading-container" *ngIf="!movie">
      <p>Cargando información...</p>
    </div>
  `,
  styleUrls: ['./showtime-selection.component.css']
})
export class ShowtimeSelectionComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private reservationService = inject(ReservationService);
  
  movie: Movie | undefined;
  showtimes: Showtime[] = [];
  selectedShowtime: Showtime | null = null;
  ticketCount: number = 1;
  totalPrice: number = 0;

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
          this.showtimes = movie.showtimes;
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

  selectShowtime(showtime: Showtime): void {
    this.selectedShowtime = showtime;
    this.movieService.setSelectedShowtime(showtime);
    this.reservationService.setShowtime(showtime);
    this.updatePrice();
  }

  incrementTickets(): void {
    if (this.ticketCount < 10) {
      this.ticketCount++;
      this.updatePrice();
    }
  }

  decrementTickets(): void {
    if (this.ticketCount > 1) {
      this.ticketCount--;
      this.updatePrice();
    }
  }

  updatePrice(): void {
    if (this.selectedShowtime) {
      this.totalPrice = this.reservationService.calculatePrice(this.ticketCount, this.selectedShowtime.format);
      this.reservationService.setTicketCount(this.ticketCount);
    }
  }

  continueToSeats(): void {
    if (!this.selectedShowtime) {
      Swal.fire({
        title: 'Selecciona un horario',
        text: 'Por favor, selecciona un horario para continuar',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    
    this.router.navigate(['/seat-selection']);
  }

  goBack(): void {
    this.router.navigate(['/movies', this.movie?.id]);
  }
}