import { Component, inject } from '@angular/core';
import { UtilService } from '../../../Services/util.service';
import { MnDropdownComponent } from '../../../Components/dropdown';
import { Category } from '../../../Shared/Models/Category';
import { CommonModule } from '@angular/common';
import { StartupService } from '../startup.service';
import { AuthService } from '../../../Authentication/auth.service';
import { LoginComponent } from '../../../Authentication/login/login.component';
import { RegisterComponent } from '../../../Authentication/register/register.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../Services/search.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // Other
  searchTitles: string[] = [
    'Rings',
    'Bracelets',
    'Couple Rings',
    'Coins',
    'Necklace',
    'Bangles',
    'Any Jewellery',
  ];
  currentIndex: number = 0;
  currentTitle: string = this.searchTitles[this.currentIndex];
  searchText: string = '';
  isMenuOpen:boolean =false
  // Import Services
  auth = inject(AuthService);
  util = inject(UtilService);
  startupService = inject(StartupService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  searchService = inject(SearchService);
  constructor() {
    this.auth.IsLoggedIn();
    this.rotateSearchPlaceholder();
    this.util.changeTitle("Jeweller's King - Home");
    this.getCategories();
    this.searchService.searchQuery.subscribe((res) => {
      this.searchText = res;
    });
  }

  rotateSearchPlaceholder() {
    setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex >= this.searchTitles.length) {
        this.currentIndex = 0; // Reset to 0 when reaching the end of array
      }
      this.currentTitle = this.searchTitles[this.currentIndex];
    }, 500); // 2000ms (2 seconds) interval
  }

  // *************************************************Product section start********************************************************//
  Categories: Category[] = [];
  totalCategories: number = 0;
  getCategories() {
    this.startupService.getCategories().subscribe(
      (data) => {
        if (data) {
          this.Categories = data;
          this.totalCategories = this.Categories.length;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // *************************************************Product section end********************************************************//
  // *************************************************Account section Start********************************************************//
  onAccount() {
    if (this.auth.loggedIn()) {
      this.navigateTo('user/profile')
    } else {
      this.auth.LoginModalOpen.set(true);
    this.auth.RegistrationModalOpen.set(false);
    }
  }
  // *************************************************Other section end********************************************************//

  ngOnDestoy() {}

  openModal() {
    
  }

  navigateTo(path) {
    this.isMenuOpen =false;
    this.router.navigate([path]);
  }
  onSearch() {
    this.searchService.searchQuery.next(this.searchText);
    this.router.navigate(['/search'], {
      queryParams: { text: this.searchText },
    });
  }

  onFilter() {
    console.log(this.router.url);
    console.log(this.route.snapshot.params);

    this.router.navigate(['/filter'], { relativeTo: this.route });
  }

  logOut()
  {
    this.auth.logOut();
  }
}
