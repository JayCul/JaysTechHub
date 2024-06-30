import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  currentTime = new Date().toLocaleTimeString();
  offers = [
    {
      "title": "Advert / Starter Website",
      "description": "Create a compelling single-page website that effectively showcases your business and provides essential contact information to engage potential clients.",
      "imgLink": "./../../assets/images/AdvertSite.avif"
    },
    {
      "title": "Investment Website",
      "description": "Develop a robust platform to manage customer investments and contributions, complete with a comprehensive dashboard for overseeing all account activities.",
      "imgLink": "./../../assets/images/InvestmentSite.jpg"
    },
    {
      "title": "Finance Website",
      "description": "Build a comprehensive website that oversees customer finances, offers loan options, and facilitates seamless fund transfers, enhancing financial management capabilities.",
      "imgLink": "./../../assets/images/OnlineBanking.avif"
    },
    {
      "title": "Recruitment Website",
      "description": "Design a professional website to display your company’s employment details and streamline the application process for potential candidates, ensuring efficient recruitment.",
      "imgLink": "./../../assets/images/RecruitmentSite.jpg"
    },
    {
      "title": "Shipping Website",
      "description": "Create an intuitive website that tracks parcels in real-time, providing a clear and concise user interface to enhance customer trust and satisfaction.",
      "imgLink": "./../../assets/images/ShippingSite.avif"
    },
    {
      "title": "Upgrade / Maintenance of Websites",
      "description": "We offer comprehensive maintenance and upgrades for any previously created website, ensuring optimal performance and up-to-date functionality.",
      "imgLink": "./../../assets/images/WebMaitainance.jpg"
    }
  ]
  
  
  priceDeterminants = [
    { "title" : "Scope of the Project", "description" : "The complexity and size of the website play a significant role in determining the cost. For instance, a simple informational website will differ in price from a large e-commerce platform."},
    { "title" : "Design Requirements", "description" : "Custom design elements, including branding, graphics, and user experience design, influence the overall cost. A more intricate and unique design typically requires more resources."},
    { "title" : "Functionality and Features", "description" : "Additional functionalities such as content management systems, interactive elements, e-commerce capabilities, and third-party integrations are considered in our pricing."},
    { "title" : "Content Creation", "description" : "The amount of content creation, including copywriting, images, videos, and other media, also affects the price. We offer services to help create high-quality content for your website."},
    { "title" : "Maintenance and Support", "description" : "Ongoing maintenance, updates, and support services are important to keep the website running smoothly. We offer various maintenance plans to fit different needs and budgets."},
    { "title" : "Timeline", "description" : "Urgent projects with tight deadlines may incur additional costs to ensure we meet your required timeframe."},

  ]
  timeFrames = [
    { "title" : "Simple Websites", "description" : "For straightforward websites, such as single-page sites or small business websites with minimal features, the development process typically takes between <b class= 'text-lg'>2 to 4 weeks</b>. This includes initial consultation, design, development, testing, and deployment."},
    { "title" : "Moderate Complexity Websites", "description" : "Websites with moderate complexity, such as those with multiple pages, custom design elements, basic e-commerce functionality, or integration with third-party services, usually take around <b class= 'text-lg'>4 to 8 weeks</b> to complete."},
    { "title" : "Complex Websites", "description" : `More complex projects, such as large e-commerce platforms, membership sites, or custom web applications, can take anywhere from <b class= 'text-lg'>8 weeks to several months</b>. These projects often involve extensive planning, custom development, rigorous testing, and multiple iterations based on client feedback.`},
    

  ]

  graphicOptions= [
    { "title" : "Logo Design", "description" : "We create unique and memorable logos that effectively represent your brand's identity and values."},
    { "title" : "Branding and Identity Design", "description" : "Our team develops cohesive branding materials, including business cards, letterheads, and stationery, to establish a strong brand presence."},
    { "title" : "Marketing Materials", "description" : " We design visually appealing flyers, brochures, posters, and banners that capture attention and effectively communicate your message."},
    { "title" : "Digital Graphics", "description" : "Our services include designing web graphics, social media posts, email templates, and other digital assets to enhance your online presence."},
    { "title" : "UI/UX Design", "description" : "We specialize in creating intuitive and user-friendly interfaces for websites and mobile applications, ensuring a seamless user experience."},
    { "title" : "Packaging Design", "description" : "We design attractive and functional packaging that stands out on the shelf and aligns with your brand's image."},
    { "title" : "Custom Illustrations", "description" : "We provide custom illustrations tailored to your specific needs, whether for print, digital media, or merchandise."},
    
  ]
  
  fileTypes= [
    { "title" : "Vector Files", 
    "description" : `<ul class="list-disc pl-3">
    <li>AI (Adobe Illustrator): Ideal for print materials and scalable designs without loss of quality.</li>
    <li>EPS (Encapsulated PostScript): Widely used for professional printing and high-resolution outputs.</li>
    <li>SVG (Scalable Vector Graphics): Perfect for web use, allowing for scalability and quick loading times.</li>
    </ul>`},
    { "title" : "Raster Files", "description" : `<ul class="list-disc pl-3">
    <li>PNG (Portable Network Graphics): Great for web graphics with transparency support and high-quality images.</li>
    <li>JPEG/JPG (Joint Photographic Experts Group): Commonly used for photographs and web images, offering a balance between quality and file size.</li>
    <li>GIF (Graphics Interchange Format): Suitable for simple animations and web graphics with limited colors.</li>
    </ul>`},
    { "title" : "PDF (Portable Document Format)", "description" : "Ideal for print-ready files and sharing across different platforms while maintaining design integrity."},
    { "title" : "PSD (Adobe Photoshop)", "description" : "For layered and editable files, allowing for future modifications and adjustments."},
    { "title" : "TIFF (Tagged Image File Format)", "description" : "High-quality format used for professional printing and high-resolution images."},
    
  ]

  ngOnInit() {
    initFlowbite();
  }
}
