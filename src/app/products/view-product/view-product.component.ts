import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  productId = 0;
  productDetails: any;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router, private cartData: CartDataService ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data => {
      this.productId = data['id'];
      this.getProductDetailsById(this.productId);
    })
  }

  getProductDetailsById(productId: number){
    this.productService.viewProduct(productId).subscribe((res)=>{
      this.productDetails=res;
    })
  }

  async addItemTocart(productId: any){
    this.cartData.addItemTocartData(productId);
  }

}
