import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';
import { EmailService, ContactFormData } from '../service/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private darkModeService: DarkModeService,
    private emailService: EmailService
  ) {}

  ContactForm: FormGroup = this.builder.group({
    Name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Phone: new FormControl(''),
    Company: new FormControl(''),
    Service: new FormControl('', [Validators.required]),
    Budget: new FormControl(''),
    Message: new FormControl('', [Validators.required, Validators.minLength(20)]),
  });

  submitting = false;
  submitted = false;
  darkMode: any;

  budgetRanges = [
    'Under ₦200,000',
    '₦200,000 – ₦500,000',
    '₦500,000 – ₦1,000,000',
    '₦1,000,000+',
    'Not sure yet',
  ];
  private darkModeSubscription!: Subscription;

  // ── Hero Rotating Text ──
  texts: string[] = [
    'Websites',
    'Mobile Apps',
    'Logos & Graphics',
    'User Interfaces',
    'Custom Solutions',
  ];
  currentIndex = 0;
  previousIndex = -1;
  private rotationInterval: any;

  // ── Stats (animated counters) ──
  stats = [
    { value: 0, target: 100, suffix: '+', label: 'Projects Delivered' },
    { value: 0, target: 50, suffix: '+', label: 'Happy Clients' },
    { value: 0, target: 5, suffix: '+', label: 'Years Experience' },
    { value: 0, target: 24, suffix: '/7', label: 'Support Available' },
  ];
  statsAnimated = false;

  // ── Showcase Shuffle ──
  showcasePhase: number = 0;
  private showcaseInterval: any;

  getCardZIndex(cardIndex: number): number {
    const position = (cardIndex - this.showcasePhase + 3) % 3;
    if (position === 0) return 3; // Front
    if (position === 1) return 2; // Middle
    return 1; // Back
  }

  // ── Services ──
  services = [
    {
      id: 1,
      name: 'Website Design & Development',
      description:
        'From stunning landing pages to complex e-commerce platforms — responsive, fast, and built to convert.',
      icon: 'fa-solid fa-globe',
      color: '#3b82f6',
      expanded: false,
      details:
        'We create visually stunning and highly functional websites tailored to your brand\'s unique identity. Our websites are designed with user experience in mind, ensuring they are not only easy to navigate but also responsive across all screen sizes.',
      img: 'assets/images/computer-phone-tablet-desk_852340-14728.jpg',
    },
    {
      id: 2,
      name: 'Graphics Design',
      description:
        'Logos, flyers, brochures, and marketing materials that make your brand unforgettable.',
      icon: 'fa-solid fa-palette',
      color: '#8b5cf6',
      expanded: false,
      details:
        'We offer high-quality graphic design services for logos, flyers, brochures, and other marketing materials that help you convey your message clearly and attractively. We focus on creating designs that are both memorable and versatile.',
      img: 'assets/images/Landing-Page-whitebg.png',
    },
    {
      id: 3,
      name: 'Mobile App Development',
      description:
        'Native and cross-platform apps for iOS & Android that your users will love.',
      icon: 'fa-solid fa-mobile-screen-button',
      color: '#10b981',
      expanded: false,
      details:
        'Our mobile app development services cover everything from initial concept and design to development and deployment. We create user-friendly, innovative apps for both iOS and Android platforms.',
      img: 'assets/images/Mobile_Development_applications.avif',
    },
    {
      id: 4,
      name: 'Custom Solutions',
      description:
        'Web applications, integrated systems, and tailored digital products for unique business needs.',
      icon: 'fa-solid fa-code',
      color: '#f59e0b',
      expanded: false,
      details:
        'We are adept at developing custom digital solutions — whether it\'s a custom web application, an advanced digital marketing strategy, or an integrated solution that combines various services.',
      img: 'assets/images/customized-solutions-500x500.webp',
    },
    {
      id: 5,
      name: 'UI/UX Design',
      description:
        'Intuitive interfaces and user experiences that keep customers coming back.',
      icon: 'fa-solid fa-pen-ruler',
      color: '#ec4899',
      expanded: false,
      details:
        'We specialize in creating intuitive and user-friendly interfaces for websites and mobile applications, ensuring a seamless user experience that drives engagement and conversion.',
      img: 'assets/images/customized-solutions-500x500.webp',
    },
    {
      id: 6,
      name: 'Support & Maintenance',
      description:
        'Professional after-delivery services to keep your digital assets secure and up-to-date.',
      icon: 'fa-solid fa-headset',
      color: '#06b6d4',
      expanded: false,
      details:
        'We provide ongoing support and maintenance services to ensure that your digital assets remain up-to-date, secure, and fully functional. Regular updates and performance monitoring included.',
      img: 'assets/images/service-desk-professionals-01.jpg',
    },
  ];

  // ── Portfolio ──
  portfolioFilter: string = 'all';
  portfolio = [
    // Web Projects (from assets/images/projects/)
    {
      name: 'NuelJeff International',
      category: 'web',
      categoryLabel: 'Website',
      description: 'Corporate website for an international trading & logistics company.',
      image: 'assets/images/projects/NuelJeff-International.png',
    },
    {
      name: 'Alone Portfolio',
      category: 'web',
      categoryLabel: 'Website',
      description: 'Personal portfolio website with modern design and smooth animations.',
      image: 'assets/images/projects/Alone-portfolio.png',
    },
    {
      name: 'Doris Portfolio',
      category: 'web',
      categoryLabel: 'Website',
      description: 'Creative portfolio website showcasing work with a unique aesthetic.',
      image: 'assets/images/projects/Doris-portfolio.png',
    },
    {
      name: 'Logistics Portal',
      category: 'web',
      categoryLabel: 'Web App',
      description: 'Full-featured logistics management platform with real-time tracking.',
      image: 'assets/images/projects/Logistics-portal.png',
    },
    {
      name: 'Admin Dashboard',
      category: 'web',
      categoryLabel: 'Web App',
      description: 'Admin panel for logistics operations with analytics and management tools.',
      image: 'assets/images/projects/Logistics-portal-admin-panel.png',
    },
    {
      name: 'Hospital Management System',
      category: 'web',
      categoryLabel: 'Web App',
      description: 'Healthcare management platform for patient records and operations.',
      image: 'assets/images/projects/Hospital-management-system.png',
    },
    // Design Projects (from assets/images/designs/)
    {
      name: '7th Heaven Gods',
      category: 'design',
      categoryLabel: 'Logo Design',
      description: 'E-Sports team logo design.',
      image: 'assets/images/designs/7th-Heaven-Logo.jpg',
    },
    {
      name: 'Berakah Technologies',
      category: 'design',
      categoryLabel: 'Logo Design',
      description: 'Brand identity and logo design for a technology company.',
      image: 'assets/images/designs/Berakah-Technologies-logo.jpg',
    },
    {
      name: "Dimma's Kitchen",
      category: 'design',
      categoryLabel: 'Ad Design',
      description: 'Promotional advertisement design for a food & catering business.',
      image: 'assets/images/designs/Dimma\'s-Kitchen-ad.jpg',
    },
    {
      name: "Programming ESP32 and Arduino",
      category: 'design',
      categoryLabel: 'Flyer Design',
      description: 'Professional flyer design for event promotion and marketing.',
      image: 'assets/images/designs/Israels-flyer.jpg',
    },
    {
      name: 'StegoSnap',
      category: 'design',
      categoryLabel: 'Logo Design',
      description: 'Modern logo design for a steganography application.',
      image: 'assets/images/designs/StegoSnapLogo.jpg',
    },
  ];

  get filteredPortfolio() {
    if (this.portfolioFilter === 'all') return this.portfolio;
    return this.portfolio.filter((p) => p.category === this.portfolioFilter);
  }

  // ── Pricing ──
  pricingPlans = [
    {
      name: 'Starter',
      price: '₦200,000',
      priceNote: 'Excluding domain costs',
      description: 'Perfect for small businesses looking to establish their online presence.',
      cta: 'Get Started',
      highlighted: false,
      features: [
        'Online Visibility & Web Presence',
        'Responsive Single-Page Website',
        'Mobile-Friendly Design',
        'Contact Form Integration',
        'Social Media Links',
        'Basic SEO Optimization',
        'SSL Security Certificate',
        '1 Month Free Support',
      ],
    },
    {
      name: 'Professional',
      price: 'Custom Quote',
      priceNote: 'Tailored to your needs',
      description: 'For growing businesses that need advanced features and functionality.',
      cta: 'Contact for Quote',
      highlighted: true,
      features: [
        'Everything in Starter',
        'Multi-Page Website (up to 10 pages)',
        'Custom UI/UX Design',
        'Content Management System',
        'E-Commerce Functionality',
        'Advanced SEO & Analytics',
        'Email Integration',
        'Third-Party API Integration',
        '3 Months Free Support',
        'Performance Optimization',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom Quote',
      priceNote: 'For large-scale projects',
      description: 'Full-scale digital solutions for enterprises with complex requirements.',
      cta: 'Contact for Quote',
      highlighted: false,
      features: [
        'Everything in Professional',
        'Unlimited Pages & Features',
        'Custom Web Application',
        'Mobile App Development',
        'Database & Backend Development',
        'Payment Gateway Integration',
        'User Authentication System',
        'Admin Dashboard',
        'Dedicated Project Manager',
        '6 Months Free Support',
        'Priority Bug Fixes',
        'Scalable Architecture',
      ],
    },
  ];

  // ── Testimonials ──
  testimonials = [
    {
      name: 'NuelJeff International',
      role: 'Client — Corporate Website',
      quote:
        'Thank you. Your brain get oil! I will link you to people that are in need of your professional service.',
      avatar: 'fa-solid fa-building',
    },
    {
      name: 'Alone',
      role: 'Client — Portfolio Website',
      quote:
        "I don't have any complaints or edit to be very honest. Thank you man, I appreciate you.",
      avatar: 'fa-solid fa-user',
    },
    {
      name: 'Doris',
      role: 'Client — Portfolio Website',
      quote: 'My portfolio looks sooo cool.... 🔥',
      avatar: 'fa-solid fa-user',
    },
  ];
  currentTestimonial = 0;
  private testimonialInterval: any;

  // ── Methods ──

  startTextRotation(): void {
    this.rotationInterval = setInterval(() => {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    }, 3000);
  }

  toggleService(index: number): void {
    this.services[index].expanded = !this.services[index].expanded;
  }

  setPortfolioFilter(filter: string): void {
    this.portfolioFilter = filter;

    // Re-observe newly created portfolio cards after Angular re-renders
    setTimeout(() => {
      document
        .querySelectorAll('.portfolio-card.animate-scale-in')
        .forEach((el) => {
          if (!el.classList.contains('is-visible')) {
            this.observer.observe(el);
          }
        });
    }, 50);
  }

  nextTestimonial(): void {
    this.currentTestimonial =
      (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial =
      (this.currentTestimonial - 1 + this.testimonials.length) %
      this.testimonials.length;
  }

  setTestimonial(index: number): void {
    this.currentTestimonial = index;
    this.resetTestimonialTimer();
  }

  private resetTestimonialTimer(): void {
    clearInterval(this.testimonialInterval);
    this.testimonialInterval = setInterval(() => this.nextTestimonial(), 6000);
  }

  animateStats(): void {
    if (this.statsAnimated) return;
    this.statsAnimated = true;

    this.stats.forEach((stat) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          stat.value = stat.target;
          clearInterval(timer);
        } else {
          stat.value = Math.floor(current);
        }
      }, duration / steps);
    });
  }

  // ── IntersectionObserver for scroll animations ──
  private observer!: IntersectionObserver;

  setupScrollAnimations(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Trigger stats animation when stats section is visible
            if (entry.target.id === 'stats-section') {
              this.animateStats();
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      document
        .querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-in')
        .forEach((el) => this.observer.observe(el));
    }, 100);
  }

  // ── Email via Resend ──
  sendEmail(): void {
    if (this.ContactForm.invalid || this.submitting) return;

    this.submitting = true;
    this.submitted = false;

    const formData: ContactFormData = {
      name: this.ContactForm.value.Name,
      email: this.ContactForm.value.Email,
      phone: this.ContactForm.value.Phone || undefined,
      company: this.ContactForm.value.Company || undefined,
      service: this.ContactForm.value.Service,
      budget: this.ContactForm.value.Budget || undefined,
      message: this.ContactForm.value.Message,
    };

    this.emailService.sendContactEmail(formData).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
        this.toastr.success(
          'Your message has been sent! We\'ll get back to you within 24 hours.',
          'Message Sent! 🚀'
        );
        this.ContactForm.reset();

        // Reset submitted state after 5 seconds
        setTimeout(() => (this.submitted = false), 5000);
      },
      error: (err) => {
        this.submitting = false;
        console.error('Email send error:', err);
        this.toastr.error(
          'Something went wrong. Please try again or contact us via WhatsApp.',
          'Failed to Send',
          { timeOut: 5000 }
        );
      },
    });
  }

  /** Character count for the message textarea */
  get messageLength(): number {
    return this.ContactForm.get('Message')?.value?.length || 0;
  }

  downloading() {
    this.toastr.success('Downloading File...', 'Connected!');
  }

  // ── Lifecycle ──
  ngOnInit(): void {
    this.startTextRotation();
    this.resetTestimonialTimer();

    // Start endless showcase shuffle
    this.showcaseInterval = setInterval(() => {
      this.showcasePhase = (this.showcasePhase + 1) % 3;
    }, 3000);
    this.darkMode = this.darkModeService.checkInitialDarkMode();
    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
      });
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);
    clearInterval(this.testimonialInterval);
    clearInterval(this.showcaseInterval);
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
