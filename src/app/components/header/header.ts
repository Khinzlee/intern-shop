// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Notification } from '../notification/notification';
// import { RouterLink } from '@angular/router';
// import { LikeNotification } from '../notification/like-notification';



// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, Notification, RouterLink, LikeNotification],
//   template: `
//   <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
//     <footer class="footer">
//     <header class="navbar">
//       <div class="logo">E<span>-shop</span></div>

//       <nav class="nav-links">
//         <a [routerLink]="['/']
//         "><i class="fa-regular fa-house" style="font-size:22px;"></i> Home</a>
//         <a href="#"> <i class="fa-solid fa-basket-shopping" style="font-size:22px;"></i> Products</a>
//         <a href="#"> <i class="fa-solid fa-gear" style=" font-size:22px;"></i> Service</a>
//         <a href="#"> <i class="fa-solid fa-comment-dots"  style=" font-size:22px;"></i> Contact</a>
//       </nav>

//       <div class="icons">
//         <input type="text" placeholder="Search Products..." class="search-input" />
//         <i class="fa fa-search"></i>
    
//         <i class="fa fa-heart" [routerLink]= "['/likes']">
//           <app-like-notification></app-like-notification>
//         </i>
//         <div class="cart-icon">
//           <i class="fa fa-shopping-cart" [routerLink]="['/cart']">

//           </i>
//           <app-notification></app-notification>
//         </div>
//       </div>
//     </header>
//   `,
//   styles: [
//     `
//       .navbar {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 15px 50px;
//       background: #fff;
//       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//       font-family: 'Poppins', sans-serif;
//     }
//     .logo {
//       font-size: 26px;
//       font-weight: bold;
//       color: #000;
//     }
//     .logo span { color: #a9b5ebff; }
//     .nav-links {
//       display: flex;
//       gap: 30px;
//     }
//     .nav-links a {
//       text-decoration: none;
//       color: #333;
//       font-weight: 600;
//       transition: 0.3s all ease;
//     }
//     .nav-links a:hover { color: #e91e63; }
//     .icons i {
//       margin-left: 20px;
//       font-size: 18px;
//       color: #333;
//       cursor: pointer;
//     }
//     .icons i:hover { color: #e91e63; }
//     .cart-icon {
//       position: relative;
//       display: inline-block;
//       cursor: pointer;
//     }
//     .search-input {
//       padding: 8px 12px;
//       border: 2px solid #ccc; 
//       border-radius: 4px;
//       font-size: 14px;
//       width: 200px;
//       transition: width 0.3s ease;
//     }
//     .search-input:focus {
//       width: 300px;
//       outline: none;
//       border-color: #007bff;
//       border-radius: 4px;
//     }
//     .search-input::placeholder { 
//       color: #999;
//       font-size: 14px;
//       font-style: italic;
//     }
    
    
//     `,
//   ],
// })
// export class HeaderComponent { }




import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notification } from '../notification/notification';
import { Router, RouterLink } from '@angular/router';
import { LikeNotification } from '../notification/like-notification';
import { AuthService, User } from '../../services/auth.service';
import { ProductService } from '../../services/product.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Notification, RouterLink, LikeNotification],
  template: `
  <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" /></head>
    <header class="navbar">
      <!-- Logo -->
      <div class="logo" [routerLink]="['/']" style="cursor: pointer;">
        E<span>-shop</span>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
        <i class="fa" [class.fa-bars]="!isMobileMenuOpen" [class.fa-times]="isMobileMenuOpen"></i>
      </button>

      <!-- Navigation Links -->
      <nav class="nav-links" [class.mobile-open]="isMobileMenuOpen">
        <a [routerLink]="['/']" (click)="closeMobileMenu()">
          <i class="fa-regular fa-house"></i> 
          <span>Home</span>
        </a>
        <a href="#products" (click)="closeMobileMenu()">
          <i class="fa-solid fa-basket-shopping"></i> 
          <span>Products</span>
        </a>
        <a href="#" (click)="closeMobileMenu()">
          <i class="fa-solid fa-gear"></i> 
          <span>Service</span>
        </a>
        <a href="#" (click)="closeMobileMenu()">
          <i class="fa-solid fa-comment-dots"></i> 
          <span>Contact</span>
        </a>
      </nav>

      <!-- Icons Section -->
      <div class="icons" [class.mobile-open]="isMobileMenuOpen">
        <!-- Search Container -->
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            class="search-input"
            [(ngModel)]="searchQuery"
            (keyup.enter)="performSearch()"
            (input)="onSearchInput()"
          />
          <i class="fa fa-search search-icon" (click)="performSearch()"></i>
          
          <!-- Search Suggestions Dropdown -->
          <div class="search-suggestions" *ngIf="showSuggestions && searchSuggestions.length > 0">
            <div 
              *ngFor="let suggestion of searchSuggestions" 
              class="suggestion-item"
              (click)="selectSuggestion(suggestion)">
              <img [src]="suggestion.image" [alt]="suggestion.name" class="suggestion-image">
              <div class="suggestion-details">
                <span class="suggestion-name">{{ suggestion.name }}</span>
                <span class="suggestion-price">{{ suggestion.price | currency:'NGN':'symbol-narrow' }}</span>
              </div>
            </div>
          </div>
        </div>
    
        <i class="fa fa-heart icon-btn" [routerLink]="['/likes']" (click)="closeMobileMenu()" title="Favorites">
          <app-like-notification></app-like-notification>
        </i>
        
        <div class="cart-icon">
          <i class="fa fa-shopping-cart icon-btn" [routerLink]="['/cart']" (click)="closeMobileMenu()" title="Cart"></i>
          <app-notification></app-notification>
        </div>

        <!-- User Menu -->
        <div class="user-menu" *ngIf="currentUser$ | async as user; else loginButton">
          <button class="user-btn" (click)="toggleUserMenu()">
            <i class="fa fa-user-circle"></i>
            <span class="user-name">{{ user.full_name || (user.email ? user.email.split('@')[0] : 'User') }}</span>
            <i class="fa fa-chevron-down" [class.rotate]="isUserMenuOpen"></i>
          </button>
          
          <div class="user-dropdown" [class.show]="isUserMenuOpen">
            <div class="user-info">
              <strong>{{ user.full_name || 'User' }}</strong>
              <small>{{ user.email }}</small>
            </div>
            <hr>
            <a href="#" class="dropdown-item">
              <i class="fa fa-user"></i> Profile
            </a>
            <a href="#" class="dropdown-item">
              <i class="fa fa-box"></i> Orders
            </a>
            <a href="#" class="dropdown-item">
              <i class="fa fa-cog"></i> Settings
            </a>
            <hr>
            <button class="dropdown-item logout-btn" (click)="logout()">
              <i class="fa fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        <ng-template #loginButton>
          <button class="login-btn" [routerLink]="['/login']" (click)="closeMobileMenu()">
            <i class="fa fa-sign-in-alt"></i>
            <span>Login</span>
          </button>
        </ng-template>
      </div>
    </header>
  `,
  styles: [`
    /* Base Styles */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 50px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: 'Poppins', sans-serif;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .logo {
      font-size: 26px;
      font-weight: bold;
      color: #000;
      z-index: 1001;
    }

    .logo span {
      color: #a9b5ebff;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      color: #333;
      z-index: 1001;
    }

    .mobile-menu-toggle:hover {
      color: #e91e63;
    }

    /* Navigation Links */
    .nav-links {
      display: flex;
      gap: 30px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: #333;
      font-weight: 600;
      transition: 0.3s all ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-links a i {
      font-size: 18px;
    }

    .nav-links a:hover {
      color: #e91e63;
    }

    /* Icons Section */
    .icons {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .icon-btn {
      font-size: 20px;
      color: #333;
      cursor: pointer;
      transition: color 0.3s ease;
      position: relative;
    }

    .icon-btn:hover {
      color: #e91e63;
    }

    .cart-icon {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    /* Search Container */
    .search-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-input {
      padding: 8px 35px 8px 12px;
      border: 2px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
      width: 250px;
      transition: width 0.3s ease, border-color 0.3s ease;
    }

    .search-input:focus {
      width: 300px;
      outline: none;
      border-color: #007bff;
    }

    .search-input::placeholder {
      color: #999;
      font-size: 14px;
      font-style: italic;
    }

    .search-icon {
      position: absolute;
      right: 10px;
      color: #666;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .search-icon:hover {
      color: #007bff;
    }

    /* Search Suggestions */
    .search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-height: 400px;
      overflow-y: auto;
      margin-top: 5px;
      z-index: 1000;
    }

    .suggestion-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      cursor: pointer;
      transition: background 0.2s ease;
      border-bottom: 1px solid #f0f0f0;
    }

    .suggestion-item:hover {
      background: #f8f9ff;
    }

    .suggestion-item:last-child {
      border-bottom: none;
    }

    .suggestion-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    .suggestion-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .suggestion-name {
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .suggestion-price {
      color: #e91e63;
      font-size: 13px;
      font-weight: 500;
    }

    /* User Menu */
    .user-menu {
      position: relative;
    }

    .user-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 15px;
      background: #f5f5f5;
      border: 2px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #333;
      transition: all 0.3s ease;
    }

    .user-btn:hover {
      background: #e8e8e8;
      border-color: #007bff;
    }

    .user-btn i:first-child {
      font-size: 20px;
    }

    .user-btn .fa-chevron-down {
      font-size: 12px;
      transition: transform 0.3s ease;
    }

    .user-btn .fa-chevron-down.rotate {
      transform: rotate(180deg);
    }

    .user-name {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 220px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .user-dropdown.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .user-info {
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .user-info strong {
      color: #333;
      font-size: 15px;
    }

    .user-info small {
      color: #666;
      font-size: 12px;
    }

    .user-dropdown hr {
      margin: 0;
      border: none;
      border-top: 1px solid #f0f0f0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 15px;
      text-decoration: none;
      color: #333;
      font-size: 14px;
      transition: background 0.2s ease;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background: #f8f9ff;
      color: #007bff;
    }

    .dropdown-item i {
      font-size: 16px;
      width: 20px;
    }

    .logout-btn {
      color: #dc3545;
    }

    .logout-btn:hover {
      background: #fff5f5;
      color: #c82333;
    }

    /* Login Button */
    .login-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: background 0.3s ease;
    }

    .login-btn:hover {
      background: #0056b3;
    }

    /* Tablet Styles (768px - 1024px) */
    @media (max-width: 1024px) {
      .navbar {
        padding: 15px 30px;
      }

      .nav-links {
        gap: 20px;
      }

      .nav-links a span {
        display: none;
      }

      .search-input {
        width: 180px;
      }

      .search-input:focus {
        width: 220px;
      }

      .user-name {
        max-width: 80px;
      }
    }

    /* Mobile Styles (< 768px) */
    @media (max-width: 768px) {
      .navbar {
        padding: 15px 20px;
        flex-wrap: wrap;
      }

      .mobile-menu-toggle {
        display: block;
      }

      .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 80%;
        max-width: 300px;
        height: calc(100vh - 70px);
        background: #fff;
        flex-direction: column;
        align-items: flex-start;
        padding: 30px 20px;
        gap: 20px;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        transition: left 0.3s ease;
        z-index: 999;
      }

      .nav-links.mobile-open {
        left: 0;
      }

      .nav-links a {
        width: 100%;
        padding: 12px 0;
        font-size: 16px;
        border-bottom: 1px solid #eee;
      }

      .nav-links a span {
        display: inline;
      }

      .icons {
        position: fixed;
        bottom: -100%;
        left: 0;
        right: 0;
        background: #fff;
        padding: 15px 20px;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        justify-content: space-around;
        transition: bottom 0.3s ease;
        z-index: 999;
        flex-wrap: wrap;
        gap: 15px;
      }

      .icons.mobile-open {
        bottom: 0;
      }

      .search-container {
        width: 100%;
        order: -1;
      }

      .search-input {
        width: 100%;
      }

      .search-input:focus {
        width: 100%;
      }

      .user-btn {
        padding: 8px 12px;
      }

      .user-name {
        display: none;
      }
    }

    /* Small Mobile (< 480px) */
    @media (max-width: 480px) {
      .logo {
        font-size: 22px;
      }

      .navbar {
        padding: 12px 15px;
      }

      .icon-btn {
        font-size: 18px;
      }

      .login-btn span {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isUserMenuOpen = false;
  
  searchQuery: string = '';
  showSuggestions: boolean = false;
  searchSuggestions: any[] = [];

  @Output() searchPerformed = new EventEmitter<string>();

  // Make currentUser$ available in template
  currentUser$;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    // Initialize currentUser$ in constructor
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        this.isUserMenuOpen = false;
      }
      if (!target.closest('.search-container')) {
        this.showSuggestions = false;
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  async logout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      await this.authService.signOut();
      this.isUserMenuOpen = false;
      this.closeMobileMenu();
    }
  }

  onSearchInput() {
    if (this.searchQuery.trim().length > 1) {
      const products = this.productService.getProduct();
      this.searchSuggestions = products
        .filter(p => 
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .slice(0, 5);
      this.showSuggestions = this.searchSuggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.showSuggestions = false;
      this.searchPerformed.emit(this.searchQuery);
      this.closeMobileMenu();
    }
  }

  selectSuggestion(product: any) {
    this.showSuggestions = false;
    this.searchQuery = '';
    this.router.navigate(['/product', product.category, product.name, product.id], {
      queryParams: { rating: product.rating, reviews: product.review }
    });
    this.closeMobileMenu();
  }
}