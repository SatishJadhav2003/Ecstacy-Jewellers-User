import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Shared/Models/product.model';
import { CommonService } from '../../../Services/common.service';
import { ProductService } from '../product.service';
import { Wishlist } from '../../../Shared/Models/Wishlist';
import { UtilService } from '../../../Services/util.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productData: Product = {
    Product_ID: 0,
    Product_Name: 'Product Name',
    Description: '',
    Category_ID: 0,
    Price: 0,
    Stock_Quantity: 0,
    Weight: 0,
    Product_Image: '',
    Is_Active: false,
    Date_Added: new Date(),
    Title: '',
    Dim_Desc: '',
    Dimension_ID: 0,
  };
  inWishlist: boolean = false;
  @Output() removeItem = new EventEmitter<number>();
  router = inject(Router);
  common = inject(CommonService);
  productService = inject(ProductService);
  util = inject(UtilService);
  ngOnInit() {
    this.inWishlist = this.common.IsInWishlist(this.productData.Product_ID);
  }
  onProduct() {
    this.router.navigate(['product-details/' + this.productData.Product_ID]);
  }

  wishlistChange() {
    if (this.inWishlist) {
      const WishlistItems =
        JSON.parse(localStorage.getItem('WishlistItems')) || [];
      const Wishlist_ID = WishlistItems.find(
        (w) => w.Product_ID == this.productData.Product_ID
      ).Wishlist_ID;
      this.productService.removeFromWishlist(Wishlist_ID).subscribe((res) => {
        if (res) {
          this.util.success(
            this.productData.Product_Name + ' removed from wishlist'
          );
          this.removeItem.emit(this.productData.Product_ID);
          this.getWishlistItems();
        }
      });
    } else {
      const WishlistData: Wishlist = {
        Wishlist_ID: 0,
        Product_ID: this.productData.Product_ID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
      };
      this.productService.addToWishlist(WishlistData).subscribe((res) => {
        if (res) {
          this.util.success(
            this.productData.Product_Name + ' added to wishlist'
          );
          this.getWishlistItems();
        }
      });
    }
  }

  getWishlistItems() {
    this.productService.getUserWishlistItems().subscribe((res) => {
      localStorage.setItem('WishlistItems', JSON.stringify(res));
      this.inWishlist = this.common.IsInWishlist(this.productData.Product_ID);
    });
  }
}
