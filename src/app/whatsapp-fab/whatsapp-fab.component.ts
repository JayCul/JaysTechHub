import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      *ngIf="visible"
      href="https://wa.me/+2347041274446?text=Hi,%20I'm%20interested%20in%20your%20services.%20Can%20you%20assist%20me?"
      target="_blank"
      class="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <i class="fa-brands fa-whatsapp"></i>
    </a>
  `,
  styles: [`
    .whatsapp-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #25d366;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
      z-index: 999;
      transition: all 0.3s ease;
      animation: pulse-whatsapp 2s infinite;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
      }

      @media (max-width: 640px) {
        width: 52px;
        height: 52px;
        bottom: 1.5rem;
        right: 1.5rem;
        font-size: 1.5rem;
      }
    }

    @keyframes pulse-whatsapp {
      0%, 100% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4); }
      50% { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4), 0 0 0 10px rgba(37, 211, 102, 0); }
    }
  `],
})
export class WhatsappFabComponent implements OnInit {
  visible = false;

  @HostListener('window:scroll')
  onScroll() {
    this.visible = window.scrollY > window.innerHeight * 0.5;
  }

  ngOnInit() {
    this.onScroll();
  }
}
