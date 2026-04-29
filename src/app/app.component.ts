import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from './service/dark-mode.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { WhatsappFabComponent } from './whatsapp-fab/whatsapp-fab.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, WhatsappFabComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  title = "Jay's Tech Hub";
  darkMode: any;
  private darkModeSubscription!: Subscription;

  constructor(private darkModeService: DarkModeService) {}

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnInit(): void {
    this.darkMode = this.darkModeService.checkInitialDarkMode();

    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
      });
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
