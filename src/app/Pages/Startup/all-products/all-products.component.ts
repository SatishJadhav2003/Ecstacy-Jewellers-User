import { Component, inject } from '@angular/core';
import { Category } from '../../../Shared/Models/Category';
import { StartupService } from '../startup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  Categories: Category[] = [];

  // Services
  readonly startup = inject(StartupService);
  readonly router = inject(Router);
  ngOnInit() {
    this.getAllCategories();
  }
  getAllCategories() {
    this.startup.getCategories().subscribe((res) => {
      this.Categories = res;
    });
  }

  onCategory(category: Category) {
    localStorage.setItem('CateImage', category.Category_Image);
    this.router.navigate(['product-list/' + category.Category_ID]);
  }
}
