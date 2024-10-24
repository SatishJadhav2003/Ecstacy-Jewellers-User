import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../Products/product.service';

@Component({
  selector: 'app-orderconfirm',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './orderconfirm.component.html',
  styleUrl: './orderconfirm.component.css',
})
export class OrderconfirmComponent {
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getUserCartItems().subscribe((res) => {
      localStorage.setItem('CartItems', JSON.stringify(res));
    });
  }
}
