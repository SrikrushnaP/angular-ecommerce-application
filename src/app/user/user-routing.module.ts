import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { ListAddressesComponent } from './address/list-addresses/list-addresses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddUpdateAddressComponent } from './address/add-update-address/add-update-address.component';

const routes: Routes = [
  { path: "", redirectTo: "/user/profile", pathMatch: "full" },

  // User profile related routing
  { path: "profile", component: ViewProfileComponent },
  { path: "profile-update", component: UpdateProfileComponent },

  // User adreess related routing
  { path: "saved-address", component: ListAddressesComponent },
  { path: "add-address", component: AddUpdateAddressComponent },
  { path: "update-address/:addressId", component: AddUpdateAddressComponent },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
