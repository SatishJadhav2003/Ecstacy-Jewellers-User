import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Pages/Startup/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'product-list/:CateID',
    loadComponent: () =>
      import('./Pages/Products/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'product-details/:ProdID',
    loadComponent: () =>
      import('./Pages/Products/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./Pages/Account/account.routes').then((m) => m.routes),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./Pages/Order/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
  },
  {
    path: 'orderconfirmed',
    loadComponent: () =>
      import('./Pages/Order/orderconfirm/orderconfirm.component').then(
        (m) => m.OrderconfirmComponent
      ),
  },
  {
    path: 'contactus',
    loadComponent: () =>
      import('./Pages/Other/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
  },
  {
    path:'customize',
    loadComponent: () =>
    import('./Pages/Other/customize-jewellery/customize-jewellery.component').then(
      (m) => m.CustomizeJewelleryComponent
    ),
  },
  {
    path:'search',
    loadComponent: () =>
    import('./Pages/Other/search/search.component').then(
      (m) => m.SearchComponent
    ),
  }
];
