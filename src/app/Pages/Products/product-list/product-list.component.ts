import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
productList:any[]=[1,2,3,4,5,6,7,8];

route = inject(ActivatedRoute);
cateID!:any;
ngOnInit()
{
  this.cateID = this.route.snapshot.paramMap.get("CateID");
  console.log(this.cateID)

}
}
