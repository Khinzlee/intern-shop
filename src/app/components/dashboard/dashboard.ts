import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header';
import { ProductList } from '../product-list/product-list';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductList, Footer],
  template: `
    <div class="dashboard">
      <app-header (searchPerformed)="onSearch($event)"></app-header>
      
      <main class="main-content">
        <section id="products" class="products-section">
          <app-product-list 
            [selectedCategory]="selectedCategory"
            #productList>
          </app-product-list>
        </section>
      </main>
      
      <app-footer (categorySelected)="onCategorySelected($event)"></app-footer>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f8f9fa;
    }

    .main-content {
      flex: 1;
      padding: 20px 0;
    }

    .products-section {
      scroll-margin-top: 80px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  @ViewChild('productList') productList!: ProductList;
  selectedCategory: string = 'all';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Listen for query params (from footer category clicks)
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        console.log('Category from query params:', this.selectedCategory);
      }
    });
  }

  onCategorySelected(category: string) {
    console.log('Category selected from footer:', category);
    this.selectedCategory = category;
    
    // Trigger filter in product list
    if (this.productList) {
      setTimeout(() => {
        this.productList.selectedCategory = category;
        this.productList.filterProducts();
      }, 100);
    }
  }

  onSearch(query: string) {
    console.log('Search performed:', query);
    // Trigger search in product list
    if (this.productList) {
      this.productList.searchQuery = query;
      this.productList.onSearchChange();
    }
  }
}