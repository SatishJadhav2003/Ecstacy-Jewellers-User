import { Component, inject } from '@angular/core';
import { CommonService } from '../../Services/common.service';
import { Category } from '../../Shared/Category';

@Component({
  selector: 'app-categorylist',
  standalone: true,
  imports: [],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent {
  commonService = inject(CommonService);
  categoryList: Category[] = [];
  ngOnInit() {
    this.commonService.getCategories().subscribe((data) => {
      console.log(data);
      this.categoryList = data;
    })
  }
}
