import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent {
  trackOrderData: any;
  orderId : any;
  trackingOrderId: any;

  deliveyDateMsg: string = "Estimated Delivery Time";
  deliveryDate: string = "7 days from order placed";
  trackingCourierName: string = "Availabe after Assigned";
  orderTrackingId: string = "Available after pickup";

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('order-id');
    this.getOrderTrackDetails();
  }

  getOrderTrackDetails(){
    this.orderService.getOrderTracking(this.orderId).subscribe((data)=>{
      this.trackOrderData = data[0];
      this.trackingOrderId = this.trackOrderData.id;
      // console.log("this.trackOrderData", this.trackOrderData);
      this.changeDeliveryMsgAndDate();
    })
  }

  changeDeliveryMsgAndDate(){
    this.trackOrderData.orderUpdates.forEach((ordSts: any)=>{
      // console.log("Foreach value", ordSts);
      if(ordSts.orderStatus=='accepted'){
        this.deliveyDateMsg = "Estimated Delivery Date";
        this.deliveryDate = new Date(ordSts.orderStatusDateTime).toDateString();
        // console.log("this.deliveryDate", new Date(this.deliveryDate).toDateString());//toDateString()
      } else if(ordSts.orderStatus=='delivered'){
        this.deliveyDateMsg = "Item Deleiverded on";
        this.deliveryDate = new Date(ordSts.orderStatusDateTime).toDateString();
      }
      if(ordSts.orderStatus=='assigned'){
        this.trackingCourierName = ordSts.trackingNote;
      }
      if(ordSts.orderStatus=='picked'){
        this.orderTrackingId = ordSts.trackingNote;
      }
    })
  }

  onUpdateOrderTracking(){
    alert("This features is for admin") //TODO: order update features
  }

}
