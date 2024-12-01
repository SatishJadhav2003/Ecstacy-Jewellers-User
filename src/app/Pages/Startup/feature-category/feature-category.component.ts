import { Component, inject } from '@angular/core';
import { Category } from '../../../Shared/Models/Category';
import { StartupService } from '../startup.service';
import { Product } from '../../../Shared/Models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-category',
  standalone: true,
  imports: [],
  templateUrl: './feature-category.component.html',
  styleUrl: './feature-category.component.css',
})
export class FeatureCategoryComponent {
  Products: Product[] = [];
  startupService = inject(StartupService);
  router = inject(Router);
  ngOnInit() {
    this.startupService.getFeatureCategory().subscribe((data) => {
      this.Products = data;
      console.log(data);
      
    });
  }
  onCollection() {
    this.router.navigate(['product-list/' + this.Products[0].Category_ID]);
  }
  onProduct(Product_ID:number)
  {
    this.router.navigate(['product-details/' + Product_ID])
  }
}
