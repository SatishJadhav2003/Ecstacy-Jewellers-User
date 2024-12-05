import { Component, inject } from '@angular/core';
import { StartupService } from '../startup.service';
import { Category } from '../../../Shared/Models/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  readonly startup = inject(StartupService);
  router = inject(Router);
  categories: Category[] = [];
  ngOnInit() {
    this.startup.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res.slice(0, 10);
    });
  }

  onCategory(category: Category) {
    localStorage.setItem('CateImage', category.Category_Image);
    this.router.navigate(['product-list/' + category.Category_ID]);
  }
}
