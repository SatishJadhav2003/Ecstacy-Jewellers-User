import { Component, inject } from '@angular/core';
import { Category } from '../../../Shared/Models/Category';
import { StartupService } from '../startup.service';

@Component({
  selector: 'app-feature-category',
  standalone: true,
  imports: [],
  templateUrl: './feature-category.component.html',
  styleUrl: './feature-category.component.css'
})
export class FeatureCategoryComponent {
  Category: Category = new Category();
  startupService = inject(StartupService)
  ngOnInit() {
    this.startupService.getFeatureCategory().subscribe((data) => {
      this.Category = data;
    })
  }
}
