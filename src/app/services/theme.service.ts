import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  darkTheme$ = this.darkTheme.asObservable();

  constructor() {
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkTheme.next(savedTheme === 'dark');
    } else {
      // Check if user prefers dark mode based on system settings
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkTheme.next(prefersDark);
    }
  }

  toggleTheme(): void {
    const newTheme = !this.darkTheme.value;
    this.darkTheme.next(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }

  isDarkTheme(): boolean {
    return this.darkTheme.value;
  }
}