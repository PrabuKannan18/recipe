import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'home/:id',
    loadComponent: () => import('./product-details/product-details.page').then( m => m.ProductDetailsPage)
  },
  {
    path: 'header',
    loadComponent: () => import('./header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'footer',
    loadComponent: () => import('./footer/footer.page').then( m => m.FooterPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'myaccount',
    loadComponent: () => import('./myaccount/myaccount.page').then( m => m.MyaccountPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./wishlist/wishlist.page').then( m => m.WishlistPage)
  },
];
