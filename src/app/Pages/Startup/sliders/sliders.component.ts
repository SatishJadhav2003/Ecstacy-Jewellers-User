import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from './banner.model';
import { StartupService } from '../startup.service';

@Component({
  selector: 'app-sliders',
  standalone: true,
  imports: [CommonModule],
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



}
