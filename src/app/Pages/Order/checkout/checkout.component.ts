import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartOutput } from '../../../Shared/Models/Cart';
import { ProductService } from '../../Products/product.service';
import { OrderService } from '../order.service';
import { Address } from '../../../Shared/Models/Address';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  orderService = inject(OrderService);
  selectedAddress: number = 0;
  addresses: Address[] = [];
  productsList: CartOutput[] = [];
  fromCart: boolean = false;
  Product_ID: number = 0;
  Total_Amount: number = 0;
  Final_Amount: number = 0;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.fromCart = params['fromCart'] == '1' ? true : false;
      this.Product_ID = params['Product_ID'];
      if (!this.fromCart && !this.Product_ID) {
        this.router.navigate(['']);
      } else {
        this.getProducts();
        this.getAddress();
      }
    });
  }

  getProducts() {
    if (this.fromCart) {
      this.productsList = JSON.parse(localStorage.getItem('CartItems'));
      this.calculateTotal();
    } else {
      this.productService.getProduct(this.Product_ID).subscribe((data) => {
        if (data) {
          const product: CartOutput = {
            Cart_ID: 0,
            Product_ID: data[0].Product_ID,
            User_ID: 0,
            Quantity: 1,
            Price: data[0].Price,
            Product_Name: data[0].Product_Name,
            Description: data[0].Description,
            Product_Image: data[0].Product_Image,
          };
          this.productsList.push(product);
          this.calculateTotal();
        }
      });
    }
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
    this.productsList[index].Quantity++;
    this.calculateTotal();

    // Write logic to update in database
  }

  decrement(index: number) {
    if (--this.productsList[index].Quantity <= 0) {
      this.productsList[index].Quantity = 1;
    }
    this.calculateTotal();
    // Write logic to update in database
  }

  removeFromList(index: number) {
    this.productsList.splice(index, 1);
    this.calculateTotal();
  }

  getAddress() {
    this.orderService.getUserAddresses().subscribe((res) => {
      console.log(res);
      this.addresses = res;
      this.selectedAddress = this.addresses[0].Address_ID;
    });
  }

  placeOrder() {
    let order: any = {
      Address_ID: this.selectedAddress,
      User_ID: localStorage.getItem('User_ID'),
      Status: 'Pending',
      Total_Amount: this.Final_Amount,
      Shipping_Address: this.getAddressLine(),
      Billing_Address: this.getAddressLine(),
      Payment_Status: 'Pending',
      OrderItems: [],
    };
    this.productsList.forEach((prod) => {
      const item = {
        Product_ID: prod.Product_ID,
        Quantity: prod.Quantity,
        Unit_Price: prod.Price,
      };
      order.OrderItems.push(item);
    });
    console.log(order);
    this.orderService.placeOrder(order).subscribe((res) => {
      if (res) {
        
        this.router.navigate(['orderconfirmed']);
      }
    });
  }

  getAddressLine() {
    const index = this.addresses.findIndex(
      (a) => a.Address_ID == this.selectedAddress
    );
    return `${this.addresses[index].Address_Type}: ${this.addresses[index].Name} - ${this.addresses[index].Mobile}, ${this.addresses[index].Address_Line1} ${this.addresses[index].Address_Line2}, ${this.addresses[index].City}, ${this.addresses[index].State}-${this.addresses[index].Postal_Code}`;
  }

  onProduct(Product_ID: number) {
    this.router.navigate(['product-details/' + Product_ID]);
  }
}
