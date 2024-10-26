import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Address } from '../../../../Shared/Models/Address';
import { AccountService } from '../../account.service';
import { UtilService } from '../../../../Services/util.service';
@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.css',
})
export class NewAddressComponent {
  addressForm: FormGroup;
  stateList = [];
  isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService: AccountService
  ) {
    this.addressForm = this.fb.group({
      mobile: [null, [Validators.required, Validators.pattern('[0-9]{10}')]],
      name: ['', Validators.required],
      addresstype: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India', Validators.required],
      code: [null, [Validators.required]],
      is_Default: [false],
    });
    if (data) {
      this.addressForm.get('mobile').setValue(data.Mobile);
      this.addressForm.get('name').setValue(data.Name);
      this.addressForm.get('addresstype').setValue(data.Address_Type);
      this.addressForm.get('address1').setValue(data.Address_Line1);
      this.addressForm.get('address2').setValue(data.Address_Line2);
      this.addressForm.get('city').setValue(data.City);
      this.addressForm.get('state').setValue(data.State);
      this.addressForm.get('country').setValue(data.Country);
      this.addressForm.get('code').setValue(data.Postal_Code);
      this.isEdit = true;
    }
    this.getState();
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // Send form data to the backend or process it here
      console.log(this.addressForm.value);
      const saveData: Address = {
        Address_ID: this.data?.Address_ID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
        Mobile: this.addressForm.get('mobile').value,
        Name: this.addressForm.get('name').value,
        Address_Type: this.addressForm.get('addresstype').value,
        Address_Line1: this.addressForm.get('address1').value,
        Address_Line2: this.addressForm.get('address2').value,
        City: this.addressForm.get('city').value,
        State: this.addressForm.get('state').value,
        Country: this.addressForm.get('country').value,
        Postal_Code: this.addressForm.get('code').value,
        Is_Default: false,
        Date_Added: undefined,
      };
      console.log(saveData);
      if (this.isEdit) {
        this.accountService
          .updateAddress(this.data.Address_ID, saveData)
          .subscribe((res) => {
            if (res) {
              this.dialogRef.close(saveData);
            }
          });
      } else {
        this.accountService.addAddress(saveData).subscribe((res) => {
          if (res) {
            saveData.Address_ID = res;
            this.dialogRef.close(saveData);
          }
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  getState() {
    this.stateList = [
      { state: 'Andhra Pradesh', code: 'AP' },
      { state: 'Arunachal Pradesh', code: 'AR' },
      { state: 'Assam', code: 'AS' },
      { state: 'Bihar', code: 'BR' },
      { state: 'Chhattisgarh', code: 'CG' },
      { state: 'Goa', code: 'GA' },
      { state: 'Gujarat', code: 'GJ' },
      { state: 'Haryana', code: 'HR' },
      { state: 'Himachal Pradesh', code: 'HP' },
      { state: 'Jharkhand', code: 'JH' },
      { state: 'Karnataka', code: 'KA' },
      { state: 'Kerala', code: 'KL' },
      { state: 'Madhya Pradesh', code: 'MP' },
      { state: 'Maharashtra', code: 'MH' },
      { state: 'Manipur', code: 'MN' },
      { state: 'Meghalaya', code: 'ML' },
      { state: 'Mizoram', code: 'MZ' },
      { state: 'Nagaland', code: 'NL' },
      { state: 'Odisha', code: 'OR' },
      { state: 'Punjab', code: 'PB' },
      { state: 'Rajasthan', code: 'RJ' },
      { state: 'Sikkim', code: 'SK' },
      { state: 'Tamil Nadu', code: 'TN' },
      { state: 'Telangana', code: 'TG' },
      { state: 'Tripura', code: 'TR' },
      { state: 'Uttar Pradesh', code: 'UP' },
      { state: 'Uttarakhand', code: 'UK' },
      { state: 'West Bengal', code: 'WB' },
    ];
  }
}
