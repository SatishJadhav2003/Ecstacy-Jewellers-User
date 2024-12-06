import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../../Shared/Models/User.mdel';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  signupForm!: FormGroup;
  isOTP: boolean = false;
  mobile: number;
  isPassword: boolean = false;
  createPassword: string = '1234';
  confirmPassword: string = '';
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

    setTimeout(() => {
      this.focusNext('#name');
    }, 500);
  }
  sendOTP() {
    if (this.signupForm.valid) {
      this.isOTP = true;
      this.mobile = parseInt(this.signupForm.get('Cust_Mobile').value);
      setTimeout(() => {
        this.focusNext('#one');
      }, 500);
    }
  }
  onVerify() {
    this.onSubmit();
    // this.isOTP = false;
    // this.isPassword = true;
    // setTimeout(() => {
    //   this.focusNext('#createpassword');
    // }, 500);
  }
  onSubmit() {
    if (this.confirmPassword === this.createPassword) {
      console.log(this.signupForm.value);
      const userData = {
        User_ID: 0,
        First_Name: this.signupForm.get('Cust_Name').value,
        Last_Name: '',
        Email: this.signupForm.get('Cust_Email').value,
        Email_Verified: false,
        Phone_Number: this.signupForm.get('Cust_Mobile').value,
        Phone_Verified: true,
        Password_Hash: '',
        Password_Salt: '',
        Date_Created: undefined,
        Is_Active: true,
        Gender: null,
        Password: this.createPassword,
      };
      console.log(userData);

      this.authService.saveCustomer(userData).subscribe((data) => {
        console.log(data);
        this.onLogin();
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
    if (next == '#enter') {
      this.onVerify();
      return;
    }
    if (next) {
      document.querySelector(next).focus();
    }
  }
}
