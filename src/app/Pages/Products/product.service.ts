import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Product } from '../../Shared/Models/product.model';
import { Product_Images } from '../../Shared/Models/ProductImages';
import { Cart, CartOutput } from '../../Shared/Models/Cart';
import { Wishlist, WishlistOutput } from '../../Shared/Models/Wishlist';
import { Watchlist, WatchlistOutput } from '../../Shared/Models/Watchlist';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiService = inject(ApiRequestService);
  constructor() {}

  getProductsList(Category_ID: any): Observable<Product[]> {
    return this.apiService.get('api/product/ByCatgory/' + Category_ID);
  }

  getProduct(Product_ID: any): Observable<Product[]> {
    return this.apiService.get('api/product/' + Product_ID);
  }

  getProductImages(Product_ID: any): Observable<Product_Images[]> {
    return this.apiService.get('api/productimages/' + Product_ID);
  }

  // Cart section start
  
  addToCart(data: Cart) {
    return this.apiService.post('api/cart', data);
  }

  getUserCartItems(): Observable<CartOutput[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/cart/' + User_ID);
    }
    return null;
  }

  removeFromCart(Cart_ID: number): Observable<boolean> {
    return this.apiService.delete('api/cart/' + Cart_ID);
  }

  incrementQty(Cart_ID:number) {
    return this.apiService.post('api/cart/increment', Cart_ID);
  }

  decrementQty(Cart_ID:number) {
    return this.apiService.post('api/cart/decrement', Cart_ID);
  }

  // Wishlist
  addToWishlist(data: Wishlist) {
    return this.apiService.post('api/Wishlist', data);
  }

  getUserWishlistItems(): Observable<WishlistOutput[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Wishlist/' + User_ID);
    }
    return null;
  }

  removeFromWishlist(Wishlist_ID: number): Observable<boolean> {
    return this.apiService.delete('api/Wishlist/' + Wishlist_ID);
  }

  // Watchlist
  addToWatchlist(data: Watchlist) {
    return this.apiService.post('api/Watchlist', data);
  }

  getUserWatchlistItems(): Observable<WatchlistOutput[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Watchlist/' + User_ID);
    }
    return null;
  }

  removeFromWatchlist(Watchlist_ID: number): Observable<boolean> {
    return this.apiService.delete('api/Watchlist/' + Watchlist_ID);
  }

  // Rating & reviews
  canRate(Product_ID:number):Observable<boolean>
  {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    return this.apiService.get('api/RatingReview/CanUserRateProduct/'+User_ID+'/'+Product_ID);
  }

  saveRatingReview(data:any)
  {
    return this.apiService.postImage('api/RatingReview',data);
  }
}
