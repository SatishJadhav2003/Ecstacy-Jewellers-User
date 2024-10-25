import { Injectable, inject } from '@angular/core';
import { ApiRequestService } from '../../Services/api-request.service';
import { Observable } from 'rxjs';
import { Address } from '../../Shared/Models/Address';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  readonly apiService = inject(ApiRequestService);

  getAddresses(): Observable<Address[]> {
    const User_ID = parseInt(localStorage.getItem('User_ID'));
    if (User_ID) {
      return this.apiService.get('api/Address/' + User_ID);
    }
    return null;
  }
}
