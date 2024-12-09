import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { UtilService } from '../../../Services/util.service';
import { User } from '../../../Shared/Models/User.mdel';

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
  util = inject(UtilService);
  constructor(private fb: FormBuilder) {
    this.userInfoForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      userid:[0],
      phoneverified:[false],
      emailverified:[false],
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
      console.log(userData);
      
      const temp :User = {
        User_ID: parseInt(this.userInfoForm.get('userid').value),
        First_Name:this.userInfoForm.get('firstname').value,
        Last_Name:this.userInfoForm.get('lastname').value,
        Email:this.userInfoForm.get('email').value,
        Email_Verified: false,
        Phone_Number:this.userInfoForm.get('mobile').value,
        Phone_Verified: false,
        Password_Hash:'',
        Password_Salt:'',
        Date_Created: undefined,
        Is_Active: true,
        Gender:this.userInfoForm.get('gender').value
      }
      this.accountService.updateUserInfo(temp).subscribe((res) => {
        if (res) {
          this.util.success('Profile updated succesfully');
          this.toggleEdit(); // Exit editing mode
        }
        else
        {
          this.util.error("Error while updating user info");
          console.log(res);
          
        }
      },err=>{
        console.log(err);
        
      });
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
      
      if (res.length > 0) {
        this.userInfoForm.patchValue({
          firstname: res[0].First_Name.trim(),
          lastname: res[0].Last_Name.trim(),
          mobile: res[0].Phone_Number.trim(),
          email: res[0].Email.trim(),
          gender: res[0].Gender.trim(),
          userid: res[0].User_ID,
          phoneverified: res[0].Phone_Verified,
          emailverified: res[0].Email_Verified,
        });
      }
    });
  }
}
