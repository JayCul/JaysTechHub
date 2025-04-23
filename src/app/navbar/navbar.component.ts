import { Component, OnDestroy, OnInit, booleanAttribute } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Collapse, CollapseInterface, initFlowbite } from 'flowbite';
import { Subscription, filter } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private darkModeSubscription: Subscription = new Subscription();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private darkModeService: DarkModeService
  ) {}

  // set the target element that will be collapsed or expanded (eg. navbar menu)
  whiteLogo: string = '../../assets/images/Jays-large-nobg-white-text.png';
  darkLogo: string = '../../assets/images/Jays-large-nobg.png';
  home: boolean = true;
  sunLogo: string = 'fa-regular fa-sun';
  moonLogo: string = 'fa-regular fa-moon';
  themeIcon: string = this.moonLogo;
  menuIcon: string = 'fa-solid fa-bars';
  fileLocation: string = this.darkLogo;
  darkMode: boolean | any = localStorage.getItem('isDarkMode');

  // toggleTheme(){
  //   localStorage.setItem('isDarkMode', this.darkMode ? 'true' : 'false');

  // }

  toggleMenu() {
    if (this.menuIcon === 'fa-solid fa-bars') {
      this.menuIcon = 'fa-solid fa-xmark';
    } else if (this.menuIcon === 'fa-solid fa-xmark') {
      this.menuIcon = 'fa-solid fa-bars';
    }
  }

  routeToFAQ(): void {
    this.router.navigate(['/faq']);
    this.home = false;
  }

  routeToHome(): void {
    this.router.navigate(['/']);
    this.home = true;
  }

  toggleLogo() {
    // this.darkMode = localStorage.getItem("isDarkMode");

    if (localStorage.getItem('isDarkMode') == 'false') {
      console.log('Moon Logo');
      this.fileLocation = this.darkLogo;
      this.themeIcon = this.moonLogo;
    } else if (localStorage.getItem('isDarkMode') == 'true') {
      console.log('Sun Logo');
      this.themeIcon = this.sunLogo;
      this.fileLocation = this.whiteLogo;
    }
  }

  toggleDarkMode(): void {
    // this.darkMode = localStorage.getItem('isDarkMode');
    this.darkMode = !this.darkMode;
    localStorage.setItem('isDarkMode', this.darkMode.toString());
    // Optionally notify service or other components
    this.toggleLogo();
    this.darkModeService.setDarkMode(this.darkMode);
  }

  ngOnInit(): void {
    initFlowbite();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/faq') {
          this.home = false;

          // Perform your specific action here
        } else {
          this.home = true;
          // Perform other actions or leave this part empty
        }
      });
    console.log(this.router.url);
    this.toggleLogo();
    // Check initial dark mode state
    this.darkMode = this.darkModeService.checkInitialDarkMode();

    // Subscribe to dark mode changes
    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }
}
