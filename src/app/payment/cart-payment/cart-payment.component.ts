import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartDataService } from 'src/app/services/cart/cart-data.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.css']
})
export class CartPaymentComponent {
  userSessionId: any;
  currentOrderAddress: any;
  productsArrayForOrder: any;
  totalCartItem: any = 0;
  totalPrice: any;

  userCartData: any;
  updatedCartData: any;

  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private paymentService: PaymentService, private orderService: OrderService, private cartService: CartService, private cartDataService: CartDataService, private location: Location) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.currentOrderAddress = history.state.currentOrderAddress; // TODO: Later will pass only id

    // console.log("history.state.data", history.state.currentOrderAddress); //address id
    //it will check the address is available or not which you selected from previous step
    if(!this.currentOrderAddress){
      this.location.back();
    }

    this.paymentForm = this.fb.group({
      paymentMethod: ["upi"],
      upiId: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z._]{2,49}$/)]],
      transationRefNum: ["", Validators.required],
      paymentScreenshoot: ["", [Validators.required]],
    });

    this.cartDataService.getUserCartDetail().subscribe((data) => {
      this.userCartData = data;
      this.getCartProductDetails(this.userCartData.product_id_quantity);
    })

    // Create cart data with empty product for sending to backend
    this.updatedCartData = {
      // id: this.userCartData?.id,
      // user_id: this.userSessionId,
      product_id_quantity: []
    }
  }

  addPayment(){
    // console.log("Form validation", this.paymentForm.valid);
    if (this.paymentForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.paymentForm.value))
      return;
    }

    this.paymentService.createPayment(this.paymentForm.value).subscribe((data)=>{
      // console.log(data);
      // If payment success call he place order with cart product details, adress detais, payment details
      let newOrder = {
        orderId: 'SRI'+new Date().toString().slice(0,24).toUpperCase(),
        userId:this.userSessionId,
        paymentId: data.id,
        product: this.productsArrayForOrder,
        address: this.currentOrderAddress,
        orderDateTime: new Date(),
        totalItemNo: this.totalCartItem,
        // deliveryCharge: '',
        // promotionOrCouponAmount:'',
        // bankDiscount:'',
        // taxAmount:'',
        grandTotalAmount: this.totalPrice
      }

      this.orderService.createOrder(newOrder).subscribe((orderSuccessReturnData)=>{

        let trackinOrderStatus = {
          orderStatus:"placed",
          orderStatusDateTime : orderSuccessReturnData.orderDateTime,
          orderStatusNote: ""
        }
        let newOrderTracking = {
          orderId:orderSuccessReturnData.orderId,
          userId:orderSuccessReturnData.userId,
          orderUpdates: [trackinOrderStatus]
        }
        // Create order tracking with the above data 'newOrderTracking'
        this.orderService.createOrderTracking(newOrderTracking).subscribe((data)=>{
          // console.log("Order tracking created", data);
        })

        // Empty product in the cart for current user
        this.cartService.updateCartProductQuantity(this.userCartData.id, this.updatedCartData).subscribe((data: any)=>{
          this.cartDataService.updateCartItemCount(0);
        })

        this.router.navigate(["/order/confirmation/", orderSuccessReturnData.orderId])
      })

    })
  }

  // Get cart product details
  // Generate product summery with quantity
  getCartProductDetails(productIdQuantity:any){
    this.cartDataService.generateProductQueryString(productIdQuantity).subscribe((cratProductQueryParam)=>{
      this.cartService.viewCartProducts(cratProductQueryParam).subscribe((res)=>{

        this.productsArrayForOrder = res.map((product:any )=>({
          id: product.id,
          quantity: productIdQuantity.find((pIdQty:any)=>pIdQty.product_id == product.id).quantity,
          name: product.name,
          image: product.image,
          price: product.price
        }))

        // Calculate total quantity
        this.cartDataService.getTotalCartQuantity(productIdQuantity).subscribe((data) => {
          this.totalCartItem = data;
        })

        // Calculate total price
        this.totalPrice = this.productsArrayForOrder.map((element:any) => element.price*element.quantity).reduce((a:any, b:any) => a + b, 0);

      })
    })
  }

  // convenience getter for easy access to form fields "paymentForm.controls as pf"
  get pf() { return this.paymentForm.controls; }

}
