import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private darkModeSubscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    private darkModeService: DarkModeService,
    private el: ElementRef
  ) {}

  whiteLogo: string = 'assets/images/Jays-large-nobg-white-text.png';
  darkLogo: string = 'assets/images/Jays-large-nobg.png';
  home: boolean = true;
  sunIcon: string = 'fa-regular fa-sun';
  moonIcon: string = 'fa-regular fa-moon';
  themeIcon: string = this.moonIcon;
  fileLocation: string = this.darkLogo;
  darkMode: boolean = false;
  mobileMenuOpen: boolean = false;
  scrolled: boolean = false;
  activeSection: string = 'home';

  private sectionIds: string[] = ['home', 'about', 'services', 'portfolio', 'pricing', 'contact'];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    if (!this.home) return;

    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sectionIds[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          this.activeSection = this.sectionIds[i];
          return;
        }
      }
    }
    this.activeSection = 'home';
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    if (this.router.url !== '/' && this.router.url !== '') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  routeToFAQ(): void {
    this.closeMobileMenu();
    this.router.navigate(['/faq']);
    this.home = false;
    this.activeSection = ''
  }

  routeToHome(): void {
    this.closeMobileMenu();
    this.router.navigate(['/']);
    this.home = true;
  }

  toggleLogo(): void {
    if (this.darkMode) {
      this.themeIcon = this.sunIcon;
      this.fileLocation = this.whiteLogo;
    } else {
      this.themeIcon = this.moonIcon;
      this.fileLocation = this.darkLogo;
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.toggleLogo();
    this.darkModeService.setDarkMode(this.darkMode);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/faq') {
          this.home = false;
        } else {
          this.home = true;
        }
      });

    this.darkMode = this.darkModeService.checkInitialDarkMode();
    this.toggleLogo();

    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
        this.toggleLogo();
      });
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
    document.body.style.overflow = '';
  }
}
