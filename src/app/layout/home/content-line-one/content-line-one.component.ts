import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-content-line-one',
  templateUrl: './content-line-one.component.html',
  styleUrls: ['./content-line-one.component.css']
})
export class ContentLineOneComponent implements OnInit{
  productList: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.viewAllProduct().subscribe((res:any)=>{
      this.productList = res;
    })
  }

}
