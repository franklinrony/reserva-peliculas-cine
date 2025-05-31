import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-container" *ngIf="reservation.movie && reservation.showtime">
      <h1 class="title">Resumen de la reserva</h1>
      
      <div class="summary-card">
        <div class="movie-details">
          <div class="movie-poster">
            <img [src]="reservation.movie.poster" [alt]="reservation.movie.title">
          </div>
          <div class="movie-info">
            <h2 class="movie-title">{{ reservation.movie.title }}</h2>
            <p class="movie-metadata">{{ reservation.movie.duration }} min • {{ reservation.movie.genre }}</p>
            <p class="showtime-info">
              {{ reservation.showtime.date | date:'EEEE, d MMMM' }} • 
              {{ reservation.showtime.time }}
            </p>
            <p class="format-info">
              {{ reservation.showtime.format }} • 
              {{ reservation.showtime.language }} • 
              {{ reservation.showtime.room }}
            </p>
          </div>
        </div>
        
        <div class="tickets-info">
          <div class="info-row">
            <span class="label">Entradas:</span>
            <span class="value">{{ reservation.ticketCount }}</span>
          </div>
          <div class="info-row">
            <span class="label">Asientos:</span>
            <span class="value">
              <span class="seat-tag" *ngFor="let seat of reservation.seats">{{ seat.id }}</span>
            </span>
          </div>
          <div class="info-row total">
            <span class="label">Total:</span>
            <span class="value price">$ {{ reservation.totalPrice }}</span>
          </div>
        </div>
        
        <div class="qr-code">
          <div class="qr-placeholder">
            <div class="qr-inner"></div>
          </div>
          <p class="qr-info">Escanea este código QR en el cine</p>
        </div>
        
        <div class="action-buttons">
          <button class="confirm-btn" (click)="confirmReservation()">Confirmar reserva</button>
          <button class="cancel-btn" (click)="cancelReservation()">Cancelar</button>
        </div>
      </div>
    </div>
    
    <div class="not-found" *ngIf="!reservation.movie || !reservation.showtime">
      <h2>No hay una reserva en proceso</h2>
      <p>Por favor, selecciona una película y un horario para continuar.</p>
      <button class="return-btn" (click)="navigateToHome()">Ir a la cartelera</button>
    </div>
  `,
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  private router = inject(Router);
  private reservationService = inject(ReservationService);
  
  reservation: Reservation = {
    movie: null,
    showtime: null,
    seats: [],
    ticketCount: 0,
    totalPrice: 0
  };

  ngOnInit(): void {
    this.reservationService.getCurrentReservation().subscribe(reservation => {
      this.reservation = reservation;
      
      if ((!reservation.movie || !reservation.showtime || !reservation.seats.length) && 
          this.router.url === '/reservation-summary') {
        this.navigateToHome();
      }
    });
  }

  confirmReservation(): void {
    Swal.fire({
      title: '¡Reserva confirmada!',
      text: 'Tu reserva ha sido confirmada con éxito. ¡Disfruta la película!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.reservationService.completeReservation();
      this.router.navigate(['/']);
    });
  }

  cancelReservation(): void {
    Swal.fire({
      title: '¿Cancelar reserva?',
      text: '¿Estás seguro que deseas cancelar tu reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.completeReservation(); // Reset the reservation
        this.router.navigate(['/']);
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}