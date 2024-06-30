import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-service-popup',
  templateUrl: './service-popup.component.html',
  styleUrls: ['./service-popup.component.scss']
})


export class ServicePopupComponent {
  
  constructor(
    public dialogRef: MatDialogRef<any>,
    private darkModeService: DarkModeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  darkMode: any;
  private darkModeSubscription!: Subscription;
  private rotationInterval: any;
  heading: string = "";
  content: string = ""; 
  imageUrl: string = "";

  assign(){
    let service : number = this.data;

    switch (service) {
        case 1:
          this.heading = "Website Design and Development";
          this.content = "We create visually stunning and highly functional websites that are tailored to your brand’s unique identity / needs. Our websites are designed with user experience in  mind, ensuring that they are not only easy to navigate but also responsive across all screen sizes. From simple informational sites to complex e-commerce platforms."
          this.imageUrl = "./../../assets/images/computer-phone-tablet-desk_852340-14728.jpg";
          console.log("First Option.");
          break;
        case 2:
          this.heading = "Graphics Design - Logo, Flyer & Other Designs";
          this.content = "We offer high-quality graphic design services for logos, flyers, brochures, and other marketing materials that help you convey your message clearly and attractively. We focus on creating designs that are both memorable and versatile, ensuring they look great across all mediums and formats";
          if (localStorage.getItem("isDarkMode") == "false") {
            this.imageUrl = "./../../assets/images/Landing-Page-whitebg.png";
            
          } else this.imageUrl = "./../../assets/images/Landing-Page-blackbg.png";
          console.log("Second Option.");
          break;
        case 3:
          this.heading = "Mobile App Development";
          this.content = "In today’s mobile-first world, having a dedicated app can significantly enhance customer engagement and business growth. Our mobile app development services cover everything from initial concept and design to development and deployment. We create user-friendly, innovative apps for both iOS and Android platforms that meet your business needs and exceed user expectations"
          this.imageUrl = "./../../assets/images/Mobile_Development_applications.avif";
          console.log("Third Option");
            break;
        case 4:
          this.heading = "Custom Solutions";
          this.content = "We are adept at developing custom digital solutions whether it’s a custom web application, an advanced digital marketing strategy, or an integrated solution that combines various services, we’ve got you covered.";
          this.imageUrl = "./../../assets/images/customized-solutions-500x500.webp";
            console.log("Fourth Option");
            break;
        case 5:
          this.heading = "Support and Maintenance";
          this.content = "We provide ongoing support and maintenance services to ensure that your digital assets remain up-to-date, secure, and fully functional.";
          this.imageUrl = "./../../assets/images/service-desk-professionals-01.jpg";
          console.log("Fifth Option");
            break;
        default:
          this.heading = "Loading...";
          this.content = "Loading...";
          this.imageUrl = "./../../assets/images/Landing-Page-blackbg.png";
            console.log("No such day exists!");
            break;
    }
  }

  ngOnInit() {
    console.log(this.data);
    this.assign();
    this.darkMode = this.darkModeService.checkInitialDarkMode();
    console.log(this.darkMode);

    this.darkModeSubscription = this.darkModeService.getDarkModeChangeObservable().subscribe(
      (isDarkMode) => {
        this.darkMode = isDarkMode;
      }
    );  
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);

    // Unsubscribe to prevent memory leaks
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

}
