import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderBaseUrl = "http://localhost:3000/orders";
  private orderTrackingBaseUrl = "http://localhost:3000/track-order";

  constructor(private apiService: ApiService) { }

  createOrder(orderDetails: any){
    return this.apiService.post(this.orderBaseUrl, orderDetails)
  }

  getUserOrderDetails(orderId:any){
    return this.apiService.get(this.orderBaseUrl+'?orderId='+orderId);
  }

  getUserAllOrder(userId:any){
    return this.apiService.get(this.orderBaseUrl+'?userId='+userId);
  }

  createOrderTracking(orderTrackingDetails: any){
    return this.apiService.post(this.orderTrackingBaseUrl, orderTrackingDetails)
  }

  getOrderTracking(orderId:any){
    return this.apiService.get(this.orderTrackingBaseUrl+'?orderId='+orderId);
  }
}
