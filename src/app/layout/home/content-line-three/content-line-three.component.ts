import { Component } from '@angular/core';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-content-line-three',
  templateUrl: './content-line-three.component.html',
  styleUrls: ['./content-line-three.component.css']
})
export class ContentLineThreeComponent {
  productList: any;

  constructor(private productService: ProductService, private cartData: CartDataService) { }

  ngOnInit(): void {
    // view product by caefory
    const categoryId = 4; // Category Book having id 4
    this.productService.viewAllProductByCategory(categoryId).subscribe((res:any)=>{
      this.productList = res;
    })
  }

  async addItemTocart(productId: any){
    this.cartData.addItemTocartData(productId);
  }
}
