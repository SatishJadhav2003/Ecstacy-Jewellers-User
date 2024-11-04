import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiRequestService } from '../../../Services/api-request.service';
import { UtilService } from '../../../Services/util.service';
import { StartupService } from '../../Startup/startup.service';
import { Category } from '../../../Shared/Models/Category';

@Component({
  selector: 'app-customize-jewellery',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customize-jewellery.component.html',
  styleUrl: './customize-jewellery.component.css',
})
export class CustomizeJewelleryComponent {
  // Declaration
  jewelryForm: FormGroup;
  categoryList: Category[] = [];

  // Services
  apiRequest = inject(ApiRequestService);
  util = inject(UtilService);
  startup = inject(StartupService);

  constructor(private fb: FormBuilder) {
    window.scrollTo(0, 0);
    this.jewelryForm = this.fb.group({
      file: [null,Validators.required], // File input, no validator
      category: ['', Validators.required],
      purity: ['', Validators.required],
      remark: [''],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      price: [
        0,
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
    });
    this.getCategoryList();
  }

  onSubmit() {
    if (this.jewelryForm.valid) {
      console.log('Form Submitted!', this.jewelryForm.value);
      // Handle form submission, like sending data to a server

      const formData = new FormData();

      // Append the form fields to the FormData object
      formData.append('Category_ID', this.jewelryForm.get('category').value);
      formData.append('User_ID', localStorage.getItem('User_ID'));
      formData.append('Purity', this.jewelryForm.get('purity').value);
      formData.append('Remark', this.jewelryForm.get('remark').value);
      formData.append(
        'Mobile_Number',
        this.jewelryForm.get('mobileNumber').value
      );
      formData.append('Email', this.jewelryForm.get('email').value);
      formData.append('Price', this.jewelryForm.get('price').value);
  

      // Append the file to FormData object
      console.log(this.jewelryForm.get('file').value);
      
      if (this.jewelryForm.get('file').value) {
        formData.append(
          'file',
          this.jewelryForm.get('file').value,
          this.jewelryForm.get('file').value.name
        );
      }
      this.apiRequest.postImage('api/CustomOrder', formData).subscribe((res) => {
        if (res) {
          this.util.success('Custom Order Placed Sucessfully');
          this.jewelryForm.reset();
        }
      });
    } else {
      console.log('Form is invalid');
      this.util.warn('Please enter all valid details');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.jewelryForm.patchValue({ file: file });
  }

  getCategoryList() {
    this.startup.getCategories().subscribe((res) => {
      if (res) {
        this.categoryList = res;
      }
    });
  }
}
