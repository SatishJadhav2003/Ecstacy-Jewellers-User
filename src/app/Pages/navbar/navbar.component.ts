import { Component, inject } from '@angular/core';
import { UtilService } from '../../Services/util.service';
import { CommonService } from '../../Services/common.service';
import { MnDropdownComponent } from '../../Commponents/dropdown';
import { Category } from '../../Shared/Category';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MnDropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTitles: string[] = ['Rings', 'Bracelets', 'Couple Rings', 'Coins', "Necklace", "Bangles", "Any Jewellery"]
  currentIndex: number = 0;
  currentTitle: string = this.searchTitles[this.currentIndex];

  // Import Services
  util = inject(UtilService)
  common = inject(CommonService);
  constructor() {
    this.rotateSearchPlaceholder();
    this.util.changeTitle("Jeweller's King - Home");
    this.getCategories();
  }

  rotateSearchPlaceholder() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.searchTitles.length) {
        this.currentIndex = 0;  // Reset to 0 when reaching the end of array
      }
      this.currentTitle = this.searchTitles[this.currentIndex];
    }, 500); // 2000ms (2 seconds) interval
  }

  // *************************************************Product section start********************************************************//
  Categories: Category[] = [];
  totalCategories:number = 0;
  getCategories() {
    this.common.getCategories().subscribe((data) => {
      if (data) {
        // this.Categories = data;
        // this.totalCategories = this.Categories.length;
      }
    },err=>{
      console.log(err);
    })
  }
  // *************************************************Product section end********************************************************//

  ngOnDestoy()
  {
    
  }
}
