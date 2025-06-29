// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Make sure the service is available app-wide
})
export class ThemeService{
  private themeSubject = new BehaviorSubject<string>('theme-default');  // Default theme
  theme$ = this.themeSubject.asObservable();  // Observable to subscribe to

  constructor() {}

  // Set a new theme
  setTheme(theme: string) {
    this.themeSubject.next(theme);  // Update the theme
  }

  // Get the current theme (optional)
  getCurrentTheme(): string {
    return this.themeSubject.getValue();
  }
}
