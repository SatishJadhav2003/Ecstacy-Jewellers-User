import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import {
  GalleryModule,
  GalleryItem,
  ImageItem,
  ImageSize,
  ThumbnailsPosition,
  Gallery,
} from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { imageUrl } from '../../../app.config';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [LightboxModule, GalleryModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnDestroy {
  @Input() images: any[] = [];
  @Input() focusIndex:number = 0;
  @Output() newItemEvent = new EventEmitter<string>();
  readonly gallery = inject(Gallery);
  readonly lightbox = inject(Lightbox);

  items: GalleryItem[] = [];
  lightboxRef: any;

  imageData = [];
  ngOnInit() {
    this.imageData = this.images;
    // Create gallery items
    this.items = this.imageData.map(
      (item) => new ImageItem({ src: this.getImage(item), thumb: item })
    );

    // Get a lightbox gallery ref
    this.lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    this.lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Bottom,
    });

    // Load items into the lightbox gallery ref
    this.lightboxRef.load(this.items);

    // Open the lightbox at the first item
    this.lightbox.open(this.focusIndex);
    // this.lightbox.open(this.focusIndex, 'lightbox', {panelClass: 'fullscreen'})
    
    // Listen to the close event of the lightbox
    this.lightbox.closed.subscribe(() => this.onClose());
  }

  getImage(path): string {
    return imageUrl + '/api/RatingReview/images/' + path;
  }

  onClose() {
    // Emit the event when the lightbox is closed
    this.newItemEvent.emit('false');
  }

  ngOnDestroy() {
    console.log('Destroyed');
  }
}
