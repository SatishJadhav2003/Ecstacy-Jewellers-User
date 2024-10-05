import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Customer } from '../Shared/Models/customer';
import { Observable } from 'rxjs';
import { ApiRequestService } from '../Services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  IsLoggedIn: WritableSignal<boolean> = signal(false);
  RegistrationModalOpen: WritableSignal<boolean> = signal(true);
  LoginModalOpen: WritableSignal<boolean> = signal(false);

  apiRequest = inject(ApiRequestService);
  constructor() { }


  saveCustomer(data: Customer): Observable<any> { 
    return this.apiRequest.post('api/customer', data);
  }
}
