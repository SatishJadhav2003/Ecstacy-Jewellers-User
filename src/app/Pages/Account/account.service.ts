import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Address } from '../../Shared/Models/Address';
import { OrderInputOutput, Order_Description } from './orders/Order';
import { User } from '../../Shared/Models/User.mdel';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly apiService = inject(ApiRequestService);

  // Address Start
  getAddresses(): Observable<Address[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Address/' + User_ID);
    }
    return null;
  }

  addAddress(data: Address): Observable<number> {
    return this.apiService.post('api/Address', data);
  }
  updateAddress(Address_ID: number, data: Address): Observable<number> {
    return this.apiService.put('api/Address/' + Address_ID, data);
  }

  removeAddress(Address_ID: number) {
    return this.apiService.delete('api/Address/' + Address_ID);
  }

  // Orders Start
  getOrders(): Observable<OrderInputOutput[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Order/' + User_ID);
    }
    return null;
  }

  getOrdersDescription(Order_ID: number): Observable<Order_Description[]> {
    return this.apiService.get('api/Order/description/' + Order_ID);
  }

  // Profile
  getUserInfo():Observable<User[]>
  {
    return this.apiService.get('api/User/'+localStorage.getItem('User_ID'));
  }
}
