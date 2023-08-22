import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  userSessionId: any;
  userDetails: any;
  roles = ['customer', 'admin', 'root'];

  userInfoForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userSessionId = sessionStorage.getItem("userSessionId");
    this.getAndSetUserInfo();
    this.userInfoForm = this.fb.group({
      fName: ["", Validators.required],
      lName: ["", Validators.required],
      email: [{ value: "", disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: "", disabled: true },Validators.required],
      dob: ["", [Validators.required]],
      role: [{ value: "", disabled: true },Validators.required],
      genRadios: [""],
      profileImage: [""],
      inputForImageLinkDisplay: [""],
      aboutUser: [""],
    });
  }

  getAndSetUserInfo(){
    this.userService.getUserDetails(this.userSessionId).subscribe((data)=>{
      // console.log("User data", data);
      this.userDetails = data;
      this.userInfoForm.patchValue({
        fName: this.userDetails.fName,
        lName: this.userDetails.lName,
        email: this.userDetails.email,
        phone: this.userDetails.mobile,
        dob: this.userDetails.dob,
        role: this.userDetails.role,
        genRadios: this.userDetails.gender,
        inputForImageLinkDisplay: this.userDetails.profileImg,
        aboutUser: this.userDetails.aboutUser,
      })
    })
  }

  updateUserInfo(){
    // console.log("userInfoForm", this.userInfoForm.value);
    let userInfoFormValue = this.userInfoForm.value;
    let editedUserData = {
        fName: userInfoFormValue.fName,
        lName: userInfoFormValue.lName,
        dob: userInfoFormValue.dob,
        gender: userInfoFormValue.genRadios,
        profileImg: userInfoFormValue.inputForImageLinkDisplay,
        aboutUser: userInfoFormValue.aboutUser
    }
    this.userService.updateUserBasicInfo(this.userSessionId, editedUserData).subscribe((data)=>{
      this.router.navigate(["/user/profile"]);
    })
  }

// convenience getter for easy access to form fields "userInfoForm.controls as pf"
get userInfoFormCtrl() { return this.userInfoForm.controls; }
}
