import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  imagesList: string[] = [
    'images/category/braclet.png',
    'images/category/neclace.png',
    'images/category/nosering.webp',
    'images/category/Rings.jpg',
  ];

  currentImage:number=0;
  inCart:boolean=false
}
