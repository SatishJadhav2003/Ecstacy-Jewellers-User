import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../../Shared/Models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productList: Product[] = [];

  route = inject(ActivatedRoute);
  cateID!: any;
  readonly productService = inject(ProductService);
  ngOnInit() {
    window.scrollTo(0, 200)
    this.cateID = this.route.snapshot.paramMap.get('CateID');
    console.log(this.cateID);
    this.productService.getProductsList(this.cateID).subscribe((data) => {
      
      this.productList = data;
    });
  }
}
