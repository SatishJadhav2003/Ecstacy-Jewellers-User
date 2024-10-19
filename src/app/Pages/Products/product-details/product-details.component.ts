import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  imagesList: string[] = [
    'images/category/braclet.png',
    'images/category/neclace.png',
    'images/category/nosering.webp',
    'images/category/Rings.jpg',
  ];

  currentImage: number = 0;
  inCart: boolean = false;

  product: Product[] =[];

  route = inject(ActivatedRoute);
  ProdID!: any;
  readonly productService = inject(ProductService);
  ngOnInit() {
    window.scrollTo(0, 200);
    this.ProdID = this.route.snapshot.paramMap.get('ProdID');
    console.log(this.ProdID);
    this.productService.getProduct(this.ProdID).subscribe((data) => {
      this.product = data;
      console.log(this.product);
    });
  }
}
