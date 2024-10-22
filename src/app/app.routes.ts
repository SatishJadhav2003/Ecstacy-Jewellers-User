import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/Startup/home/home.component';
import { ProductListComponent } from './Pages/Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Pages/Products/product-details/product-details.component';
import { UserComponent } from './Pages/Account/user/user.component';
import { CartComponent } from './Pages/Account/cart/cart.component';
import { ProfileComponent } from './Pages/Account/profile/profile.component';
import { OrdersComponent } from './Pages/Account/orders/orders.component';
import { WishlistComponent } from './Pages/Account/wishlist/wishlist.component';
import { NotificationsComponent } from './Pages/Account/notifications/notifications.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product-list/:CateID',
    component: ProductListComponent,
  },
  {
    path: 'product-details/:ProdID',
    component: ProductDetailsComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path:'profile',component:ProfileComponent
      },
      {
        path:'orders',component:OrdersComponent
      },
      {
        path:'wishlist',component:WishlistComponent
      },
      {
        path:'notification',component:NotificationsComponent
      }
    ],
  },
];
