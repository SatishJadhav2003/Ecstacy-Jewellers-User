import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../../Shared/Models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product_Images } from '../../../Shared/Models/ProductImages';
import { UtilService } from '../../../Services/util.service';
import { Cart } from '../../../Shared/Models/Cart';
import { CommonService } from '../../../Services/common.service';
import { Wishlist, WishlistOutput } from '../../../Shared/Models/Wishlist';
import { SocialmediaComponent } from '../../../Components/socialmedia/socialmedia.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, SocialmediaComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  imagesList: Product_Images[] = [];
  currentImage: number = 0;
  inCart: boolean = false;
  inWishlist: boolean = false;
  product: Product[] = [];
  ProdID!: any;
  reviewsImgList: any[] = [];
  isShareOpen: boolean = false;

  route = inject(ActivatedRoute);
  router = inject(Router);
  readonly productService = inject(ProductService);
  readonly common = inject(CommonService);
  readonly util = inject(UtilService);

  ngOnInit() {
    window.scrollTo(0, 0);
    this.ProdID = this.route.snapshot.paramMap.get('ProdID');
    console.log(this.ProdID);

    // Check wheather product is present in cart or not
    this.inCart = this.common.IsInCart(this.ProdID);

    // Check wheather product is present in Wishlist or not
    this.inWishlist = this.common.IsInWishlist(this.ProdID);

    this.productService.getProduct(this.ProdID).subscribe((data) => {
      this.product = data;
    });
    this.productService.getProductImages(this.ProdID).subscribe((data) => {
      this.imagesList = data;
    });
  }

  addToCart() {
    if (this.inCart) {
      this.router.navigate(['user/cart']);
    } else {
      const cartData: Cart = {
        Cart_ID: 0,
        Product_ID: this.ProdID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
        Quantity: 1,
      };

      this.productService.addToCart(cartData).subscribe((data) => {
        if (data) {
          this.util.success(this.product[0].Product_Name + ' Added To Cart');
          this.inCart = true;
          this.productService.getUserCartItems().subscribe((res) => {
            if (res) {
              localStorage.setItem('CartItems', JSON.stringify(res));
            }
          });
        }
      });
    }
  }

  wishlistChange() {
    // Get current wishlist items
    let WishlistItems: WishlistOutput[] =
      JSON.parse(localStorage.getItem('WishlistItems')) || [];
    debugger;
    if (this.inWishlist) {
      const Wishlist_ID = WishlistItems.find(
        (w) => w.Product_ID == this.product[0].Product_ID
      ).Wishlist_ID;
      this.productService.removeFromWishlist(Wishlist_ID).subscribe((res) => {
        if (res) {
          this.util.success(
            this.product[0].Product_Name + ' removed from wishlist'
          );
          this.inWishlist = false;
          // remove item from wishlist and update localstorage list
          WishlistItems = WishlistItems.filter(
            (w) => w.Wishlist_ID != Wishlist_ID
          );
          localStorage.setItem('WishlistItems', JSON.stringify(WishlistItems));
        }
      });
    } else {
      let WishlistData: Wishlist = {
        Wishlist_ID: 0,
        Product_ID: this.product[0].Product_ID,
        User_ID: parseInt(localStorage.getItem('User_ID')),
      };
      this.productService.addToWishlist(WishlistData).subscribe((res) => {
        if (res) {
          this.util.success(
            this.product[0].Product_Name + ' added to wishlist'
          );
          this.inWishlist = true;
          // add item in wishlist and update localstorage list
          const newWishlist: WishlistOutput = {
            Wishlist_ID: res,
            Product_ID: this.product[0].Product_ID,
            User_ID: 0,
            Price: this.product[0].Price,
            Product_Name: this.product[0].Product_Name,
            Description: this.product[0].Description,
            Product_Image: this.imagesList[0].Image_URL,
          };
          WishlistItems.push(newWishlist);
          localStorage.setItem('WishlistItems', JSON.stringify(WishlistItems));
        }
      });
    }
  }

  // Sharing start
  onShare() {
    this.isShareOpen = !this.isShareOpen;
  }

  buyNow() {
    this.router.navigate(['/checkout'], {
      queryParams: { fromCart: 0, Product_ID: this.product[0].Product_ID },
    });
  }
}
