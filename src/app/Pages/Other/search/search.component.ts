import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../../Services/search.service';
import { Product } from '../../../Shared/Models/product.model';
import { ProductCardComponent } from '../../Products/product-card/product-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchText: string = '';
  searchList: Product[] = [];
  filters: any[] = [];
  private readonly destroy$ = new Subject<void>();

  readonly route = inject(ActivatedRoute);
  readonly searchService = inject(SearchService);

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.searchText = params['text'] || '';
        console.log(this.searchText);
        if (this.searchText) {
          this.searchService.searchQuery.next(this.searchText);
          this.getSearchProducts();
        }
      });
    this.filters = JSON.parse(localStorage.getItem('filters'));
    console.log(this.filters);
    localStorage.removeItem('filters');
    if(this.filters)
    {
      this.getFilteredData();
    }
  }

  // Search functionality
  getSearchProducts() {
    this.searchService
      .searchSuggestions(this.searchText)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.searchList = res || [];
      });
  }

  // Filter functionality
  getFilteredData() {
    const temp ={
      Category : this.filters[0],
      Metal : this.filters[1],
      Gender : this.filters[2],
      Price : this.filters[3],
    }
    this.searchService.getFilteredData(this.filters).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    localStorage.removeItem('filters');
  }
}
