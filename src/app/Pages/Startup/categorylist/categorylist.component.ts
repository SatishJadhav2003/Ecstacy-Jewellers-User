import { Component, inject } from '@angular/core';
import { Category } from '../../../Shared/Models/Category';
import { StartupService } from '../startup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorylist',
  standalone: true,
  imports: [],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css',
})
export class CategorylistComponent {
  startupService = inject(StartupService);
  router = inject(Router);
  categoryList: Category[] = [];
  ngOnInit() {
    this.startupService.getCategories().subscribe((data) => {
      console.log(data);
      this.categoryList = data;
    });
  }

  onCategory(category:Category) {
    this.router.navigate(['product-list/'+category.Category_ID]);
  }
}
