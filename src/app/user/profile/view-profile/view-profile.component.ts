import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  userSessionId: any;
  userDetails: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.userService.getUserDetails(this.userSessionId).subscribe((data)=>{
      // console.log("User data", data);
      this.userDetails = data;
    })
  }
}
