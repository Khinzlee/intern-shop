import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { Footer } from './components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, Footer],
  template: `
    <div class="app-container">
      <!-- Show header on all pages except login/register -->
      <app-header 
        *ngIf="showHeaderFooter"
        (searchPerformed)="onSearch($event)">
      </app-header>
      
      <main class="main-content" [class.full-height]="!showHeaderFooter">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Show footer on all pages except login/register -->
      <app-footer 
        *ngIf="showHeaderFooter"
        (categorySelected)="onCategorySelected($event)">
      </app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f8f9fa;
    }

    .main-content {
      flex: 1;
      padding-top: 20px;
    }

    .main-content.full-height {
      padding-top: 0;
    }

    /* Ensure router outlet content takes full width */
    :host ::ng-deep router-outlet + * {
      width: 100%;
    }
  `]
})
export class App {
  showHeaderFooter = true;

  constructor(private router: Router) {
    // Hide header/footer on auth pages
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        this.showHeaderFooter = !url.includes('/login') && !url.includes('/register');
      });
  }

  onSearch(query: string) {
    console.log('Search performed:', query);
    
    // Navigate to home page with search query
    this.router.navigate(['/'], {
      queryParams: { search: query }
    });
  }

  onCategorySelected(category: string) {
    console.log('Category selected:', category);
    
    // Navigate to home page with category
    this.router.navigate(['/'], {
      queryParams: { category: category }
    }).then(() => {
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    });
  }
}