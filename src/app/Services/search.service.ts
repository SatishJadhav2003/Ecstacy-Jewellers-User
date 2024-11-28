import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Shared/Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public  searchQuery = new Subject<string>();
  readonly apiRequest = inject(ApiRequestService);

  searchSuggestions(query):Observable<Product[]> {
    return this.apiRequest.get('api/product/suggestions/'+query);
  }

  getFilteredData(filters)
  {
    return this.apiRequest.post('api/product/GetFiltered',filters);
  }
}
