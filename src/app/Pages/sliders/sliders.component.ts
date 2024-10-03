import { Component, signal, WritableSignal } from '@angular/core';
import { Slides } from './slides.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.css'
})
export class SlidersComponent {
  slides: Slides[] = [
    { Slide_ID: 1, Slide_Image: 'images/slides/slide1.png' },
    { Slide_ID: 2, Slide_Image: 'images/slides/slide2.png' },
    { Slide_ID: 3, Slide_Image: 'images/slides/slide3.png' },
    { Slide_ID: 4, Slide_Image: 'images/slides/slide4.png' },
  ];
  
  index: number = 0;
  constructor() {
    this.changeSlides();
  }
  
  changeSlides() {
    setInterval(() => {
      this.index++;
      if (this.index >= this.slides.length) {
        this.index = 0;
      }
    }, 2000);
  }

  getImage(): string {
    return this.slides[this.index].Slide_Image;
  }
  
}
