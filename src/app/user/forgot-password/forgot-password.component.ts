import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/services/auth/login-signup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordFormValue: any = {};
  userData: any;

  constructor(private router: Router, private authService: LoginSignupService) { }

  sendPassword(){
    this.authService.recoverPassword(this.forgotPasswordFormValue.email, this.forgotPasswordFormValue.mobile).subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData.length == 1) {
          // TODO: Send email
          alert("Email sent");
          this.router.navigateByUrl('/user/login');
        } else {
          alert("Please enter valid email and mobile number combination")
        }
      },
      error: (error: any) => {
        console.log("My error", error);
      }
    })
  }
}
