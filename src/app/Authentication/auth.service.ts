import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Customer } from '../Shared/Models/customer';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../Services/api-request.service';
import { User } from '../Shared/Models/User.mdel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  IsLoggedIn: WritableSignal<boolean> = signal(false);
  RegistrationModalOpen: WritableSignal<boolean> = signal(false);
  LoginModalOpen: WritableSignal<boolean> = signal(false);

  apiRequest = inject(ApiRequestService);
  constructor() {}

  loggedIn() {
    if (this.IsLoggedIn() == true) {
      return true;
    } else {
      if (localStorage.getItem('User_ID')) {
        return true;
      }
      return false;
    }
  }
  logOut() {
    localStorage.removeItem('User');
    localStorage.removeItem('User_ID');
    localStorage.removeItem('CartItems');
    localStorage.removeItem('WishlistItems');
    this.IsLoggedIn.set(false);
  }
  saveCustomer(data: any): Observable<any> {
    return this.apiRequest.post('api/user/register', data);
  }

  loginByPhone(Phone_Number): Observable<User[]> {
    return this.apiRequest.get('api/user/loginbyphone/' + Phone_Number);
  }
}
