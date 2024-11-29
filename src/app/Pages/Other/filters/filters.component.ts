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
      Min: 0,
      Max: 25000,
      Label: '0-25K',
    },
    {
      Min: 25000,
      Max: 50000,
      Label: '25K-50K',
    },
    {
      Min: 50000,
      Max: 100000,
      Label: '50K-1L',
    },
    {
      Min: 100000,
      Max: 10000000,
      Label: '1L+',
    },
  ];
  selectedPrice: any[] = [];

  readonly startupService = inject(StartupService);
  readonly router = inject(Router);
  readonly util = inject(UtilService);
  ngOnInit() {
    this.loadCategories();
    this.loadMetal();
    const temp = JSON.parse(localStorage.getItem('filters'));
    if (temp) {
      this.selectedCategories = temp.category ?? [];
      this.selectedMetals = temp.metal ?? [];
      this.selectedGenders = temp.gender ?? [];
      this.selectedPrice = temp.price ?? [];
    }
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

  // Metal Start
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

  // gender start
  selectGender(gender: any) {
    const temp = this.selectedGenders.findIndex((item) => item === gender);
    if (temp !== -1) {
      this.selectedGenders.splice(temp, 1); // Remove if exists
    } else {
      this.selectedGenders.push(gender); // Add if not exists
    }
    console.log(this.selectedGenders);
  }

  GenderSelected(gender: any): boolean {
    return this.selectedGenders.includes(gender); // Check existence
  }

  // Price band
  selectPrice(min: number, max: number) {
    const temp = this.selectedPrice.findIndex((item) => item === min);
    if (temp !== -1) {
      this.selectedPrice.splice(temp, 1); // Remove if exists
    } else {
      this.selectedPrice.push(min); // Add if not exists
    }
    console.log(this.selectedPrice);
  }

  PriceSelected(min: any): boolean {
    return this.selectedPrice.includes(min); // Check existence
  }

  applyFilters() {
    // const selectedFilters = this.filterColumns.map((column) =>
    //   column.items.filter((item) => item.checked).map((item) => item.id)
    // );
    // console.log('Applied Filters:', selectedFilters);
    const temp = {
      category: this.selectedCategories,
      metal: this.selectedMetals,
      gender: this.selectedGenders,
      price: this.selectedPrice,
    };
    localStorage.setItem('filters', JSON.stringify(temp));
    this.router.navigate(['search']);
  }

  clearFilters() {
    localStorage.removeItem('filters');
  }
}
