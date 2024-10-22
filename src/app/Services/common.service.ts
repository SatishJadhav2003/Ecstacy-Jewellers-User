import { Injectable, signal, WritableSignal } from '@angular/core';
import { Category } from '../Shared/Models/Category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  // it will return true if product present in cart
  IsInCart(Product_ID: number): boolean { 
    const CartItems = JSON.parse(localStorage.getItem('CartItems')) || [];
    return !!CartItems.find((c) => c.Product_ID == Product_ID);
  }

  // it will return true if product present in wishlist
  IsInWishlist(Product_ID: number): boolean { 
    const WishlistItems = JSON.parse(localStorage.getItem('WishlistItems')) || [];
    return !!WishlistItems.find((c) => c.Product_ID == Product_ID);
  }
}
