import { Component, EventEmitter, Output, inject } from '@angular/core';
import { UtilService } from '../../Services/util.service';

@Component({
  selector: 'app-socialmedia',
  standalone: true,
  imports: [],
  templateUrl: './socialmedia.component.html',
  styleUrl: './socialmedia.component.css',
})
export class SocialmediaComponent {
  isModalOpen = false;
  @Output() closeShare = new EventEmitter<boolean>();
  util = inject(UtilService);

  onClose() {
    this.closeShare.emit(true);
  }
  shareOn(platform: string) {
    // Logic to share on the respective platform
    console.log(`Sharing on ${platform}`);
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    this.util.success('Link copied to clickboard');
    this.onClose();
  }

  shareOnSocialMedia(platform: string): void {
    const encodedUrl = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'x':
        shareUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=Check out this product!`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=Amazing product&summary=Check out this amazing product!`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=Check out this product: ${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }
}
