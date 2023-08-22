import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productList: any;
  productId: number = 0;
  categoryId: number = 0;

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute, private cartData: CartDataService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data => {

      this.categoryId = data['categoryId'];
    })
    if(this.categoryId){
      this.getAllProductsByCategory(this.categoryId);
    } else {
      this.getAllProducts();
    }
    // console.log("data", this.categoryId);
  }

  getAllProducts(){
    this.productService.viewAllProduct().subscribe((res:any)=>{
      this.productList = res;
    })
  }

  getAllProductsByCategory(categoryId: number){
    this.productService.viewAllProductByCategory(categoryId).subscribe((res:any)=>{
      this.productList = res;
    })
  }

  async addItemTocart(productId: any){
    this.cartData.addItemTocartData(productId);
  }

}
