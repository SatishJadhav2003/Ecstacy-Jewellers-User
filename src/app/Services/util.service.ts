import { inject, Injectable, signal, Signal } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  Title = signal("Jeweller's King");
  titleServices = inject(Title)

  changeTitle(newTitle: string) {
    this.Title.set(newTitle);
    this.titleServices.setTitle(this.Title());
  }
}
