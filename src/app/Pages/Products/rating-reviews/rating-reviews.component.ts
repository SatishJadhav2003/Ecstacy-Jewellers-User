import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { imageUrl } from '../../../app.config';
import { UtilService } from '../../../Services/util.service';
import { ImageGalleryComponent } from '../../Other/image-gallery/image-gallery.component';
@Component({
  selector: 'app-rating-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, ImageGalleryComponent],
  templateUrl: './rating-reviews.component.html',
  styleUrl: './rating-reviews.component.css',
})
export class RatingReviewsComponent {
  ratingReviewList: any[] = [];
  rating: number = 0;
  ProdID: any = 0;
  canRateProduct: boolean = false;
  reviewText: string = '';
  files: File[] = [];
  ratingLabels = ['Hated it', "Didn't Like", 'Was Ok', 'Liked', 'Loved it'];
  reviewForm: FormGroup;
  // Images
  imagesList: any[] = [];
  showImages: boolean = false;
  imagesToshow: any[] = [];
  focusIndex: number = 0;
  // Dependecies
  readonly route = inject(ActivatedRoute);
  readonly productService = inject(ProductService);
  readonly fb = inject(FormBuilder);
  readonly util = inject(UtilService);
  ngOnInit() {
    this.ProdID = parseInt(this.route.snapshot.paramMap.get('ProdID'));
    if (this.ProdID) {
      this.canRate();
      this.getRatings();
    }
  }

  getRatings() {
    this.productService.getProducReviews(this.ProdID).subscribe((res) => {
      if (res) {
        this.ratingReviewList = res;
        this.extractAllImages();
      }
    });
  }

  getImage(path: string): string {
    return imageUrl + '/api/RatingReview/images/' + path;
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
      if (this.canRateProduct) {
        this.reviewForm = this.fb.group({
          Product_ID: [this.ProdID, Validators.required],
          User_ID: [localStorage.getItem('User_ID'), Validators.required],
          Rating: [
            this.rating,
            [Validators.required, Validators.min(1), Validators.max(5)],
          ],
          Review_Text: [this.reviewText, Validators.required],
        });
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.files = Array.from(event.target.files);
    }
  }

  // Submit the review
  submitReview(): void {
    this.reviewForm.patchValue({
      Product_ID: this.ProdID,
      User_ID: localStorage.getItem('User_ID'),
      Rating: this.rating,
      Review_Text: this.reviewText,
    });
    debugger;
    if (this.reviewForm.invalid) {
      this.util.warn('Please fill all data');
      return;
    }
    const reviewData = this.reviewForm.value;

    this.productService.saveRatingAndReview(reviewData, this.files).subscribe({
      next: (reviewId) => {
        this.util.success('Review Added Successfully');
        this.resetForm();
        this.files = [];
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        this.util.error('Failed to submit review. Please try again later');
      },
    });
  }

  resetForm() {
    this.rating = 0;
    this.reviewText = '';
    this.files = [];
    this.reviewForm.reset();
  }

  // Images
  extractAllImages() {
    this.imagesList = this.ratingReviewList.reduce((acc, item) => {
      // Check if item.Images exists and is an array
      if (Array.isArray(item.Images)) {
        // Concatenate all images into the accumulator
        return acc.concat(item.Images);
      }
      return acc;
    }, []);

    console.log(this.imagesList); // Optionally, log to see the result
  }

  viewImages(index, focus) {
    this.imagesToshow = [];
    if (index == -1) {
      this.imagesToshow = this.imagesList;
    } else {
      const temp = [this.ratingReviewList[index]];
      this.imagesToshow = temp.reduce((acc, item) => {
        // Check if item.Images exists and is an array
        if (Array.isArray(item.Images)) {
          // Concatenate all images into the accumulator
          return acc.concat(item.Images);
        }
        return acc;
      }, []);
    }
    this.focusIndex = focus;
    this.showImages = true;
  }
}
