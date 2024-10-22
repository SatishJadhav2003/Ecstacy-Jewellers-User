import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartOutput } from '../../../Shared/Models/Cart';
import { ProductService } from '../../Products/product.service';
import { UtilService } from '../../../Services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  productsList: CartOutput[] = [];
  readonly productService = inject(ProductService);
  readonly util = inject(UtilService);
  readonly router = inject(Router);
  ngOnInit() {
    this.productsList = JSON.parse(localStorage.getItem('CartItems')) || [];
    this.calculateTotal();
  }
  Total_Amount: number = 0;
  Final_Amount: number = 0;
  calculateTotal() {
    if (this.productsList?.length > 0) {
      this.Total_Amount = this.productsList
        .map((p) => p.Price * p.Quantity)
        .reduce((a, b) => a + b);
      console.log(this.Total_Amount);

      // Add delivery & other charges
      this.Final_Amount = this.Total_Amount;
    } else {
      this.Total_Amount = this.Final_Amount = 0;
    }
  }

  increment(index: number) {
    console.log(this.productsList[index].Cart_ID);

    this.productService
      .incrementQty(this.productsList[index].Cart_ID)
      .subscribe((res) => {
        if (res) {
          this.getCartItems();
        }
      });
  }

  decrement(index: number) {
    if (--this.productsList[index].Quantity <= 0) {
      this.productsList[index].Quantity = 1;
    } else {
      this.productService
        .decrementQty(this.productsList[index].Cart_ID)
        .subscribe((res) => {
          if (res) {
            this.getCartItems();
          }
        });
    }
  }

  removeFromCart(index: number) {
    this.productService
      .removeFromCart(this.productsList[index].Cart_ID)
      .subscribe((data) => {
        if (data) {
          this.util.success(
            this.productsList[index].Product_Name + ' removed from cart'
          );
          this.getCartItems();
        } else {
          this.util.error(
            this.productsList[index].Product_Name +
              ' unable to remove cart, Please try again '
          );
        }
      });
  }

  onProduct(Product_ID: number) {
    this.router.navigate(['product-details/' + Product_ID]);
  }

  getCartItems() {
    this.productService.getUserCartItems().subscribe((res) => {
      this.productsList = res;
      this.calculateTotal();
      localStorage.setItem('CartItems', JSON.stringify(res));
    });
  }
}
