import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[987]\\d{9}$')]],
      subject: ['']
    });
  }

  // Form submission handler
  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Form Data:", this.contactForm.value);
      // Add logic to handle form data, like sending it to an API
    } else {
      console.log("Form is invalid");
    }
  }
}
