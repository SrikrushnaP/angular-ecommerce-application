import { Component } from '@angular/core';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-content-line-four',
  templateUrl: './content-line-four.component.html',
  styleUrls: ['./content-line-four.component.css']
})
export class ContentLineFourComponent {
  productList: any;

  constructor(private productService: ProductService, private cartData: CartDataService) { }

  ngOnInit(): void {
    this.productService.viewAllProduct().subscribe((res:any)=>{
      this.productList = res;
    })
  }

  async addItemTocart(productId: any){
    this.cartData.addItemTocartData(productId);
  }
}
