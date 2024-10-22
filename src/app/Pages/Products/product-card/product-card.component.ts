import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Shared/Models/product.model';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productData : Product={
    Product_ID: 0,
    Product_Name: "Product Name",
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
    Dimension_ID: 0
  };
  inWishlist: boolean = false;
  @Output() removeItem = new EventEmitter<number>();
  router = inject(Router);
  common = inject(CommonService);
  ngOnInit()
  {
    this.inWishlist = this.common.IsInWishlist(this.productData.Product_ID) ? true : false;
  }
  onProduct() {
    this.router.navigate(['product-details/'+this.productData.Product_ID]);
  }

  removeWishlistItem() {
    // this.inWishlist = !this.inWishlist;
    this.removeItem.emit(this.productData.Product_ID);
  }
}
