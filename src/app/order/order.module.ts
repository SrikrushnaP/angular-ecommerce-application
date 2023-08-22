import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { TrackOrderComponent } from './track-order/track-order.component';


@NgModule({
  declarations: [
    OrderSummaryComponent,
    OrdersListComponent,
    TrackOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
