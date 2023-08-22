import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  userSessionId: any;
  userCart: any;
  cartId: any;
  totalCartItem: any = 0;
  totalCartItemCount: any = 0;

  productQueryString: any = '';
  cartProductCount: number =0;
  cartProductList: any = [];

  private cartItemCount = new BehaviorSubject(0);
  updatedCartItem = this.cartItemCount.asObservable();

  constructor(private cartService: CartService, private router: Router) {
    this.userSessionId = sessionStorage.getItem("userSessionId");
  }

  // Return user cart details
  // which contains product id and quantiy
  getUserCartDetail(): Observable<any> {
    const userCartData = new Observable((observer) => {
      this.cartService.getUserCartData(this.userSessionId).subscribe((data) => {
        observer.next(data[0]);
      })
    })
    return userCartData;
  }

  addItemTocartData(productId: number) {
    this.getUserCartDetail().subscribe((data) => {
      this.userCart = data;
      this.cartId = data.id;
      // Check the product is alarya available in cart or not
      const productExist = this.userCart.product_id_quantity.some((el: any) => {
        return el.product_id === Number(productId);
      })
      // Add current clicked item to cart if it not exist in the cart
      if (!productExist) {
        this.userCart.product_id_quantity.push({ product_id: Number(productId), quantity: 1 })
        this.cartService.updateCartProductQuantity(this.cartId, this.userCart).subscribe((data) => {
          // Call  getTotalCartQuantity which return a observable
          this.getTotalCartQuantity(this.userCart.product_id_quantity).subscribe((data) => {
            this.totalCartItemCount = data;
            this.updateCartItemCount(this.totalCartItemCount);
          })
        })
      } else {
        if (confirm("Product is already exist in the cart. If you want more quntity you can review your cart change the quantity of one or more item from cart page. \n \n \n Do you want to change the quantity from cart page ?")) {
          this.router.navigate(["/cart"]);
        }
      }
    })
  }

  // http://localhost:3000/products?id=1&id=2
  generateProductQueryString(productIdQuantity: any): Observable<any>{
    productIdQuantity.forEach((element:any, index: number, array: any) => {
      this.productQueryString += "id="+element.product_id+"&";
      this.cartProductCount++;
    });
    const productQryStrng = new Observable((observer) => {
      observer.next(this.productQueryString);
    })
    return productQryStrng;
  }

  // Retun cart product details
  // Will take array of product id and quantity
  getCartProductDetails(productIdQueryParam: string){
    this.cartService.viewCartProducts(productIdQueryParam).subscribe((res)=>{
      this.cartProductList = res;
    })
  }

  // Return total number of quantity in the cart
  getTotalCartQuantity(productIdAndQuantity: any): Observable<any> {
    this.totalCartItem = productIdAndQuantity?.map((element: any) => element.quantity).reduce((a: any, b: any) => a + b, 0);
    const totalCartItemNo = new Observable((observer) => {
      observer.next(this.totalCartItem);
    })
    return totalCartItemNo;
  }

  updateCartItemCount(cartItems: number) {
    this.cartItemCount.next(cartItems);
  }
}
