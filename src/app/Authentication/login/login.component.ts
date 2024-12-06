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
  isOTP: boolean = false;
  authService = inject(AuthService);
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      Cust_Mobile: [
        '',
        [Validators.required, Validators.pattern(/^(7|8|9)\d{9}$/)],
      ],
    });
    setTimeout(() => {
      this.focusNext('#mobile');
    }, 500);
  }

  onSubmit() {
    this.isOTP = true;
    setTimeout(() => {
      this.focusNext('#one');
    }, 500);
  }

  onVerify() {
    this.authService
      .loginByPhone(this.signupForm.get('Cust_Mobile').value)
      .subscribe((res) => {
        console.log(res);
        if (res.length > 0) {
          localStorage.setItem('User', JSON.stringify(res[0]));
          localStorage.setItem('User_ID', JSON.stringify(res[0].User_ID));
          this.authService.IsLoggedIn.set(true);
          this.authService.LoginModalOpen.set(false);
          this.authService.RegistrationModalOpen.set(false);
        }
      });
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

  onRegistration() {
    this.authService.RegistrationModalOpen.set(true);
    this.authService.LoginModalOpen.set(false);
  }
  resendOTP() {}
  focusNext(next: any) {
    if (next) {
      document.querySelector(next).focus();
    } else {
      if (next == 'enter') {
        this.onSubmit();
      }
    }
  }
}
