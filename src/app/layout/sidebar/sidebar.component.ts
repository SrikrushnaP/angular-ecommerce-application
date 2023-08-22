import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  categoryList: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.viewAllCategory().subscribe((res:any)=>{
      this.categoryList = res;
    })
  }
}
