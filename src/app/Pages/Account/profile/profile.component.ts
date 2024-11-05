import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfoForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) {
    // Initialize the form with default values and validators
    this.userInfoForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Toggle editing mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.userInfoForm.valid) {
      const userData = this.userInfoForm.value;
      console.log('User Data:', userData);
      // Perform any further processing, e.g., sending to a server
      this.toggleEdit(); // Exit editing mode
    } else {
      console.log('Form is invalid');
    }
  }

  // Handle form cancellation
  onCancel(): void {
    this.isEditing = false;
    this.userInfoForm.reset({
      name: 'John Doe', // Optional: reset with default values
      gender: 'male',
      mobile: '1234567890',
      email: 'johndoe@example.com'
    });
  }
}
