import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user/user.component').then((m) => m.UserComponent),
    children: [
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./notifications/notifications.component').then(
            (m) => m.NotificationsComponent
          ),
      },
      {
        path: 'addresses',
        loadComponent: () =>
          import('./addresses/addresses.component').then(
            (m) => m.AddressesComponent
          ),
      },
    ],
  },
];
