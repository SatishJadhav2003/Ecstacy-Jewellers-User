import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Address } from '../../Shared/Models/Address';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly apiService = inject(ApiRequestService);

  getUserAddresses(): Observable<Address[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Address/' + User_ID);
    }
    return null;
  }

  placeOrder(data:any)
  {
    return this.apiService.post('api/order' , data);
  }
}
