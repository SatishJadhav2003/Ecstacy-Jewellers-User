import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userInfoForm: FormGroup;
  isEditing: boolean = true;

  // Servies
  accountService = inject(AccountService);
  constructor(private fb: FormBuilder) {
    this.userInfoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.getUserInfo();
    this.toggleEdit();
  }

  // Toggle editing mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.userInfoForm.get('firstname')?.enable();
      this.userInfoForm.get('lastname')?.enable();
      this.userInfoForm.get('email')?.enable();
      this.userInfoForm.get('mobile')?.enable();
      this.userInfoForm.get('gender')?.enable();
    } else {
      this.userInfoForm.get('firstname')?.disable();
      this.userInfoForm.get('lastname')?.disable();
      this.userInfoForm.get('email')?.disable();
      this.userInfoForm.get('mobile')?.disable();
      this.userInfoForm.get('gender')?.disable();
    }
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
    this.toggleEdit();
    this.getUserInfo();
  }

  getUserInfo() {
    this.accountService.getUserInfo().subscribe((res) => {
      debugger;
      if (res.length > 0) {
        this.userInfoForm.patchValue({
          firstname: res[0].First_Name.trim(),
          lastname: res[0].Last_Name.trim(),
          mobile: res[0].Phone_Number.trim(),
          email: res[0].Email.trim(),
          gender: res[0].Gender.trim(),
        });
      }
    });
  }
}
