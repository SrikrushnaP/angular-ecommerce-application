import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
  orderDeialsPage:boolean = true;
  currentOrderData: any;
  orderId : any;
  timeNow = new Date();

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('order-id');

    this.orderService.getUserOrderDetails(this.orderId).subscribe((res)=>{
      this.currentOrderData = res[0];
    })

    if(this.activatedRoute.snapshot.url[0].path == "confirmation"){
      this.orderDeialsPage = false;
    }
  }
}
