import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StartupService } from '../../Startup/startup.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from '../../../Shared/Models/Category';
import { Metal } from '../../../Shared/Models/Metal';
import { UtilService } from '../../../Services/util.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  categories: Category[] = [];
  selectedCategories: number[] = [];
  metals: Metal[] = [];
  selectedMetals: number[] = [];
  Genders: string[] = ['Male', 'Female', 'Kids'];
  selectedGenders: string[] = [];
  PriceBand: any[] = [
    {
      Value: 25000,
      Label: 'below 25K',
    },
    {
      Value: 50000,
      Label: '25K-50K',
    },
    {
      Value: 100000,
      Label: '50K-1L',
    },
    {
      Value: 1000000,
      Label: 'Above 10L',
    },
  ];

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
  readonly router = inject(Router);
  readonly util = inject(UtilService);
  ngOnInit() {
    this.loadCategories();
    this.loadMetal();
  }

  loadCategories() {
    this.startupService.getCategories().subscribe(
      (res) => {
        if (res) {
          this.categories = res;
        } else {
          this.util.error('Categories not found');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    // this.startupService
    //   .getCategories()
    //   .pipe(
    //     map((categories: any[]) =>
    //       categories.map((category) => ({
    //         id:category.Category_ID,
    //         label:category.Category_Name,
    //         checked: false, // Add the checked flag
    //       }))
    //     )
    //   )
    //   .subscribe(
    //     (modifiedCategories) => {
    //       this.filterColumns[0].items = modifiedCategories;
    //     },
    //     (error) => {
    //       console.error('Error fetching categories:', error);
    //     }
    //   );
  }

  selectCate(CateID: any) {
    const temp = this.selectedCategories.findIndex((item) => item === CateID);
    if (temp !== -1) {
      this.selectedCategories.splice(temp, 1); // Remove if exists
    } else {
      this.selectedCategories.push(CateID); // Add if not exists
    }
    console.log(this.selectedCategories);
  }
  
  cateSelected(CateID: any): boolean {
    return this.selectedCategories.includes(CateID); // Check existence
  }
  
  loadMetal() {
    this.startupService.getMetalList().subscribe(
      (res) => {
        if (res) {
          this.metals = res;
        }
      },
      (error) => {
        console.error('Error fetching metals:', error);
      }
    );
  }
  selectMetal(MetalID: any) {
    const temp = this.selectedMetals.findIndex((item) => item === MetalID);
    if (temp !== -1) {
      this.selectedMetals.splice(temp, 1); // Remove if exists
    } else {
      this.selectedMetals.push(MetalID); // Add if not exists
    }
    console.log(this.selectedMetals);
  }
  
  MetalSelected(MetalID: any): boolean {
    return this.selectedMetals.includes(MetalID); // Check existence
  }
  
  applyFilters() {
    const selectedFilters = this.filterColumns.map((column) =>
      column.items.filter((item) => item.checked).map((item) => item.id)
    );
    console.log('Applied Filters:', selectedFilters);
    const temp = {
      category: selectedFilters[0],
      metal: selectedFilters[1],
      gender: selectedFilters[2],
      price: selectedFilters[3],
    };
    localStorage.setItem('filters', JSON.stringify(temp));
    this.router.navigate(['search']);
  }
}
