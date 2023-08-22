import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule { }
