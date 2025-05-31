import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ReservationService } from '../../services/reservation.service';
import { Seat } from '../../models/seat.model';
import { Reservation } from '../../models/reservation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seat-selection-container" *ngIf="reservation.movie && reservation.showtime">
      <div class="header">
        <button class="back-button" (click)="goBack()">← Volver</button>
        <h1 class="title">Selección de asientos</h1>
      </div>
      
      <div class="movie-info">
        <h2 class="movie-title">{{ reservation.movie.title }}</h2>
        <p class="showtime-info">
          {{ reservation.showtime.date | date:'EEEE, d MMMM' }} • 
          {{ reservation.showtime.time }} • 
          {{ reservation.showtime.format }} • 
          {{ reservation.showtime.room }}
        </p>
        <p class="ticket-info">
          {{ reservation.ticketCount }} entrada{{ reservation.ticketCount !== 1 ? 's' : '' }}
        </p>
      </div>
      
      <div class="screen-container">
        <div class="screen">PANTALLA</div>
      </div>
      
      <div class="seats-container">
        @for (row of seatRows; track row) {
          <div class="seat-row">
            <div class="row-label">{{ row }}</div>
            @for (seat of getSeatsForRow(row); track seat.id) {
              <div 
                class="seat" 
                [class.occupied]="seat.isOccupied"
                [class.selected]="seat.isSelected"
                [class.disabled]="!canSelectSeat(seat)"
                (click)="toggleSeat(seat)">
                {{ seat.number }}
              </div>
            }
          </div>
        }
      </div>
      
      <div class="legend">
        <div class="legend-item">
          <div class="legend-seat available"></div>
          <span>Disponible</span>
        </div>
        <div class="legend-item">
          <div class="legend-seat selected"></div>
          <span>Seleccionado</span>
        </div>
        <div class="legend-item">
          <div class="legend-seat occupied"></div>
          <span>Ocupado</span>
        </div>
      </div>
      
      <div class="selected-seats">
        <h3>Asientos seleccionados: {{ selectedSeats.length }}/{{ reservation.ticketCount }}</h3>
        <div class="seat-tags">
          @for (seat of selectedSeats; track seat.id) {
            <div class="seat-tag">{{ seat.id }}</div>
          }
        </div>
      </div>
      
      <div class="action-buttons">
        <button 
          class="continue-btn" 
          [disabled]="selectedSeats.length !== reservation.ticketCount" 
          (click)="continueToSummary()">
          Continuar
        </button>
      </div>
    </div>
    
    <div class="not-found" *ngIf="!reservation.movie || !reservation.showtime">
      <h2>No hay una reserva en proceso</h2>
      <p>Por favor, selecciona una película y un horario para continuar.</p>
      <button class="return-btn" (click)="navigateToHome()">Ir a la cartelera</button>
    </div>
  `,
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  private router = inject(Router);
  private movieService = inject(MovieService);
  private reservationService = inject(ReservationService);
  
  reservation: Reservation = {
    movie: null,
    showtime: null,
    seats: [],
    ticketCount: 0,
    totalPrice: 0
  };
  
  allSeats: Seat[] = [];
  selectedSeats: Seat[] = [];
  seatRows: string[] = [];

  ngOnInit(): void {
    this.reservationService.getCurrentReservation().subscribe(reservation => {
      this.reservation = reservation;
      
      if (reservation.movie && reservation.showtime) {
        const roomId = this.reservationService.getRoomIdFromShowtime(reservation.showtime);
        this.allSeats = this.reservationService.getAvailableSeats(roomId);
        
        // Obtener todas las filas únicas
        this.seatRows = [...new Set(this.allSeats.map(seat => seat.row))].sort();
        
        // Si ya hay asientos seleccionados, recuperarlos
        this.selectedSeats = [...reservation.seats];
        this.updateSelectedStateInAllSeats();
      }
    });
  }

  getSeatsForRow(row: string): Seat[] {
    return this.allSeats.filter(seat => seat.row === row).sort((a, b) => a.number - b.number);
  }

  toggleSeat(seat: Seat): void {
    if (seat.isOccupied) {
      return;
    }
    
    const index = this.selectedSeats.findIndex(s => s.id === seat.id);
    
    if (index !== -1) {
      // Deseleccionar asiento
      this.selectedSeats.splice(index, 1);
      seat.isSelected = false;
    } else if (this.selectedSeats.length < this.reservation.ticketCount) {
      // Seleccionar asiento
      this.selectedSeats.push({...seat, isSelected: true});
      seat.isSelected = true;
    } else {
      Swal.fire({
        title: 'Límite alcanzado',
        text: `Solo puedes seleccionar ${this.reservation.ticketCount} asientos`,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
    
    this.reservationService.setSeats(this.selectedSeats);
  }

  canSelectSeat(seat: Seat): boolean {
    return !seat.isOccupied && (seat.isSelected || this.selectedSeats.length < this.reservation.ticketCount);
  }

  updateSelectedStateInAllSeats(): void {
    // Resetear todos los asientos seleccionados
    this.allSeats.forEach(seat => seat.isSelected = false);
    
    // Marcar los asientos seleccionados
    this.selectedSeats.forEach(selectedSeat => {
      const seat = this.allSeats.find(s => s.id === selectedSeat.id);
      if (seat) {
        seat.isSelected = true;
      }
    });
  }

  continueToSummary(): void {
    if (this.selectedSeats.length !== this.reservation.ticketCount) {
      Swal.fire({
        title: 'Selección incompleta',
        text: `Por favor, selecciona exactamente ${this.reservation.ticketCount} asientos`,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    
    this.router.navigate(['/reservation-summary']);
  }

  goBack(): void {
    this.router.navigate(['/showtime-selection', this.reservation.movie?.id]);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}