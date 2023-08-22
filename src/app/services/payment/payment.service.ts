import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentBaseUrl = "http://localhost:3000/payments";

  constructor(private apiService: ApiService) { }

  createPayment(paymentDetails: any){
    return this.apiService.post(this.paymentBaseUrl, paymentDetails)
  }
}
