import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/Startup/home/home.component';
import { ProductListComponent } from './Pages/Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Pages/Products/product-details/product-details.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'product-list/:CateID',component:ProductListComponent
    },
    {
        path:'product-details/:ProdID',component:ProductDetailsComponent
    }
];
 

