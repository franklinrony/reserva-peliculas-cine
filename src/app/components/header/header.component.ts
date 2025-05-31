import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <a routerLink="/">CineReserva</a>
        </div>
        <nav class="navigation">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Cartelera</a></li>
            <li><a routerLink="/proximamente" routerLinkActive="active">Próximamente</a></li>
          </ul>
        </nav>
        <div class="theme-toggle">
          <button (click)="toggleTheme()" aria-label="Cambiar tema">
            <span *ngIf="themeService.isDarkTheme()">☀️</span>
            <span *ngIf="!themeService.isDarkTheme()">🌙</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}