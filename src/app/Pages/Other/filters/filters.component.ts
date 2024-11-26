import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StartupService } from '../../Startup/startup.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  filterColumns = [
    {
      title: 'All Jewelry',
      items: [],
    },
    {
      title: 'Metal',
      items: [],
    },
    {
      title: 'Gender',
      items: [
        { id: 1, label: 'Male', checked: false },
        { id: 2, label: 'Female', checked: false },
        { id: 3, label: 'Kids & Teenage', checked: false },
      ],
    },
    {
      title: 'Price Band',
      items: [
        { id: 1, label: '<25K', checked: false },
        { id: 2, label: '25K - 50K', checked: false },
        { id: 3, label: '50K - 1L', checked: false },
        { id: 4, label: '1L & Above', checked: false },
      ],
    },
  ];

  readonly startupService = inject(StartupService);

  ngOnInit()
  {
    this.loadCategories();
    this.loadMetal();
  }

  loadCategories() {
    this.startupService
      .getCategories()
      .pipe(
        map((categories: any[]) =>
          categories.map((category) => ({
            id:category.Category_ID,
            label:category.Category_Name,
            checked: false, // Add the checked flag
          }))
        )
      )
      .subscribe(
        (modifiedCategories) => {
          this.filterColumns[0].items = modifiedCategories;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  loadMetal()
  {
    this.startupService
      .getMetalList()
      .pipe(
        map((Metals: any[]) =>
          Metals.map((metal) => ({
            id:metal.Metal_ID,
            label:metal.Metal_Name,
            checked: false, // Add the checked flag
          }))
        )
      )
      .subscribe(
        (modifiedMetals) => {
          this.filterColumns[1].items = modifiedMetals;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }
  applyFilters() {
    const selectedFilters = this.filterColumns.map((column) =>
      column.items.filter((item) => item.checked).map((item) => item.label)
    );
    console.log('Applied Filters:', selectedFilters);
  }
}
