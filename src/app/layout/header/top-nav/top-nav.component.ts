import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  loggedIn: Boolean = false;
  userFname: any;

  ngOnInit(): void {}

  ngDoCheck() {
    const userSessionId = sessionStorage.getItem("userSessionId");
    this.userFname = sessionStorage.getItem("userFname")
    if (userSessionId) {
      this.loggedIn = true;
    }
  }

  logOut() {
    sessionStorage.removeItem("userSessionId");
    // this.router.navigateByUrl('/users/login');
    location.reload()
  }
}
