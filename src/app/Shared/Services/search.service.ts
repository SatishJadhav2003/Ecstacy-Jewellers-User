import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public  searchQuery = new Subject<string>();
  readonly apiRequest = inject(ApiRequestService);

  searchSuggestions(query):Observable<Product[]> {
    return this.apiRequest.get('api/product/suggestions/'+query);
  }
}
