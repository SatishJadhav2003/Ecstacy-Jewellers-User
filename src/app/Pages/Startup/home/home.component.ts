import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SlidersComponent } from "../sliders/sliders.component";
import { CategorylistComponent } from "../categorylist/categorylist.component";
import { FeatureCategoryComponent } from "../feature-category/feature-category.component";
import { OurbenefitsComponent } from "../ourbenefits/ourbenefits.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SlidersComponent, CategorylistComponent, FeatureCategoryComponent, OurbenefitsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
