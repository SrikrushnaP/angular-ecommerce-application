import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewCartComponent,
    CheckoutCartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ViewCartComponent,
    CheckoutCartComponent
  ]
})
export class CartModule { }
