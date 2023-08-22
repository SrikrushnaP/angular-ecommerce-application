import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/services/auth/login-signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpFormValue: any = {};
  user_data: any;

  constructor(private router: Router, private logsignService: LoginSignupService) { }

  onSubmitSignUp(){
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpFormValue));
    this.logsignService.userRegister(this.signUpFormValue).subscribe((data)=>{
      console.log(data);
      this.router.navigate(["/user/login"]);
    })
  }

}
