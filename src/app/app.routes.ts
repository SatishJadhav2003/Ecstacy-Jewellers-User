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
    loadComponent: () =>
      import('./Pages/Account/user/user.component').then(
        (m) => m.UserComponent
      ),
    children: [
      {
        path: 'cart',
        loadComponent: () =>
          import('./Pages/Account/cart/cart.component').then(
            (m) => m.CartComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./Pages/Account/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./Pages/Account/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./Pages/Account/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./Pages/Account/notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: 'addresses',
        loadComponent: () =>
          import('./Pages/Account/addresses/addresses.component').then(
            (m) => m.AddressesComponent
          ),
      },
    ],
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
];
