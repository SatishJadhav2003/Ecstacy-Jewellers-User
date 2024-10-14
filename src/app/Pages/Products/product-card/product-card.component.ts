import { CommonModule } from '@angular/common';
import { Component, Input, inject, } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Shared/Models/product.model';

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
    Product_Image: '',
    Product_Desc: '',
    Caret: 0,
    Weight: 0,
    Rating: 0,
    Price: 0,
    Making_Charges: 0,
    Other_Charges: 0,
    Category_ID: 0,
    Is_Active: false,
    Is_Edited: false,
    Is_Deleted: false,
    Inserted_Date: undefined,
    Updated_Date: undefined
  };
  inCart: boolean = false;
  router = inject(Router);
  onProduct() {
    this.router.navigate(['product-details/'+this.productData.Product_ID]);
  }
  wishListChange() {
    this.inCart = !this.inCart;
  }
}
