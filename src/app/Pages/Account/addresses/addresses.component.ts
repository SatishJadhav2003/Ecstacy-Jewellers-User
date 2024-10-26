import { Component, inject } from '@angular/core';
import { Address } from '../../../Shared/Models/Address';
import { AccountService } from '../account.service';
import { CommonModule } from '@angular/common';
import { NewAddressComponent } from './new-address/new-address.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../../Services/util.service';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, NewAddressComponent],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent {
  addressList: Address[] = [];

  // service
  accountService = inject(AccountService);
  util = inject(UtilService);
  constructor(public dialog: MatDialog) {}
  ngOnInit() {
    this.getUserAddresses();
  }
  getUserAddresses() {
    this.accountService.getAddresses().subscribe((res) => {
      if (res) {
        this.addressList = res;
      }
    });
  }

  addAddress() {
    const dialogRef = this.dialog.open(NewAddressComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form data:', result);
        this.util.success('Address added successfully');
        this.getUserAddresses();
      }
    });
  }

  editAddress(index: number) {
    const dialogRef = this.dialog.open(NewAddressComponent, {
      width: '400px',
      disableClose: true,
      data: this.addressList[index],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Form data:', result);
        this.util.success('Address updated successfully');
        this.getUserAddresses();
      }
    });
  }

  removeAddress(index: number) {
    this.accountService
      .removeAddress(this.addressList[index].Address_ID)
      .subscribe((res) => {
        if (res) {
          this.util.success('Address deleted successfully');
          this.addressList.splice(index, 1);
        }
      });
  }
}
