import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.css']
})
export class SecondaryNavComponent {
  categoryList: any;
  subscription!: Subscription;
  cartItemCount: any = 0;

  constructor(private productService: ProductService, private cartDataService: CartDataService) { }

  ngOnInit(): void {
    this.productService.viewAllCategory().subscribe((res: any) => {
      this.categoryList = res;
    })
    this.subscription = this.cartDataService.updatedCartItem.subscribe(totalCartItemCount => this.cartItemCount = totalCartItemCount);
    this.getTotalCartQuantity();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalCartQuantity() {
    this.cartDataService.getUserCartDetail().subscribe((data) => {
      this.cartDataService.getTotalCartQuantity(data.product_id_quantity).subscribe((data) => {
        this.cartItemCount = data;
      })
    })
  }
}
