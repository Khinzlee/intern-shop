import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList)
  },
  {
    title: 'Product Details',
    path: 'product/:category/:name/:id',
    loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails)
  },
   { title: 'Register', path: 'register', loadComponent: () => import('./components/auth/login/login').then(m => m.RegisterComponent) },
  {
    title: 'Cart',
    path: 'cart',
    loadComponent: () => import('./components/product-cart/product-cart').then(m => m.ProductCart)
  },
  {
    title: 'Likes',
    path: 'likes',
    loadComponent: () => import('./components/liked-product/liked-product').then(m => m.LikedProduct)
  },

  {
    title: 'Make Payment',
    path: 'make-payment',
    loadComponent: () => import('./components/make-payment/make-payment').then(m => m.MakePayment)
  },

  {
    title: 'Payment',
    path: 'payment',
    loadComponent: () => import('./components/payment/payment').then(m => m.Payment)
  },

  {
    title: 'Payment Success',
    path: 'payment-success',
    loadComponent: () => import('./components/payment-sucess/payment-sucess').then(m => m.PaymentSuccess)
  }

];
