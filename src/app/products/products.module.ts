import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { LayoutModule } from '../layout/layout.module';
import { ProductsListComponent } from './products-list/products-list.component';


@NgModule({
  declarations: [
    ViewProductComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    LayoutModule
  ],
  exports: [
    ViewProductComponent
  ]
})
export class ProductsModule { }
