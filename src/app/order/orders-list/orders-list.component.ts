import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent {
  orderList: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const userSessionId = sessionStorage.getItem("userSessionId");

    this.orderService.getUserAllOrder(userSessionId).subscribe((res)=>{
      this.orderList = res;
    })
  }
}
