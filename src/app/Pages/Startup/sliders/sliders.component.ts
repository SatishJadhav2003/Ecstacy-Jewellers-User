import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from './banner.model';
import { StartupService } from '../startup.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './sliders.component.html',
  styleUrl: './sliders.component.css'
})
export class SlidersComponent {
  startupService = inject(StartupService);
  banner: Banner[] = [];

  index: number = 0;
  constructor() {
    this.getBanners();
    this.changeSlides();
  }

  getBanners() {    
    this.startupService.getBannerList().subscribe((data) => {
      if (data?.length > 0) {
        console.log(data);
        this.banner = data;
      }
    })
  }

  changeSlides() {
    setInterval(() => {
      this.index++;
      if (this.index >= this.banner.length) {
        this.index = 0;
      }
    }, 2000);
  }

  getImage(): string {
    return this.banner[this.index]?.Banner_Image;
  }

  limit: number = 10; // <==== Edit this number to limit API results
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: false,
    autoWidth: true,
    fluidSpeed:true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      }
    }
  }


}
