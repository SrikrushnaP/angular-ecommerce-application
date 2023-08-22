import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent {
  userSessionId: any;
  userAddress: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.getUserAllAddress();
  }

  getUserAllAddress(){
    this.userService.getUserAddress(this.userSessionId).subscribe((data)=>{
      this.userAddress = data;
    })
  }

  deleteUserAddress(addressId: any){
    if(confirm("Do you want to delete the address")){
      this.userService.deleteAddress(addressId).subscribe((res)=>{
        this.getUserAllAddress();
        alert("Address Deleted");
        this.router.navigate(["/user/saved-address"]);
      })
    } else {
      alert("Delete operation cancelled");
    }
  }

  defaultAddress(){
    alert("TODO: Will do in later stage");
  }
}
