import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartBaseUrl = "http://localhost:3000/cart";
  private productBaseUrl = "http://localhost:3000/products";

  constructor(private apiService: ApiService) { }

  getUserCartData(user_id: any){
    return this.apiService.get(this.cartBaseUrl+'?user_id='+user_id);
  }

  updateCartProductQuantity(cart_id:any, updateCartData: any){
    return this.apiService.put(this.cartBaseUrl +"/"+ cart_id, updateCartData)
  }

  viewCartProducts(queryParam: any){
    return this.apiService.get(this.productBaseUrl+"?"+queryParam)
  }
}
