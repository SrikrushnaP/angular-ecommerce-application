import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-update-address',
  templateUrl: './add-update-address.component.html',
  styleUrls: ['./add-update-address.component.css']
})
export class AddUpdateAddressComponent {
  userSessionId: any;
  addressDetails:any;
  addressId: any;
  addressUserId: any;
  defaultAddress:any;
  editOrAddAddress: string = "edit";
  formString: string = "Update";

  countries: string[] = ['India', 'USA', 'UK', 'Canada'];
  defaultCountry: string = 'India';

  states: string[] = ['Odisha', 'Karnataka', 'Delhi', 'Maharastra'];
  defaultStates: string = 'Odisha';

  addAddressForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.activeRoute.params.subscribe(data => {
      if(data['addressId']){
        this.addressId = data['addressId'];
        this.getAddressById();
      }else{
        this.editOrAddAddress = "new";
        this.formString = "Add";
      }

    })
    this.addAddressForm = this.fb.group({
        fName: ["", Validators.required],
        lName: ["", Validators.required],
        line1: ["", Validators.required],
        line2: ["", Validators.required],
        country: ["", Validators.required],
        state: ["", Validators.required],
        postalCode: ["", Validators.required],
      });
  }

  // Get user single address
  getAddressById(){
    this.userService.getUserAddressById(this.addressId).subscribe((data: any)=>{
      this.addressDetails = data;
      // Default address
      // TODO: Impliment default/last-used address logic later
      this.defaultAddress = this.addressDetails;
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
        default: true
    }
    if (this.editOrAddAddress == "new") {
      this.addAddress(userAddress);
    } else if (this.editOrAddAddress == "edit") {
      // Same user updating the address
      if(this.userSessionId == this.addressUserId){
        this.updateAddress(userAddress, this.addressId);
      }else{
        console.log("Something wrong");
      }
    } else {
      alert("Something wrong")
    }
  }

  // Add new address into user adress column
  addAddress(userAddress:any){


    this.userService.addUserAddress(userAddress).subscribe((data: any)=>{
      this.router.navigate(["/user/saved-address"], {state:{currentOrderAddress:data}});
    });
  }

  // Update user address
  updateAddress(userAddress:any, addressId:any){
    this.userService.updateUserAddress(addressId, userAddress).subscribe((data)=>{
      this.router.navigate(["/user/saved-address"], {state:{currentOrderAddress:data}});
    })
  }

  // convenience getter for easy access to form fields "addAddressForm.controls as addAddressForm"
  get addAddressFormCtrl() { return this.addAddressForm.controls; }

}
