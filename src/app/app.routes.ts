import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'All is well — Pure herbal care, Rajkot',
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.component').then((m) => m.ShopComponent),
    title: 'Shop — All is well',
  },
  {
    path: 'product/:slug',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    title: 'Product — All is well',
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./pages/how-it-works/how-it-works.component').then((m) => m.HowItWorksComponent),
    title: 'How it works — All is well',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About — All is well',
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then((m) => m.FaqComponent),
    title: 'FAQ — All is well',
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    title: 'Contact — All is well',
  },
  { path: '**', redirectTo: '' },
];
