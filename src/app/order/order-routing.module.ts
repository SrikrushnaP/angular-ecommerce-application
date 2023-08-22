import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { TrackOrderComponent } from './track-order/track-order.component';

const routes: Routes = [
  { path: "", redirectTo: "/order/list", pathMatch: "full" },
  { path: "list", component: OrdersListComponent },
  { path: "confirmation/:order-id", component: OrderSummaryComponent },
  { path: "details/:order-id", component: OrderSummaryComponent },
  { path: "track/:order-id", component: TrackOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
