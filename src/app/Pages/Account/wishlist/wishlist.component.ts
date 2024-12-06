import { Component, inject } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ProductCardComponent } from '../../Products/product-card/product-card.component';
import { WishlistOutput } from '../../../Shared/Models/Wishlist';
import { ProductService } from '../../Products/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  productsList: WishlistOutput[] = [];
productService = inject(ProductService);
  ngOnInit() {
    this.productsList = JSON.parse(localStorage.getItem('WishlistItems')) || [];
    if(this.productsList.length <=0)
    {
      this.productService.getUserWishlistItems().subscribe((res)=>{
        this.productsList = res
      })
    }
  }
  removeItem(Product_ID: any) {
    console.log(Product_ID);
    const removeindex = this.productsList.findIndex(
      (a) => a.Product_ID === Product_ID
    );
    this.productsList.splice(removeindex, 1);
  }
}
