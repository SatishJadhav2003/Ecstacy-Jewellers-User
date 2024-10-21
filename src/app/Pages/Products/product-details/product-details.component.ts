import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product_Images } from '../../../Shared/Models/ProductImages';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../../Services/util.service';
import { Cart } from '../../../Shared/Models/Cart';

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
  readonly productService = inject(ProductService);
  readonly util = inject(UtilService);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.ProdID = this.route.snapshot.paramMap.get('ProdID');
    console.log(this.ProdID);
    this.productService.getProduct(this.ProdID).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
    this.productService.getProductImages(this.ProdID).subscribe((data) => {
      console.log(data);
      this.imagesList = data;
    });
  }

  addToCart() {
    if (this.inCart) {
      this.util.error('Removed from cart');
      this.inCart = false;
    } else {
      const cartData:Cart = {
        Cart_ID: 0,
        Product_ID: this.ProdID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
        Quantity: 1
      }
      console.log(cartData);
      
      this.productService.addToCart(cartData).subscribe((data) => {
        console.log(data);
        this.util.success('Added To Cart');
        this.inCart = true;
      });
    }
  }
}
