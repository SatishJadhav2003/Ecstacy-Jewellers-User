import { Component } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ProductCardComponent } from "../../Products/product-card/product-card.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  productsList: Product[] = [
    {
      Product_ID: 0,
      Product_Name: 'Product Name ',
      Description: '',
      Category_ID: 1,
      Price: 34999,
      Stock_Quantity: 23
    }, {
      Product_ID: 2,
      Product_Name: 'Product Name 2',
      Description: '',
      Category_ID: 1,
      Price: 34999,
      Stock_Quantity: 23
    }, {
      Product_ID: 3,
      Product_Name: 'Product Name 3',
      Description: '',
      Category_ID: 1,
      Price: 34999,
      Stock_Quantity: 23
    }, {
      Product_ID: 4,
      Product_Name: 'Product Name 4',
      Description: '',
      Category_ID: 1,
      Price: 34999,
      Stock_Quantity: 23
    }
  ];


  removeItem(Product_ID:any)
  {
    console.log(Product_ID);
    const removeindex = this.productsList.findIndex((a)=>a.Product_ID===Product_ID);
    this.productsList.splice(removeindex,1);
  }
}
