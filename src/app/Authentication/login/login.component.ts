import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signupForm!: FormGroup;
  authService = inject(AuthService);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      Cust_Name: ['', Validators.required],
      Cust_Mobile: [
        '',
        [Validators.required, Validators.pattern(/^(7|8|9)\d{9}$/)],
      ],
      Cust_Email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Handle form submission
      console.log(this.signupForm.value);
      this.authService.saveCustomer(this.signupForm.value).subscribe((data) => {
        console.log(data);
      });
    }
  }

  getClass(name: string) {
    if (
      this.signupForm.get(name)?.invalid &&
      (this.signupForm.get(name)?.dirty || this.signupForm.get(name)?.touched)
    ) {
      return 'ring-2 ring-red-800';
    }
    return '';
  }

  onLogin() {
    this.authService.LoginModalOpen.set(true);
    this.authService.RegistrationModalOpen.set(false);
  }

  focusNext(next: any) {
    if (next) {
      document.querySelector(next).focus();
    }else
    {
      if(next=='enter')
      {
        this.onSubmit();
      }
    }
  }
}
