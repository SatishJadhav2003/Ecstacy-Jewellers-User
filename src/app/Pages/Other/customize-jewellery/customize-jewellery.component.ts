import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customize-jewellery',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './customize-jewellery.component.html',
  styleUrl: './customize-jewellery.component.css'
})
export class CustomizeJewelleryComponent {
  jewelryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    window.scrollTo(0,0);
    this.jewelryForm = this.fb.group({
      file: [null], // File input, no validator
      category: ['', Validators.required],
      purity: ['', Validators.required],
      remark: [''],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(10000000)]]
    });
  }

  onSubmit() {
    if (this.jewelryForm.valid) {
      console.log('Form Submitted!', this.jewelryForm.value);
      // Handle form submission, like sending data to a server
    } else {
      console.log('Form is invalid');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.jewelryForm.patchValue({ file: file });
  }
}
