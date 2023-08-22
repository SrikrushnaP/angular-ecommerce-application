import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-content-line-two',
  templateUrl: './content-line-two.component.html',
  styleUrls: ['./content-line-two.component.css']
})
export class ContentLineTwoComponent implements OnInit{
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
