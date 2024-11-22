import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rating-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-reviews.component.html',
  styleUrl: './rating-reviews.component.css',
})
export class RatingReviewsComponent {
  reviewsImgList: any[] = [];
  rating: number = 0;
  ProdID: any = 0;
  canRateProduct: boolean = false;
  reviewText: string = '';
  files: File[] = [];
  ratingLabels = ['Hated it', "Didn't Like", 'Was Ok', 'Liked', 'Loved it'];

  // Dependecies
  readonly route = inject(ActivatedRoute);
  readonly productService = inject(ProductService);
  readonly http = inject(HttpClient);
  ngOnInit() {
    this.ProdID = parseInt(this.route.snapshot.paramMap.get('ProdID'));
    // this.setRating(this.rating);
    this.canRate();
  }
  // Rating & Review
  setRating(rating) {
    this.rating = rating;
    const stars = document.querySelectorAll('#starRating button');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('text-yellow-400');
        star.classList.remove('text-gray-400');
      } else {
        star.classList.add('text-gray-400');
        star.classList.remove('text-yellow-400');
      }
    });
  }

  // Checek wheather allow to rate or not
  canRate() {
    this.productService.canRate(this.ProdID).subscribe((res) => {
      this.canRateProduct = res ? res : false;
      console.log(res);
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
      console.log('Files selected:', this.files);
    } else {
      console.log('No files selected');
      this.files = [];
    }
  }
  
  

  submitReview() {
    if (this.rating === 0 || !this.reviewText.trim()) {
      alert('Please provide a rating and a review text.');
      return;
    }

    const formData = new FormData();
    formData.append('Product_ID', this.ProdID); 
    formData.append('User_ID', localStorage.getItem('User_ID')); 
    formData.append('Rating', this.rating.toString());
    formData.append('Review_Text', this.reviewText);

    this.files.forEach((file, index) => {
      formData.append(`images[${index}]`, file, file.name);
    });

    this.productService.saveRatingReview(formData).subscribe((res)=>{
      console.log(res);
      
    })
  }

  resetForm() {
    this.rating = 0;
    this.reviewText = '';
    this.files = [];
  }
}
