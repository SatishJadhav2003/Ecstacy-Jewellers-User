import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../Shared/Models/Category';
import { Banner } from './sliders/banner.model';
import { ApiRequestService } from '../../Services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  apiRequest = inject(ApiRequestService)
  Categories: WritableSignal<Category[]> = signal([]);
  constructor() { }


  getBannerList(): Observable<Banner[]> {
    return this.apiRequest.get('api/banner');
  }

  getCategories(): Observable<Category[]> {
    return this.apiRequest.get('api/category');
  }

  getFeatureCategory(): Observable<Category> {
    const response: Category = {
      Category_ID: 0,
      Category_Name: 'Gold Coin',
      Category_Image: '',
      SubCategories: [
        {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Buiscute',
          Sub_Cate_Image: 'images/subcategories/buiscut.jpg'
        }, {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Bullion Coins',
          Sub_Cate_Image: 'images/subcategories/bullion.png'
        }, {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Bullion Coins',
          Sub_Cate_Image: 'images/subcategories/img2.jpg'
        }, {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Bullion Coins',
          Sub_Cate_Image: 'images/subcategories/buiscut.jpg'
        }, {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Bullion Coins',
          Sub_Cate_Image: 'images/subcategories/bullion.png'
        }, {
          Sub_Cate_ID: 1,
          Sub_Cate_Name: 'Bullion Coins',
          Sub_Cate_Image: 'images/subcategories/img2.jpg'
        },
      ]
    }
    return of(response);
  }
}
