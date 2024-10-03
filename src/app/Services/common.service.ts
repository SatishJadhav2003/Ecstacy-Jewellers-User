import { Injectable, signal, WritableSignal } from '@angular/core';
import { Category } from '../Shared/Category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  Categories: WritableSignal<Category[]> = signal([]);
  constructor() { }


  getCategories(): Observable<Category[]> {
    // const temp: Category[] = [
    //   {
    //     Category_ID: 1,
    //     Category_Name:'All Jewellery',
    //     SubCategories :[
    //       {
    //         Sub_Cate_ID: 2,
    //         Sub_Cate_Name: 'Earrings',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 3,
    //         Sub_Cate_Name: 'Pendants',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 4,
    //         Sub_Cate_Name: 'Finger Rings',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 5,
    //         Sub_Cate_Name: 'Mangalsutra',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 6,
    //         Sub_Cate_Name: 'Chains',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 7,
    //         Sub_Cate_Name: 'Nose Pin',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 8,
    //         Sub_Cate_Name: 'Necklaces',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 9,
    //         Sub_Cate_Name: 'Bangles',
    //         Sub_Cate_Image: ''
    //       },{
    //         Sub_Cate_ID: 10,
    //         Sub_Cate_Name: 'Gold Coins',
    //         Sub_Cate_Image: ''
    //       },
    //     ]
    //   },
    //   {
    //     Category_ID: 2,
    //     Category_Name:'Metal',
    //     SubCategories :[
    //       {
    //         Sub_Cate_ID: 11,
    //         Sub_Cate_Name: 'Gold',
    //         Sub_Cate_Image: ''
    //       }
    //     ]
    //   },
    //   {
    //     Category_ID: 3,
    //     Category_Name:'Gender',
    //     SubCategories :[
    //       {
    //         Sub_Cate_ID: 12,
    //         Sub_Cate_Name: 'Male',
    //         Sub_Cate_Image: ''
    //       }, {
    //         Sub_Cate_ID: 13,
    //         Sub_Cate_Name: 'Female',
    //         Sub_Cate_Image: ''
    //       }, {
    //         Sub_Cate_ID: 14,
    //         Sub_Cate_Name: 'Kids & Teenager',
    //         Sub_Cate_Image: ''
    //       }
    //     ]
    //   }
    // ]

    const temp:Category[] = [
      {
        Category_ID: 0,
        Category_Name: 'Necklace',
        Category_Image:'images/category/neclace.png'
      },
      {
        Category_ID:1,
        Category_Name:'Rings',
        Category_Image:'images/category/rings.jpg'
      },
      {
        Category_ID:1,
        Category_Name:'Nose Rings',
        Category_Image:'images/category/nosering.webp'
      },

      {
        Category_ID:1,
        Category_Name:'Bracelet',
        Category_Image:'images/category/braclet.png'
      },
    ]
    return of(temp);
  }
}
