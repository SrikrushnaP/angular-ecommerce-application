import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productBaseUrl = "http://localhost:3000/products"
  private categoryBaseUrl = "http://localhost:3000/categories"

  constructor(private httpClient: HttpClient) {

  }

  viewAllProduct(){
    return this.httpClient.get<any>(this.productBaseUrl);
  }

  viewAllProductByCategory(categoryId:any){
    return this.httpClient.get<any>(this.productBaseUrl+"?categoryId="+categoryId);
  }

  viewProduct(productId: any){
    return this.httpClient.get(this.productBaseUrl+"/"+productId)
  }

  viewAllCategory(){
    return this.httpClient.get<any>(this.categoryBaseUrl);
  }

}
