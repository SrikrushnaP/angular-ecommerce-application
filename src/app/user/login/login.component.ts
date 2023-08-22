import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/services/auth/login-signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signInFormValue: any = {};
  user_data: any;

  constructor(private router: Router, private authService: LoginSignupService) { }

  onSubmitSignIn() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInFormValue));
    this.authService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe({
      next: (data) => {
        this.user_data = data;
        if (this.user_data.length == 1) {
          // TODO: JWT auth implimentation
          sessionStorage.setItem("userSessionId", this.user_data[0].id);
          sessionStorage.setItem("userFname", this.user_data[0].fName);
          this.router.navigateByUrl('/home');
        } else {
          alert("Invalid")
        }
      },
      error: (error: any) => {
        console.log("My error", error);
      }
    })
  }

}
