import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Product } from '../../Shared/Models/product.model';

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
}
