import { Component, inject } from '@angular/core';
import { Address } from '../../../Shared/Models/Address';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { NewAddressComponent } from "./new-address/new-address.component";

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, NewAddressComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent {
  addressList: Address[] = [];
  isModalOpen = false; // Tracks the visibility of the modal
  // service
  accountService = inject(AccountService);

  ngOnInit()
  {
    this.getUserAddresses();
  }
  getUserAddresses() {
    this.accountService.getAddresses().subscribe((res) => {
      if (res) {
        this.addressList = res;
      }
    });
  }

  addAddress()
  {
    this.isModalOpen =true;
  }
}
