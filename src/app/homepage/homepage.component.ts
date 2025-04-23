import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';
import { ServicePopupComponent } from '../service-popup/service-popup.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private dialog: MatDialog
  ) {}

  ContactForm: FormGroup = this.builder.group({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Service: new FormControl('', [Validators.required]),
    Message: new FormControl(''),
  });

  dialogReference = MatDialogRef<any>;
  mailDetails: string | any = '';
  darkMode: any;
  private darkModeSubscription!: Subscription;
  landingImage(): string | any {
    if (this.darkMode == true)
      return './../../assets/images/Landing-Page-blackbg.png';
    else return './../../assets/images/Landing-Page-whitebg.png';
  }

  texts: string[] = [
    'Websites',
    'Logos',
    'Mobile Applications',
    'Flyers',
    'User Interfaces',
    'Brochures',
    'Graphics',
    'User Experience',
  ];

  services: any = [
    {
      id: 1,
      name: 'Website Design and Development',
      description: 'From Small Scale to Enterprise level',
      img: './../../assets/images/world-wide-web.png',
    },
    {
      id: 2,
      name: 'Graphics Design',
      description: 'Logos, Flyers Banners & brochures',
      img: './../../assets/images/paint-brush-svgrepo-com.png',
    },
    {
      id: 3,
      name: 'Mobile App Development',
      description: 'For iOS and Android platforms',
      img: './../../assets/images/app-dev.png',
    },
    {
      id: 4,
      name: 'Custom Solutions',
      description: 'Web Applications/Integrated Solutions',
      img: './../../assets/images/hands.png',
    },
    {
      id: 5,
      name: 'Support and Maintenance',
      description: 'Professional After-delivery Services',
      img: './../../assets/images/technical-support_12028586.png',
    },
  ];
  currentIndex = 0;
  previousIndex = -1;
  private rotationInterval: any;

  startTextRotation(): void {
    this.rotationInterval = setInterval(() => {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    }, 3000); // Change text every 3 seconds (2 seconds display + 1 second fade)
  }

  ngOnInit(): void {
    this.startTextRotation();

    this.darkMode = this.darkModeService.checkInitialDarkMode();
    console.log(this.darkMode);

    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);

    // Unsubscribe to prevent memory leaks
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

  // image():string{

  // }

  // emailjs.send("Jays Tech Hub","template_qbj72gl",{
  //   from_name: "Jaystechub",
  //   to_name: "Justin",
  //   message: "Hi, this is just a test",
  //   reply_to: "jaystechub@gmail.com",
  //   });

  async sendEmail() {
    console.log(this.ContactForm.value);
    emailjs.init('8qcR3oXe6XPoyFsa_');
    this.mailDetails = {
      from_name: this.ContactForm.value.Name,
      to_name: "Jay's Tech Hub Limited",
      message: this.ContactForm.value.Message,
      reply_to: this.ContactForm.value.Email,
      subject: this.ContactForm.value.Service,
    };
    // emailjs
    //   .sendForm('Jays Tech Hub', 'template_qbj72gl', e.target as HTMLFormElement, {
    //     publicKey: '8qcR3oXe6XPoyFsa_',

    //   })

    try {
      let response = await emailjs.send(
        'Jays Tech Hub',
        'template_8tao4oi',
        this.mailDetails
      );

      // Check if the response has a status indicating success (e.g., 200 or 2xx)
      if (
        response.status === 200 ||
        (response.status >= 200 && response.status < 300)
      ) {
        console.log('Email sent successfully!');
        this.toastr.success('Email sent successfully!', 'Success!');
        this.ContactForm.reset();
        // Handle success
      } else {
        console.error('Email sending failed. Status:', response.status);
        this.toastr.error('Email sending failed...', 'Failed!', {
          timeOut: 3000,
        });
        // Handle failure
      }
    } catch (error) {
      console.error('An error occurred while sending the email:', error);
      this.toastr.error('Failed!', 'Service Temporarily Unavailable...', {
        timeOut: 3000,
      });
      // Handle error
    }
    // .then(
    //   () => {
    //     console.log('SUCCESS!');
    //   },
    //   (error) => {
    //     console.log('FAILED...', (error as EmailJSResponseStatus).text);
    //   },
    // );
  }

  popup(data: any): void {
    // const dialogReference  = this.dialog.open(ServicePopupComponent)

    // this.dialogReference.afterClosed().subscribe(() => {})

    let dialogRef = this.dialog.open(ServicePopupComponent, {
      data: data,
      width: 'max-content',
      height: 'max-content',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('closed');
    });
  }

  downloading() {
    this.toastr.success('Downloading File...', 'Connected!');
  }
}
