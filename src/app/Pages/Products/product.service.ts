import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Product } from '../../Shared/Models/product.model';
import { Product_Images } from '../../Shared/Models/ProductImages';
import { Cart } from '../../Shared/Models/Cart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiService = inject(ApiRequestService);
  constructor() {}

  getProductsList(Category_ID: any): Observable<Product[]> {
    return this.apiService.get('api/product/ByCatgory/' + Category_ID);
  }

  getProduct(Product_ID:any):Observable<Product[]>
  {
    return this.apiService.get('api/product/' + Product_ID);
  }

  getProductImages(Product_ID:any):Observable<Product_Images[]>
  {
    return this.apiService.get('api/productimages/' + Product_ID);
  }

  addToCart(data:Cart)
  {
    return this.apiService.post('api/cart' ,data);
  }
}
