import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Showtime } from '../models/showtime.model';
import { Seat } from '../models/seat.model';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private currentReservation = new BehaviorSubject<Reservation>({
    movie: null,
    showtime: null,
    seats: [],
    ticketCount: 0,
    totalPrice: 0
  });

  private seatRows = 8;
  private seatsPerRow = 12;
  private occupiedSeats: Map<number, Set<string>> = new Map();

  constructor() {
    // Simular algunos asientos ocupados para cada sala
    for (let i = 1; i <= 6; i++) {
      const occupiedSet = new Set<string>();
      // Generar aleatoriamente entre 10 y 25 asientos ocupados
      const occupiedCount = Math.floor(Math.random() * 16) + 10;
      
      for (let j = 0; j < occupiedCount; j++) {
        const row = String.fromCharCode(65 + Math.floor(Math.random() * this.seatRows));
        const number = Math.floor(Math.random() * this.seatsPerRow) + 1;
        occupiedSet.add(`${row}${number}`);
      }
      
      this.occupiedSeats.set(i, occupiedSet);
    }
  }

  getCurrentReservation(): Observable<Reservation> {
    return this.currentReservation.asObservable();
  }

  setMovie(movie: Movie | null): void {
    const current = this.currentReservation.getValue();
    this.currentReservation.next({
      ...current,
      movie,
      showtime: null,
      seats: [],
      ticketCount: 0,
      totalPrice: 0
    });
  }

  setShowtime(showtime: Showtime | null): void {
    const current = this.currentReservation.getValue();
    this.currentReservation.next({
      ...current,
      showtime,
      seats: [],
      ticketCount: 0,
      totalPrice: 0
    });
  }

  setTicketCount(count: number): void {
    const current = this.currentReservation.getValue();
    this.currentReservation.next({
      ...current,
      ticketCount: count,
      totalPrice: this.calculatePrice(count, current.showtime?.format),
      seats: [] // Reset seats when ticket count changes
    });
  }

  setSeats(seats: Seat[]): void {
    const current = this.currentReservation.getValue();
    this.currentReservation.next({
      ...current,
      seats
    });
  }

  getAvailableSeats(roomId: number): Seat[] {
    const seats: Seat[] = [];
    const occupiedSeatIds = this.occupiedSeats.get(roomId) || new Set<string>();
    
    // Generar todos los asientos para la sala
    for (let i = 0; i < this.seatRows; i++) {
      const row = String.fromCharCode(65 + i);
      for (let j = 1; j <= this.seatsPerRow; j++) {
        const seatId = `${row}${j}`;
        seats.push({
          id: seatId,
          row,
          number: j,
          isOccupied: occupiedSeatIds.has(seatId),
          isSelected: false
        });
      }
    }
    
    return seats;
  }

  getRoomIdFromShowtime(showtime: Showtime | null): number {
    if (!showtime) return 1;
    // Extraer número de sala del formato "Sala X"
    const roomMatch = showtime.room.match(/Sala (\d+)/);
    return roomMatch ? parseInt(roomMatch[1], 10) : 1;
  }

  calculatePrice(ticketCount: number, format?: string): number {
    // Precios base por tipo de formato
    const basePrice = format === 'IMAX' ? 120 : format === '3D' ? 100 : 80;
    return ticketCount * basePrice;
  }

  completeReservation(): void {
    const currentReservation = this.currentReservation.getValue();
    
    // Actualizar asientos ocupados
    if (currentReservation.showtime) {
      const roomId = this.getRoomIdFromShowtime(currentReservation.showtime);
      const occupiedSet = this.occupiedSeats.get(roomId) || new Set<string>();
      
      currentReservation.seats.forEach(seat => {
        occupiedSet.add(seat.id);
      });
      
      this.occupiedSeats.set(roomId, occupiedSet);
    }
    
    // Reiniciar reserva actual
    this.currentReservation.next({
      movie: null,
      showtime: null,
      seats: [],
      ticketCount: 0,
      totalPrice: 0
    });
  }
}