// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
// import { ProductCard } from '../product-card/product-card';
// import { Product, ProductService } from '../../services/product.services';
// import { FormsModule } from '@angular/forms';
// import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';


// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, ProductCard, FormsModule, CapitalizeAndSpacePipe],
//   template: `
//     <div class="shop">
//       <h2>SHOP</h2>
//     </div>
    
//     <div class="this-products">
//      <select [(ngModel)]="selectedCategory" (change)="filterProducts()">
//         <option value="all" >All Categories</option>
//         <option *ngFor="let category of categories" [value]="category">
//           {{ category | capitalizeAndSpace }}
//         </option>
//       </select>

//     <div class="product-list">
//       <app-product-card
//         *ngFor="let product of filteredProducts"
//         [product]="product">
//       </app-product-card>
//     </div>
//     </div>
//   `,
//   styles: [`
//     .shop {
//   text-align: center;
//   margin: 20px 0;
//   font-family: 'Poppins', sans-serif;
// }


// .this-products {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
//   font-family: Arial, sans-serif;
// }


// .this-products select {
//   display: block;
//   margin-bottom: 20px;
//   padding: 8px 12px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 15px;
//   font-family: inherit;
// }


// option {
//   background: #fff;
//   border: none;
// }


// .product-list {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 20px;
// }


// .product-card {
//   background: white;
//   border: 1px solid #eee;
//   border-radius: 8px;
//   padding: 16px;
//   text-align: center;
//   box-shadow: 0 2px 6px rgba(0,0,0,0.08);
//   transition: transform 0.2s ease;
// }

// .product-card:hover {
//   transform: translateY(-4px);
// }

// .product-card img {
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 6px;
//   margin-bottom: 12px;
// }

// .product-card h3 {
//   font-size: 18px;
//   margin: 10px 0 5px;
//   font-weight: 500;
// }

// .product-card .price {
//   font-size: 15px;
//   font-weight: bold;
//   margin-bottom: 15px;
//   color: #333;
// }

// .product-card button {
//   background-color: #007bff;
//   color: white;
//   border: none;
//   padding: 10px 16px;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 14px;
//   width: 100%;
// }

// .product-card button:hover {
//   background-color: #0056b3;
// }

//   `],
// })
// export class ProductList implements OnInit {
//   @Input() selectedCategory: string = 'all';  // ✅ Step 1: Add this Input

//   products: Product[] = [];
//   categories: string[] = [];
//   filteredProducts: Product[] = [];

//   constructor(private productService: ProductService) {
//     this.products = this.productService.getProduct();
//   }

//   ngOnInit() {
//     this.categories = this.productService.getCategories();
//     this.filterProducts();
//   }

//   ngOnChanges(changes: SimpleChanges) {   // ✅ Step 2: React when footer updates category
//     if (changes['selectedCategory']) {
//       this.filterProducts();
//     }
//   }

//   filterProducts() {
//     this.filteredProducts = this.productService.getProductsByCategory(this.selectedCategory);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product, ProductService } from '../../services/product.services';
import { FormsModule } from '@angular/forms';
import { CapitalizeAndSpacePipe } from '../../pipes/capitalize-and-space-pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, FormsModule, CapitalizeAndSpacePipe],
  template: `
    <div class="shop-container">
      <div class="shop-header">
        <h2>SHOP</h2>
        <p class="subtitle">Discover our amazing products</p>
      </div>
      
      <div class="filter-section">
        <div class="filter-controls">
          <!-- Search Input -->
          <div class="search-box">
            <i class="fa fa-search"></i>
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()"
              placeholder="Search by name, category, brand..."
              class="search-input"
            />
          </div>

          <!-- Category Select -->
          <select [(ngModel)]="selectedCategory" (change)="filterProducts()" class="category-select">
            <option value="all">All Categories</option>
            <option *ngFor="let category of categories" [value]="category">
              {{ category | capitalizeAndSpace }}
            </option>
          </select>

          <!-- Brand Select -->
          <select [(ngModel)]="selectedBrand" (change)="filterProducts()" class="category-select">
            <option value="all">All Brands</option>
            <option *ngFor="let brand of brands" [value]="brand">
              {{ brand }}
            </option>
          </select>

          <!-- View Toggle -->
          <div class="view-toggle">
            <button 
              class="view-btn" 
              [class.active]="viewMode === 'grid'"
              (click)="viewMode = 'grid'"
              title="Grid View">
              <i class="fa fa-th"></i>
            </button>
            <button 
              class="view-btn" 
              [class.active]="viewMode === 'list'"
              (click)="viewMode = 'list'"
              title="List View">
              <i class="fa fa-list"></i>
            </button>
          </div>
        </div>

        <div class="results-info">
          <span>Showing {{ getStartIndex() + 1 }}-{{ getEndIndex() }} of {{ filteredProducts.length }} products</span>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <i class="fa fa-spinner fa-spin"></i>
        <p>Loading products...</p>
      </div>

      <!-- Products Grid/List -->
      <div *ngIf="!loading && paginatedProducts.length > 0" 
           class="product-list" 
           [class.grid-view]="viewMode === 'grid'" 
           [class.list-view]="viewMode === 'list'">
        <app-product-card
          *ngFor="let product of paginatedProducts"
          [product]="product"
          [viewMode]="viewMode">
        </app-product-card>
      </div>

      <!-- No Products -->
      <div *ngIf="!loading && filteredProducts.length === 0" class="no-products">
        <i class="fa fa-box-open"></i>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms</p>
        <button (click)="resetFilters()" class="reset-btn">Reset Filters</button>
      </div>

      <!-- Pagination -->
      <div *ngIf="!loading && filteredProducts.length > itemsPerPage" class="pagination">
        <button 
          (click)="goToPage(currentPage - 1)"
          [disabled]="currentPage === 1"
          class="page-btn prev-btn">
          Previous Page {{ currentPage > 1 ? (currentPage - 1) : '' }}
        </button>

        <!-- First Page -->
        <button 
          *ngIf="currentPage > 3"
          (click)="goToPage(1)"
          class="page-number">
          1
        </button>
        <span *ngIf="currentPage > 4" class="ellipsis">...</span>

        <!-- Page Numbers -->
        <button 
          *ngFor="let page of getPageNumbers()"
          (click)="goToPage(page)"
          [class.active]="page === currentPage"
          class="page-number">
          {{ page }}
        </button>

        <!-- Last Page -->
        <span *ngIf="currentPage < totalPages - 3" class="ellipsis">...</span>
        <button 
          *ngIf="currentPage < totalPages - 2"
          (click)="goToPage(totalPages)"
          class="page-number">
          {{ totalPages }}
        </button>

        <button 
          (click)="goToPage(currentPage + 1)"
          [disabled]="currentPage === totalPages"
          class="page-btn next-btn">
          Next Page {{ currentPage < totalPages ? (currentPage + 1) : '' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    /* Container */
    .shop-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }

    /* Header */
    .shop-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .shop-header h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #333;
    }

    .subtitle {
      color: #666;
      font-size: 16px;
    }

    /* Loading State */
    .loading-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .loading-state i {
      font-size: 48px;
      color: #007bff;
      margin-bottom: 15px;
    }

    /* Filter Section */
    .filter-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 25px;
      padding: 20px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .filter-controls {
      display: flex;
      align-items: center;
      gap: 15px;
      flex-wrap: wrap;
    }

    /* Search Box */
    .search-box {
      position: relative;
      flex: 1;
      min-width: 250px;
    }

    .search-box i {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .search-input {
      width: 100%;
      padding: 12px 15px 12px 45px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      transition: border-color 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #007bff;
    }

    .category-select {
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 15px;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.3s ease;
      min-width: 150px;
    }

    .category-select:hover,
    .category-select:focus {
      border-color: #007bff;
      outline: none;
    }

    /* View Toggle */
    .view-toggle {
      display: flex;
      gap: 5px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }

    .view-btn {
      padding: 10px 16px;
      background: #fff;
      border: none;
      cursor: pointer;
      font-size: 16px;
      color: #666;
      transition: all 0.3s ease;
    }

    .view-btn:hover {
      background: #f5f5f5;
      color: #333;
    }

    .view-btn.active {
      background: #007bff;
      color: #fff;
    }

    .results-info {
      text-align: center;
      color: #666;
      font-size: 14px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }

    /* Product List - Grid View */
    .product-list.grid-view {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
      margin-bottom: 30px;
    }

    /* Product List - List View */
    .product-list.list-view {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 30px;
    }

    /* No Products */
    .no-products {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .no-products i {
      font-size: 64px;
      margin-bottom: 20px;
      color: #ddd;
    }

    .no-products h3 {
      font-size: 24px;
      margin-bottom: 10px;
      color: #666;
    }

    .no-products p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .reset-btn {
      padding: 12px 30px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s ease;
    }

    .reset-btn:hover {
      background: #0056b3;
    }

    /* Pagination */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 40px 0;
      flex-wrap: wrap;
    }

    .page-btn {
      padding: 12px 20px;
      border: 2px solid #e0e0e0;
      background: #fff;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .page-btn:hover:not(:disabled) {
      background: #f5f5f5;
      border-color: #007bff;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-number {
      width: 45px;
      height: 45px;
      border: 2px solid #e0e0e0;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .page-number:hover {
      background: #f0f8ff;
      border-color: #007bff;
    }

    .page-number.active {
      background: #007bff;
      color: #fff;
      border-color: #007bff;
    }

    .ellipsis {
      padding: 0 8px;
      color: #999;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .filter-controls {
        flex-direction: column;
      }

      .search-box,
      .category-select {
        width: 100%;
      }

      .view-toggle {
        width: 100%;
      }

      .view-btn {
        flex: 1;
      }

      .product-list.grid-view {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 15px;
      }

      .pagination {
        gap: 5px;
      }

      .page-btn {
        padding: 8px 12px;
        font-size: 12px;
      }

      .page-number {
        width: 35px;
        height: 35px;
        font-size: 12px;
      }
    }
  `]
})
export class ProductList implements OnInit {
  @Input() selectedCategory: string = 'all';
  
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  
  searchQuery: string = '';
  selectedBrand: string = 'all';
  viewMode: 'grid' | 'list' = 'grid';
  loading: boolean = true;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.loading = true;
    
    // Subscribe to products
    this.productService.products$.subscribe(products => {
      this.products = products;
      this.loading = products.length === 0;
      
      if (products.length > 0) {
        this.filterProducts();
      }
    });

    // Get categories and brands
    this.categories = this.productService.getCategories();
    this.brands = this.getUniqueBrands();
    
    // Load saved view mode
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'list' || savedViewMode === 'grid') {
      this.viewMode = savedViewMode;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory']) {
      this.filterProducts();
    }
  }

  onSearchChange() {
    this.filterProducts();
  }

  filterProducts() {
    let filtered = [...this.products];

    // Search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Brand filter
    if (this.selectedBrand !== 'all') {
      filtered = filtered.filter(p => p.brand === this.selectedBrand);
    }

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const showPages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(this.totalPages, startPage + showPages - 1);
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.itemsPerPage, this.filteredProducts.length);
  }

  getUniqueBrands(): string[] {
    return [...new Set(this.products.map(p => p.brand))];
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.selectedBrand = 'all';
    this.filterProducts();
  }

  ngOnDestroy() {
    localStorage.setItem('viewMode', this.viewMode);
  }
}