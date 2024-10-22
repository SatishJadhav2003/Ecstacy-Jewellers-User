import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product_Images } from '../../../Shared/Models/ProductImages';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../Services/util.service';
import { Cart } from '../../../Shared/Models/Cart';
import { CommonService } from '../../../Services/common.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  imagesList: Product_Images[] = [];
  currentImage: number = 0;
  inCart: boolean = false;
  product: Product[] = [];
  ProdID!: any;

  route = inject(ActivatedRoute);
  router = inject(Router);
  readonly productService = inject(ProductService);
  readonly common = inject(CommonService);
  readonly util = inject(UtilService);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.ProdID = this.route.snapshot.paramMap.get('ProdID');
    console.log(this.ProdID);

    // Check wheather product is present in cart or not
    this.inCart = this.common.IsInCart(this.ProdID) ? true : false;

    console.log(this.inCart);

    this.productService.getProduct(this.ProdID).subscribe((data) => {
      this.product = data;
    });
    this.productService.getProductImages(this.ProdID).subscribe((data) => {
      this.imagesList = data;
    });
  }

  addToCart() {
    if (this.inCart) {
      this.router.navigate(['user/cart']);
    } else {
      const cartData: Cart = {
        Cart_ID: 0,
        Product_ID: this.ProdID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
        Quantity: 1,
      };

      this.productService.addToCart(cartData).subscribe((data) => {
        if (data) {
          this.util.success(this.product[0].Product_Name + ' Added To Cart');
          this.inCart = true;
          this.productService.getUserCartItems().subscribe((res) => {
            if (res) {
              localStorage.setItem('CartItems', JSON.stringify(res));
            }
          });
        }
      });
    }
  }
}
