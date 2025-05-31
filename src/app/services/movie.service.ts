import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { Showtime } from '../models/showtime.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Datos simulados para la aplicación
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Dune: Parte Dos',
      poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'Paul Atreides se une a los Fremen y comienza un viaje espiritual y político para vengar la traición contra su familia.',
      duration: 166,
      rating: 'PG-13',
      director: 'Denis Villeneuve',
      genre: 'Ciencia ficción',
      showtimes: [
        { id: 1, movieId: 1, time: '15:30', date: '2025-05-01', room: 'Sala 1', language: 'Español', format: '2D' },
        { id: 2, movieId: 1, time: '18:45', date: '2025-05-01', room: 'Sala 2', language: 'Español', format: 'IMAX' },
        { id: 3, movieId: 1, time: '21:15', date: '2025-05-01', room: 'Sala 3', language: 'Subtitulada', format: '3D' }
      ]
    },
    {
      id: 2,
      title: 'El Planeta de los Simios: Nuevo Reino',
      poster: 'https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'Varias generaciones después del reinado de César, los simios son la especie dominante y los humanos viven en las sombras.',
      duration: 140,
      rating: 'PG-13',
      director: 'Wes Ball',
      genre: 'Ciencia ficción',
      showtimes: [
        { id: 4, movieId: 2, time: '14:00', date: '2025-05-01', room: 'Sala 4', language: 'Español', format: '2D' },
        { id: 5, movieId: 2, time: '17:30', date: '2025-05-01', room: 'Sala 5', language: 'Español', format: 'IMAX' },
        { id: 6, movieId: 2, time: '20:00', date: '2025-05-01', room: 'Sala 6', language: 'Subtitulada', format: '3D' }
      ]
    },
    {
      id: 3,
      title: 'La Historia Secreta',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'Un grupo de estudiantes universitarios de élite descubre que sus acciones tienen consecuencias mortales.',
      duration: 152,
      rating: 'R',
      director: 'Mimi Cave',
      genre: 'Drama, Thriller',
      showtimes: [
        { id: 7, movieId: 3, time: '16:15', date: '2025-05-01', room: 'Sala 1', language: 'Subtitulada', format: '2D' },
        { id: 8, movieId: 3, time: '19:30', date: '2025-05-01', room: 'Sala 2', language: 'Español', format: '2D' },
        { id: 9, movieId: 3, time: '22:00', date: '2025-05-01', room: 'Sala 3', language: 'Subtitulada', format: '2D' }
      ]
    },
    {
      id: 4,
      title: 'Godzilla x Kong: El Nuevo Imperio',
      poster: 'https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'Godzilla y Kong deben unir fuerzas contra una colosal amenaza desconocida oculta en nuestro mundo.',
      duration: 115,
      rating: 'PG-13',
      director: 'Adam Wingard',
      genre: 'Acción, Ciencia ficción',
      showtimes: [
        { id: 10, movieId: 4, time: '14:45', date: '2025-05-01', room: 'Sala 4', language: 'Español', format: '3D' },
        { id: 11, movieId: 4, time: '17:15', date: '2025-05-01', room: 'Sala 5', language: 'Español', format: 'IMAX' },
        { id: 12, movieId: 4, time: '20:30', date: '2025-05-01', room: 'Sala 6', language: 'Subtitulada', format: '3D' }
      ]
    }
  ];

  private upcomingMovies: Movie[] = [
    {
      id: 101,
      title: 'Avatar 3',
      poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'La saga continúa en Pandora con nuevas aventuras y desafíos para Jake Sully y Neytiri.',
      duration: 180,
      rating: 'PG-13',
      director: 'James Cameron',
      genre: 'Ciencia ficción',
      showtimes: [],
      releaseDate: '2025-12-18',
      ticketsOnSaleDate: '2025-11-01'
    },
    {
      id: 102,
      title: 'Spider-Man: Más Allá del Multiverso',
      poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=600',
      synopsis: 'Miles Morales se enfrenta a nuevas amenazas en el multiverso.',
      duration: 135,
      rating: 'PG',
      director: 'Joaquim Dos Santos',
      genre: 'Animación, Acción',
      showtimes: [],
      releaseDate: '2025-07-10',
      ticketsOnSaleDate: '2025-06-01'
    }
  ];

  private selectedMovie = new BehaviorSubject<Movie | null>(null);
  private selectedShowtime = new BehaviorSubject<Showtime | null>(null);

  constructor() { }

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.movies.find(m => m.id === id);
    return of(movie);
  }

  getShowtimesForMovie(movieId: number): Observable<Showtime[]> {
    const movie = this.movies.find(m => m.id === movieId);
    return of(movie?.showtimes || []);
  }

  setSelectedMovie(movie: Movie | null): void {
    this.selectedMovie.next(movie);
    if (!movie) {
      this.selectedShowtime.next(null);
    }
  }

  getSelectedMovie(): Observable<Movie | null> {
    return this.selectedMovie.asObservable();
  }

  setSelectedShowtime(showtime: Showtime | null): void {
    this.selectedShowtime.next(showtime);
  }

  getSelectedShowtime(): Observable<Showtime | null> {
    return this.selectedShowtime.asObservable();
  }

  getUpcomingMovies(): Observable<Movie[]> {
    return of(this.upcomingMovies);
  }
}