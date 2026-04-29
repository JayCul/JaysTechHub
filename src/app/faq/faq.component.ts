import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../service/dark-mode.service';

interface FaqItem {
  question: string;
  answer: string;
  icon: string;
  expanded: boolean;
  details?: { title: string; description: string }[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FaqComponent implements OnInit, OnDestroy, AfterViewInit {
  darkMode: any;
  private darkModeSubscription!: Subscription;
  private observer!: IntersectionObserver;

  constructor(private darkModeService: DarkModeService) {}

  faqs: FaqItem[] = [
    {
      question: 'What kind of websites do you build?',
      icon: 'fa-solid fa-globe',
      expanded: false,
      answer:
        'We build a wide range of websites tailored to your business needs. From simple landing pages to complex web applications, we handle it all.',
      details: [
        {
          title: 'Advert / Starter Website',
          description:
            'A compelling single-page website that showcases your business and provides essential contact information to engage potential clients.',
        },
        {
          title: 'Investment Website',
          description:
            'A robust platform to manage customer investments and contributions, complete with a comprehensive dashboard for overseeing all account activities.',
        },
        {
          title: 'Finance Website',
          description:
            'A comprehensive website that oversees customer finances, offers loan options, and facilitates seamless fund transfers.',
        },
        {
          title: 'Recruitment Website',
          description:
            'A professional website to display your company\'s employment details and streamline the application process for potential candidates.',
        },
        {
          title: 'Shipping Website',
          description:
            'An intuitive website that tracks parcels in real-time, providing a clear and concise user interface to enhance customer trust.',
        },
        {
          title: 'Upgrade / Maintenance',
          description:
            'Comprehensive maintenance and upgrades for any previously created website, ensuring optimal performance and up-to-date functionality.',
        },
      ],
    },
    {
      question: 'How do you charge per website?',
      icon: 'fa-solid fa-coins',
      expanded: false,
      answer:
        'Our website pricing is tailored to the unique needs and goals of each project. We consider several factors to ensure we provide the best value and quality.',
      details: [
        {
          title: 'Scope of the Project',
          description:
            'The complexity and size of the website play a significant role. A simple informational website will differ in price from a large e-commerce platform.',
        },
        {
          title: 'Design Requirements',
          description:
            'Custom design elements, including branding, graphics, and user experience design, influence the overall cost.',
        },
        {
          title: 'Functionality and Features',
          description:
            'Additional functionalities such as CMS, interactive elements, e-commerce capabilities, and third-party integrations are considered.',
        },
        {
          title: 'Content Creation',
          description:
            'The amount of content creation, including copywriting, images, videos, and other media, also affects the price.',
        },
        {
          title: 'Maintenance and Support',
          description:
            'Ongoing maintenance, updates, and support services are important to keep the website running smoothly.',
        },
        {
          title: 'Timeline',
          description:
            'Urgent projects with tight deadlines may incur additional costs to ensure we meet your required timeframe.',
        },
      ],
    },
    {
      question: 'How long does it take to build a website?',
      icon: 'fa-solid fa-clock',
      expanded: false,
      answer:
        'The timeline depends on the complexity and scope of the project. Here are general estimates:',
      details: [
        {
          title: 'Simple Websites',
          description:
            'Single-page sites or small business websites with minimal features typically take 1 to 2 weeks — including consultation, design, development, testing, and deployment.',
        },
        {
          title: 'Moderate Complexity',
          description:
            'Websites with multiple pages, custom design, basic e-commerce, or third-party integrations usually take 2 to 4 weeks.',
        },
        {
          title: 'Complex Projects',
          description:
            'Large e-commerce platforms, membership sites, or custom web applications can take 4 to 8 weeks, involving extensive planning, custom development, and testing.',
        },
      ],
    },
    {
      question: 'What kinds of graphic designs do you offer?',
      icon: 'fa-solid fa-palette',
      expanded: false,
      answer:
        'We offer a wide range of graphic design services tailored to meet diverse business needs:',
      details: [
        {
          title: 'Logo Design',
          description:
            'Unique and memorable logos that effectively represent your brand\'s identity and values.',
        },
        {
          title: 'Branding & Identity',
          description:
            'Cohesive branding materials including business cards, letterheads, and stationery.',
        },
        {
          title: 'Marketing Materials',
          description:
            'Visually appealing flyers, brochures, posters, and banners that communicate your message.',
        },
        {
          title: 'Digital Graphics',
          description:
            'Web graphics, social media posts, email templates, and other digital assets.',
        },
        {
          title: 'UI/UX Design',
          description:
            'Intuitive and user-friendly interfaces for websites and mobile applications.',
        },
        {
          title: 'Packaging Design',
          description:
            'Attractive and functional packaging that aligns with your brand\'s image.',
        },
        {
          title: 'Custom Illustrations',
          description:
            'Tailored illustrations for print, digital media, or merchandise.',
        },
      ],
    },
    {
      question: 'What file types do you deliver for graphic designs?',
      icon: 'fa-solid fa-file-export',
      expanded: false,
      answer:
        'We deliver files in formats optimized for their intended use — digital, print, or further editing:',
      details: [
        {
          title: 'Vector Files (AI, EPS, SVG)',
          description:
            'Ideal for print materials and scalable designs without loss of quality. SVG is perfect for web use.',
        },
        {
          title: 'Raster Files (PNG, JPEG, GIF)',
          description:
            'PNG for transparency support, JPEG for photographs, and GIF for simple animations.',
        },
        {
          title: 'PDF',
          description:
            'Ideal for print-ready files and sharing across platforms while maintaining design integrity.',
        },
        {
          title: 'PSD (Adobe Photoshop)',
          description:
            'Layered and editable files, allowing for future modifications and adjustments.',
        },
        {
          title: 'TIFF',
          description:
            'High-quality format used for professional printing and high-resolution images.',
        },
      ],
    },
    {
      question: 'Do you offer ongoing support after delivery?',
      icon: 'fa-solid fa-headset',
      expanded: false,
      answer:
        'Yes! Every project comes with a free support period depending on your plan. Our Starter plan includes 1 month, Professional includes 3 months, and Enterprise includes 6 months of free support. After that, we offer flexible maintenance plans to keep your digital assets running smoothly.',
      details: [],
    },
    {
      question: 'Can you help with an existing website that needs improvements?',
      icon: 'fa-solid fa-wrench',
      expanded: false,
      answer:
        'Absolutely. We provide comprehensive maintenance and upgrade services for existing websites. Whether you need a visual redesign, performance optimization, new features, or security updates — we can help bring your existing site up to modern standards.',
      details: [],
    },
  ];

  toggleFaq(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }

  ngOnInit(): void {
    this.darkMode = this.darkModeService.checkInitialDarkMode();
    this.darkModeSubscription = this.darkModeService
      .getDarkModeChangeObservable()
      .subscribe((isDarkMode) => {
        this.darkMode = isDarkMode;
      });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    setTimeout(() => {
      document
        .querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-in')
        .forEach((el) => this.observer.observe(el));
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
