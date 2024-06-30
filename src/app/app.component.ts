import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';
import { DarkModeService } from './service/dark-mode.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jay\'s Tech Hub';
  darkMode: any;
  private darkModeSubscription!: Subscription; // Use definite assignment assertion

  constructor(private darkModeService: DarkModeService) {}
  
  onActivate(event:any) {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)
  }

  ngOnInit(): void {
    initFlowbite();
    // Check initial dark mode state
    this.darkMode = this.darkModeService.checkInitialDarkMode();
    console.log("Initial", this.darkMode);
    
    // Subscribe to dark mode changes
    this.darkModeSubscription = this.darkModeService.getDarkModeChangeObservable().subscribe(
      (isDarkMode) => {
        this.darkMode = isDarkMode;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

}
