import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';

const routes: Routes = [
  { path: "", redirectTo: "/cart/view", pathMatch: "full" },
  { path: "view", component: ViewCartComponent },
  { path: "checkout", component: CheckoutCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
