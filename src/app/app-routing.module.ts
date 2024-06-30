import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  { path: '', component: HomepageComponent }, // Eagerly load HomePageComponent
  { path: 'faq', component: FaqComponent } //Lazy load gallery
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
