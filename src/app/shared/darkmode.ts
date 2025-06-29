import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Make sure the service is available app-wide
})
export class DarkmodeService {
  private darkmodeSubject = new BehaviorSubject<boolean>(false);  // Default is false
  darkMode$ = this.darkmodeSubject.asObservable();

  constructor() {}

  // Toggle dark mode state
  toggleDarkmode(): void {
    // Correcting the toggle logic: Access the current value and flip it
    this.darkmodeSubject.next(!this.darkmodeSubject.getValue());
  }

  // Get the current dark mode state
  getCurrent(): boolean {
    return this.darkmodeSubject.getValue();
  }
}
