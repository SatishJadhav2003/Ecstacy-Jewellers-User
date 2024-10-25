import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.css'
})
export class NewAddressComponent {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      Address_ID: [{ value: null, disabled: true }],
      User_ID: [null, Validators.required],
      Mobile: [null, [Validators.required, Validators.pattern('[0-9]{10}')]],
      Name: ['', Validators.required],
      Address_Type: ['', Validators.required],
      Address_Line1: ['', Validators.required],
      Address_Line2: [''],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Country: ['', Validators.required],
      Postal_Code: [null, Validators.required],
      Is_Default: [false],
      Date_Added: [{ value: new Date(), disabled: true }],
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}