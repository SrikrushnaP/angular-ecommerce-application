import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewProductComponent },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'category/:categoryId', component: ProductsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
