import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="movie-card" [routerLink]="disableNavigation ? null : ['/movies', movie.id]">
      <div class="movie-poster">
        <img [src]="movie.poster" [alt]="movie.title">
        <div class="movie-rating">{{ movie.rating }}</div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-genre">{{ movie.genre }}</p>
        <p class="movie-duration">{{ movie.duration }} min</p>
      </div>
    </div>
  `,
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() disableNavigation = false;
}