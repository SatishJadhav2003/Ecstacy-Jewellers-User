import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  inCart: boolean = false;
  router = inject(Router);
  onProduct() {
    this.router.navigate(['product-details']);
  }
  addToWishlist() {
    this.inCart = !this.inCart;
  }
}
