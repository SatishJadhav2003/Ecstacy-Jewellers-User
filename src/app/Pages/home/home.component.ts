import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SlidersComponent } from "../sliders/sliders.component";
import { CategorylistComponent } from "../categorylist/categorylist.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, SlidersComponent, CategorylistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
