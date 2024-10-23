import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Pages/Startup/navbar/navbar.component';
import { FooterComponent } from './Pages/Startup/footer/footer.component';
import { ProductService } from './Pages/Products/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Jewellery-User-App';

  readonly productService = inject(ProductService);
  ngOnInit() {
    this.productService.getUserCartItems().subscribe((data) => {
      localStorage.setItem('CartItems', JSON.stringify(data));
    });
    this.productService.getUserWishlistItems().subscribe((data) => {
      localStorage.setItem('WishlistItems', JSON.stringify(data));
    });
  }
}
