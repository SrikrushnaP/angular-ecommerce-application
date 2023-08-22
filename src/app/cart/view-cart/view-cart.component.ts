import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent {
  subscription!: Subscription;
  cartItemCount: any = 0;
  cartProductList: any = [];
  cartData: any;
  totalPrice: any = 0;

  productsQuantityTobeUpdated: any;
  updatedCartData : any;
  cartProductTobeRemove: any;

  constructor(private cartDataService: CartDataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartDataService.updatedCartItem.subscribe(totalCartItemCount => this.cartItemCount = totalCartItemCount);
    this.cartDataService.getUserCartDetail().subscribe((data) => {
      this.cartData = data;
      if(this.cartData.product_id_quantity.length){
        this.getProductDetailsWithPrice(data.product_id_quantity);
      }
    })
  }

  getProductDetailsWithPrice(productIdQuantity: any){
    this.cartDataService.generateProductQueryString(productIdQuantity).subscribe((cratProductQueryParam)=>{
      this.cartService.viewCartProducts(cratProductQueryParam).subscribe((res)=>{
        this.cartProductList = res;
        this.totalPriceAndQuantity(productIdQuantity, res)
      })
    })
  }

  totalPriceAndQuantity(productIdAndQuantity:any, productListWithPrice:any){
    // Calculate total quantity
    this.cartDataService.getTotalCartQuantity(productIdAndQuantity).subscribe((data) => {
      this.cartItemCount = data;
      this.cartDataService.updateCartItemCount(this.cartItemCount);
    })
    // Calculate total price
    this.totalPrice = productListWithPrice.map((element:any, i:any) => element.price*productIdAndQuantity[i].quantity).reduce((a:any, b:any) => a + b, 0);
  }

  changeCartProductQuantity(cartProductIndex: any, event:any){
    this.productsQuantityTobeUpdated = this.cartData.product_id_quantity;
    this.productsQuantityTobeUpdated[cartProductIndex].quantity = parseInt(event.target.value);

    // Later change to ui validation
    if(this.productsQuantityTobeUpdated[cartProductIndex].quantity<1){
      alert("product quantity should be 1 or more");
      return;
    }
    this.updatedCartData = {
      id: this.cartData.id,
      user_id: this.cartData.user_id,
      product_id_quantity: this.productsQuantityTobeUpdated
    }

    this.cartService.updateCartProductQuantity(this.cartData.id, this.updatedCartData).subscribe((data)=>{
      // console.log("cart updated", data);
    this.totalPriceAndQuantity(this.productsQuantityTobeUpdated, this.cartProductList);
    })
  }

  removeProductFromCart(cartProductIndex: any, productId:any){
    // find index of product in the db which is to be deleted
    const deleteProductIndex = this.cartData.product_id_quantity.findIndex((x:any)=>x.product_id == productId);

    this.cartProductTobeRemove = [...this.cartData.product_id_quantity]
    this.cartProductTobeRemove.splice(deleteProductIndex, 1);

    // Create cart data for sending to backend
    this.updatedCartData = {
      id: this.cartData.id,
      user_id: this.cartData.user_id,
      product_id_quantity: this.cartProductTobeRemove
    }
    this.cartService.updateCartProductQuantity(this.cartData.id, this.updatedCartData).subscribe((data)=>{
      // After update in db change in frontend without calling backend API
      this.cartProductList.splice(cartProductIndex, 1);
      this.totalPriceAndQuantity(this.cartProductTobeRemove, this.cartProductList);
      this.cartData.product_id_quantity = this.cartProductTobeRemove;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
