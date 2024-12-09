import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Cart, CartOutput } from '../../../Shared/Models/Cart';
import { ProductService } from '../../Products/product.service';
import { UtilService } from '../../../Services/util.service';
import { Router } from '@angular/router';
import { Watchlist, WatchlistOutput } from '../../../Shared/Models/Watchlist';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  // Cart
  productsList: CartOutput[] = [];
  Total_Amount: number = 0;
  Final_Amount: number = 0;
  // Watchlist
  watchList: WatchlistOutput[] = [];
  // Services
  readonly productService = inject(ProductService);
  readonly util = inject(UtilService);
  readonly router = inject(Router);
  ngOnInit() {
    this.productsList = JSON.parse(localStorage.getItem('CartItems')) || [];
    this.calculateTotal();
    this.getWatchlistItems();
  }

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

  placeOrder() {
    this.router.navigate(['/checkout'], {
      queryParams: { fromCart: 1, Product_ID: 0 },
    });
  }

  onHome() {
    this.router.navigate(['']);
  }

  // ************************* Watchlist Start ***************************//
  getWatchlistItems() {
    this.productService.getUserWatchlistItems().subscribe((res) => {
      if (res) {
        console.log(res);
        this.watchList = res;
      }
    });
  }

  addToWatchlist(index: number) {
    const data: Watchlist = {
      Watchlist_ID: 0,
      Product_ID: this.productsList[index].Product_ID,
      User_ID: parseInt(localStorage.getItem('User_ID')),
    };
    this.productService.addToWatchlist(data).subscribe((res) => {
      if (res) {
        const newItem: WatchlistOutput = {
          Watchlist_ID: res,
          Product_ID: data.Product_ID,
          User_ID: data.User_ID,
          Price: this.productsList[index].Price,
          Product_Name: this.productsList[index].Product_Name,
          Description: this.productsList[index].Description,
          Product_Image: this.productsList[index].Product_Image,
          Rating: 0
        };
        this.watchList.push(newItem);

        // Remove from cart
        this.productService
          .removeFromCart(this.productsList[index].Cart_ID)
          .subscribe((res) => {
            if (res) {
              this.productsList.splice(index, 1);
              localStorage.setItem(
                'CartItems',
                JSON.stringify(this.productsList)
              );
              this.calculateTotal();
            }
          });
      }
    });
  }

  removeFromWatchlist(index: number) {
    this.productService
      .removeFromWatchlist(this.watchList[index].Watchlist_ID)
      .subscribe((res) => {
        if (res) {
          this.watchList.splice(index, 1);
        }
      });
  }

  moveToCart(index: number) {
    const cartData: Cart = {
      Cart_ID: 0,
      Product_ID: this.watchList[index].Product_ID,
      User_ID: parseInt(localStorage.getItem('User_ID')),
      Quantity: 1,
    };
    this.productService.addToCart(cartData).subscribe((res) => {
      if (res) {
        this.getCartItems();
        this.productService
          .removeFromWatchlist(this.watchList[index].Watchlist_ID)
          .subscribe((data) => {
            if (data) {
              this.watchList.splice(index, 1);
            }
          });
      }
    });
  }
}
