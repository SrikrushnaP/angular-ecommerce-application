import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private addressBaseUrl = "http://localhost:3000/address";
  private userDetailsBaseUrl = "http://localhost:3000/users";

  constructor(private apiService: ApiService) { }

  getUserAddress(user_id: any){
    return this.apiService.get(this.addressBaseUrl+'?user_id='+user_id);
  }

  getUserDetails(user_id: any){
    return this.apiService.get(this.userDetailsBaseUrl+'/'+user_id);
  }

  updateUserBasicInfo(user_id: any, editedUserData:any){
    return this.apiService.patch(this.userDetailsBaseUrl +"/" + user_id , editedUserData)
  }

  updateUserAddress(address_id:any, addressDetail:any){
    return this.apiService.patch(this.addressBaseUrl +"/" + address_id , addressDetail)
  }

  addUserAddress(addressDetail:any){
    return this.apiService.post(this.addressBaseUrl, addressDetail)
  }

  deleteAddress(address_id:any){
    return this.apiService.delete(this.addressBaseUrl+"/"+address_id)
  }

  getUserAddressById(address_id:any){
    return this.apiService.get(this.addressBaseUrl+'/'+address_id);
  }
}
