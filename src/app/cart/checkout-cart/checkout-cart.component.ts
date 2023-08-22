import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent {
  userSessionId: any;
  addressDetails:any;
  addressId: any;
  addressUserId: any;
  defaultAddress:any;
  addressType: string = "existing";
  addressForCurrentOrder: any;

  countries: string[] = ['India', 'USA', 'UK', 'Canada'];
  defaultCountry: string = 'India';

  states: string[] = ['Odisha', 'Karnataka', 'Delhi', 'Maharastra'];
  defaultStates: string = 'Odisha';

  editAddress: boolean = false;
  addAsNewAddress: boolean = false;

  addAddressForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.getAddress();
    this.addAddressForm = this.fb.group({
        fName: ["", Validators.required],
        lName: ["", Validators.required],
        line1: ["", Validators.required],
        line2: [""],
        country: ["", Validators.required],
        state: ["", Validators.required],
        postalCode: ["", [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      });
    this.addAddressForm.disable();
  }

  // Get user address
  getAddress(){
    this.userService.getUserAddress(this.userSessionId).subscribe((data: any)=>{
      this.addressDetails = data;
      // Default address
      // TODO: Impliment default/last-used address logic later
      this.defaultAddress = this.addressDetails[0];
      this.addressId = this.defaultAddress.id; // Used for updating the address
      this.addressUserId = this.defaultAddress.user_id; // Used for checking the same user updateing the address
      this.addAddressForm.patchValue({
        fName: this.defaultAddress.fName,
        lName: this.defaultAddress.lName,
        line1: this.defaultAddress.line1,
        line2: this.defaultAddress.line1,
        country: this.defaultAddress.country,
        state: this.defaultAddress.state,
        postalCode: this.defaultAddress.postalCode
      });
    })
  }

  addOrUpdateAddress(){
    let addressValue = this.addAddressForm.value;
    let userAddress = {
        user_id:this.userSessionId,
        fName: addressValue.fName,
        lName: addressValue.lName,
        line1: addressValue.line1,
        line2: addressValue.line2,
        country: addressValue.country,
        state: addressValue.state,
        postalCode: addressValue.postalCode,
        addressType: 'Home',
        default: false
    }
    if (this.addressType == "new") {
      this.addAddress(userAddress);
    } else if (this.addressType == "edit") {
      // Same user updating the address
      if(this.userSessionId == this.addressUserId){
        this.updateAddress(userAddress, this.addressId);
      }else{
        console.log("Something wrong");
      }
    } else if (this.addressType == "existing") {
      this.passSameAddress();
    } else {
      alert("Something wrong")
    }
  }

  // Add new address into user adress column
  addAddress(userAddress:any){
    this.userService.addUserAddress(userAddress).subscribe((data: any)=>{
      this.router.navigate(["payment/cart-payment"], {state:{currentOrderAddress: data}});
    });
  }

  // Update user address
  updateAddress(userAddress:any, addressId:any){
    this.userService.updateUserAddress(addressId, userAddress).subscribe((data)=>{
      this.router.navigate(["payment/cart-payment"], {state:{currentOrderAddress:data}});
    })
  }

  // Pass same user address
  passSameAddress(){
    // alert("Pass same address logic goes here");
    this.router.navigate(["payment/cart-payment"], {state:{currentOrderAddress:this.defaultAddress }});
  }

  updateAddressCheck(editAddressForm:any){
    if(editAddressForm.target.checked){
      this.getAddress();
      this.addAddressForm.enable();
      this.addAsNewAddress = true;
      this.addressType = "edit";
    } else {
      this.getAddress();
      this.addAddressForm.disable();
      this.addAsNewAddress = false;
      this.addressType = "existing";
    }
  }

  newAddressCheck(newAddressForm:any){
    if(newAddressForm.target.checked){
      this.addressType = "new";
    } else {
      this.addressType = "edit";
    }
  }

  // convenience getter for easy access to form fields "paymentForm.controls as addressFormCtrl"
  get addressFormCtrl() { return this.addAddressForm.controls; }
}
