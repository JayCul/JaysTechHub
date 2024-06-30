import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeChange: Subject<boolean> = new Subject<boolean>();

  constructor(private ngZone: NgZone) {
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === 'isDarkMode') {
      const isDarkMode = event.newValue === 'true';
      // Run inside Angular's zone to ensure change detection runs
      this.ngZone.run(() => {
        this.darkModeChange.next(isDarkMode);
      });
    }
  }

  getDarkModeChangeObservable() {
    return this.darkModeChange.asObservable();
  }

  checkInitialDarkMode(): boolean {
    return localStorage.getItem('isDarkMode') === 'true';
  }

  setDarkMode(isDarkMode: boolean): void {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
    this.darkModeChange.next(isDarkMode); // Emit the change immediately
  }
}