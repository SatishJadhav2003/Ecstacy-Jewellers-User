import { Component } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ProductCardComponent } from '../../Products/product-card/product-card.component';
import { WishlistOutput } from '../../../Shared/Models/Wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  productsList: WishlistOutput[] = [];

  ngOnInit() {
    this.productsList = JSON.parse(localStorage.getItem('WishlistItems')) || [];
  }
  removeItem(Product_ID: any) {
    console.log(Product_ID);
    const removeindex = this.productsList.findIndex(
      (a) => a.Product_ID === Product_ID
    );
    this.productsList.splice(removeindex, 1);
  }
}
