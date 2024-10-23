import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone:true
})
export class DropdownDirective {
  @Input() dropdownTop: string = 'auto';
  @Input() dropdownLeft: string = 'auto';
  @Input() dropdownRight: string = 'auto';
  @Input() dropdownBottom: string = 'auto';
  private isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
    const dropdownContent = this.el.nativeElement.querySelector('.dropdown-content');
    if (this.isOpen) {
      this.renderer.setStyle(dropdownContent, 'display', 'block');
      this.renderer.setStyle(dropdownContent, 'position', 'absolute');
      this.renderer.setStyle(dropdownContent, 'top', this.dropdownTop);
      this.renderer.setStyle(dropdownContent, 'left', this.dropdownLeft);
      this.renderer.setStyle(dropdownContent, 'right', this.dropdownRight);
      this.renderer.setStyle(dropdownContent, 'bottom', this.dropdownBottom);
    } else {
      this.renderer.setStyle(dropdownContent, 'display', 'none');
    }
  }

  @HostListener('document:click', ['$event.target']) closeDropdown(targetElement: HTMLElement) {
    const clickedInside = this.el.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isOpen = false;
      const dropdownContent = this.el.nativeElement.querySelector('.dropdown-content');
      this.renderer.setStyle(dropdownContent, 'display', 'none');
    }
  }
}
