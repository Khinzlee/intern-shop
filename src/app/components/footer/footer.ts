// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { ProductService } from '../../services/product.services';
// import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

// @Component({
//   selector: 'app-footer',
//   standalone: true,
//   imports: [CommonModule, CapitalizeAndSpacePipe],
//   template: `
//   <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
//     <footer class="footer">
//       <div class="footer-container">

        
//         <div class="footer-brand">
//           <h2 class="brand-name"><span class="highlight">E</span>-shop</h2>
//           <div class="social-icons">
//             <a href="#"><i class="fa-brands fa-facebook"></i></a>
//             <a href="#"><i class="fab fa-twitter"></i></a>
//             <a href="#"><i class="fab fa-instagram"></i></a>
//           </div>
//           <p>Designed © Opakunle Kingsley Gboyega</p>
//         </div>


//         <div class="footer-section">
//           <h3>Shop</h3>
//           <ul>
//             <li><a href="#">About us</a></li>
//             <li><a href="#">Contact</a></li>
//             <li><a href="#">Location</a></li>
//             <li><a href="#">FAQ</a></li>
//           </ul>
//         </div>

        
//         <div class="footer-section">
//           <h3>Categories</h3>
//           <ul>
//             <li *ngFor="let category of categories">
//               <a href="#"  (click)="onCategoryClick(category)">{{ category | capitalizeAndSpace }}</a>
//             </li>
//           </ul>
//         </div>

        
//         <div class="footer-section">
//           <h3>Contact</h3>
//           <p>📞 +234 812 345 6789</p>
//           <p>📧 eshop@gmail.com</p>
//           <p>🏠 123 Main Street, Lagos, Nigeria</p>
//         </div>

//       </div>
//     </footer>
//   `,
//   styles: [`
//     .footer {
//       background-color: #2b2d42;
//       color: #eee;
//       padding: 50px 20px;
//       font-family: 'Poppins', sans-serif;
//       margin-top: 10px;
//     }

//     .footer-container {
//       display: flex;
//       justify-content: space-around;
//       flex-wrap: wrap;
//       max-width: 1100px;
//       margin: 0 auto;
//     }

//     .footer-brand {
//       text-align: left;
//       max-width: 250px;
//     }

//     .brand-name {
//       font-size: 24px;
//       margin-bottom: 10px;
//       font-weight: 600;
//     }

//     .highlight {
//       color: #e63946;
//     }

//     .social-icons {
//       display: flex;
//       gap: 10px;
//       margin: 10px 0;
//     }

//     .social-icons a {
//       background: transparent;
//       color: #fff;
//       padding: 8px;
//       border-radius: 50%;
//       width: 30px;
//       height: 30px;
//       text-align: center;
//       align-self: center;
//       line-height: 14px;
//       cursor: pointer;
//       transition: background 0.3s;
//     }
    

//     .social-icons a:hover {
//       background: #e63946;
//     }

//     .footer-section {
//       min-width: 180px;
//     }

//     .footer-section h3 {
//       font-size: 16px;
//       margin-bottom: 15px;
//       color: #fff;
//     }

//     .footer-section ul {
//       list-style: none;
//       padding: 0;
//     }

//     .footer-section li {
//       margin-bottom: 8px;
//     }

//     .footer-section a {
//       color: #ddd;
//       text-decoration: none;
//       font-size: 14px;
//     }

//     .footer-section a:hover {
//       color: #e63946;
//     }

//     @media (max-width: 768px) {
//       .footer-container {
//         flex-direction: column;
//         align-items: center;
//         text-align: center;
//       }
//       .footer-section {
//         margin-top: 20px;
//       }
//     }
//   `]
// })
// export class Footer implements OnInit {
//   @Output() categorySelected = new EventEmitter<string>();
//   categories: string[] = [];

//   constructor(private productService: ProductService) { }

//   ngOnInit() {
//     this.categories = this.productService.getCategories();
//   }

//   onCategoryClick(category: string) {
//     this.categorySelected.emit(category);
//   }
// }




import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.services';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CapitalizeAndSpacePipe, RouterLink],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <footer class="footer">
      <div class="footer-container">
        
        <div class="footer-brand">
          <h2 class="brand-name"><span class="highlight">E</span>-shop</h2>
          <p class="description">Your one-stop shop for quality products at amazing prices.</p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          </div>
          <p class="copyright">Designed © Opakunle Kingsley Gboyega</p>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#" (click)="scrollToSection('about')">About us</a></li>
            <li><a href="#" (click)="scrollToSection('products')">Products</a></li>
            <li><a href="#" (click)="scrollToSection('contact')">Contact</a></li>
            <li><a href="#" (click)="scrollToSection('faq')">FAQ</a></li>
            <li><a [routerLink]="['/cart']">Shopping Cart</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Categories</h3>
          <ul>
            <li *ngFor="let category of categories">
              <a href="#" (click)="onCategoryClick($event, category)">
                {{ category | capitalizeAndSpace }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Contact Us</h3>
          <div class="contact-info">
            <p><i class="fa fa-phone"></i> +234 812 345 6789</p>
            <p><i class="fa fa-envelope"></i> eshop@gmail.com</p>
            <p><i class="fa fa-map-marker-alt"></i> 123 Main Street<br>Lagos, Nigeria</p>
          </div>
          
          <div class="newsletter">
            <h4>Newsletter</h4>
            <div class="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button><i class="fa fa-paper-plane"></i></button>
            </div>
          </div>
        </div>

      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 E-shop. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: linear-gradient(135deg, #2b2d42 0%, #1a1b2e 100%);
      color: #eee;
      padding: 60px 20px 20px;
      font-family: 'Poppins', sans-serif;
      margin-top: 50px;
    }

    .footer-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
      padding-bottom: 40px;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .brand-name {
      font-size: 28px;
      margin: 0;
      font-weight: 700;
      color: #fff;
    }

    .highlight {
      color: #e63946;
    }

    .description {
      color: #b8b9be;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    .social-icons {
      display: flex;
      gap: 12px;
      margin: 10px 0;
    }

    .social-icons a {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
      font-size: 18px;
    }

    .social-icons a:hover {
      background: #e63946;
      transform: translateY(-3px);
    }

    .copyright {
      color: #888;
      font-size: 12px;
      margin-top: 10px;
    }

    .footer-section h3 {
      font-size: 18px;
      margin-bottom: 20px;
      color: #fff;
      font-weight: 600;
      position: relative;
      padding-bottom: 10px;
    }

    .footer-section h3::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: #e63946;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-section li {
      margin-bottom: 12px;
    }

    .footer-section a {
      color: #b8b9be;
      text-decoration: none;
      font-size: 14px;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .footer-section a:hover {
      color: #e63946;
      padding-left: 5px;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .contact-info p {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #b8b9be;
      font-size: 14px;
      margin: 0;
      line-height: 1.6;
    }

    .contact-info i {
      color: #e63946;
      margin-top: 3px;
      font-size: 16px;
      min-width: 16px;
    }

    .newsletter {
      margin-top: 25px;
    }

    .newsletter h4 {
      font-size: 16px;
      margin-bottom: 12px;
      color: #fff;
    }

    .newsletter-form {
      display: flex;
      gap: 8px;
    }

    .newsletter-form input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      color: #fff;
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .newsletter-form input:focus {
      outline: none;
      border-color: #e63946;
      background: rgba(255, 255, 255, 0.1);
    }

    .newsletter-form input::placeholder {
      color: #888;
    }

    .newsletter-form button {
      padding: 10px 20px;
      background: #e63946;
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 16px;
    }

    .newsletter-form button:hover {
      background: #d62839;
      transform: translateY(-2px);
    }

    .footer-bottom {
      text-align: center;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #888;
      font-size: 14px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .footer {
        padding: 40px 15px 20px;
      }

      .footer-container {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .footer-section {
        text-align: center;
      }

      .footer-section h3::after {
        left: 50%;
        transform: translateX(-50%);
      }

      .footer-brand {
        align-items: center;
        text-align: center;
      }

      .social-icons {
        justify-content: center;
      }

      .contact-info p {
        justify-content: center;
      }

      .newsletter-form {
        flex-direction: column;
      }

      .newsletter-form button {
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .brand-name {
        font-size: 24px;
      }

      .footer-section h3 {
        font-size: 16px;
      }

      .footer-section a,
      .contact-info p {
        font-size: 13px;
      }
    }
  `]
})
export class Footer implements OnInit {
  @Output() categorySelected = new EventEmitter<string>();
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories = this.productService.getCategories();
  }

  onCategoryClick(event: Event, category: string) {
    event.preventDefault();
    
    console.log('Footer category clicked:', category);
    
    // Navigate to home with category filter
    this.router.navigate(['/'], {
      queryParams: { category: category }
    }).then(() => {
      // Emit the category for the product list component
      this.categorySelected.emit(category);
      
      // Scroll to products section
      setTimeout(() => {
        this.scrollToSection('products');
      }, 100);
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If section doesn't exist, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}