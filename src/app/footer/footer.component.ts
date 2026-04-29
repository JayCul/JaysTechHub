import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  year = new Date().getFullYear();

  services = [
    'Website Design',
    'Graphics Design',
    'Mobile App Development',
    'Custom Solutions',
    'UI/UX Design',
    'Support & Maintenance',
  ];

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
