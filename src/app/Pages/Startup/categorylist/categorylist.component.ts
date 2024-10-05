import { Component, inject } from '@angular/core';
import { Category } from '../../../Shared/Models/Category';
import { StartupService } from '../startup.service';

@Component({
  selector: 'app-categorylist',
  standalone: true,
  imports: [],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent {
  startupService = inject(StartupService);
  categoryList: Category[] = [];
  ngOnInit() {
    this.startupService.getCategories().subscribe((data) => {
      console.log(data);
      this.categoryList = data;
    })
  }
}
