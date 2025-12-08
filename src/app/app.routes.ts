import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)
  },
  {
    title: 'Login',
    path: 'login',
    loadComponent: () => import('./components/auth/login/login').then(m => m.LoginComponent)
  },
  {
    title: 'Register',
    path: 'register',
    loadComponent: () => import('./components/auth/login/login').then(m => m.RegisterComponent)
  },
  {
    title: 'Product Details',
    path: 'product/:category/:name/:id',
    loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails)
  },
  {
    title: 'Cart',
    path: 'cart',
    loadComponent: () => import('./components/product-cart/product-cart').then(m => m.ProductCart),
    canActivate: [AuthGuard] // Protected route - requires authentication
  },
  {
    title: 'Likes',
    path: 'likes',
    loadComponent: () => import('./components/liked-product/liked-product').then(m => m.LikedProduct),
    canActivate: [AuthGuard] // Protected route - requires authentication
  },
  {
    title: 'Make Payment',
    path: 'make-payment',
    loadComponent: () => import('./components/make-payment/make-payment').then(m => m.MakePayment),
    canActivate: [AuthGuard] // Protected route - requires authentication
  },
  {
    title: 'Payment',
    path: 'payment',
    loadComponent: () => import('./components/payment/payment').then(m => m.Payment)
  },
  {
    title: 'Payment Success',
    path: 'payment-success',
    loadComponent: () => import('./components/payment-sucess/payment-sucess').then(m => m.PaymentSuccess),
    canActivate: [AuthGuard] // Protected route - requires authentication
  },
  {
    title: 'Payment Failure',
    path: 'payment-failure',
    loadComponent: () => import('./components/payment-failure/payment-failure').then(m => m.PaymentFailure),
    canActivate: [AuthGuard] // Protected route - requires authentication
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];