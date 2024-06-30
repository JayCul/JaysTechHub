import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomepageComponent } from './homepage/homepage.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePopupComponent } from './service-popup/service-popup.component';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // ThemeSwitcherComponent,
    HomepageComponent,
    FaqComponent,
    FooterComponent,
    ServicePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    NgxPageScrollModule,
    NgxPageScrollCoreModule.forRoot({duration: 400})
    
  ],
  exports: [FaqComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
