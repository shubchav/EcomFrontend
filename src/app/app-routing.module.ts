import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartCustomerComponent } from './Components/cart-customer/cart-customer.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { DashboardCustomerComponent } from './Components/dashboard-customer/dashboard-customer.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserOtpComponent } from './Components/user-otp/user-otp.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';

import { AuthguardAdminGuard } from './shared/authguard-admin.guard';
import  {AuthguardGuard} from './shared/authguard.guard'

const routes: Routes = [
  {path:'', component:UserRegistrationComponent},
  {path:'registration', component:UserRegistrationComponent},
  {path:'login', component:UserLoginComponent},
  {path: "conformLogin", component:UserOtpComponent},
  {path: "admin", component:DashboardAdminComponent, canActivate:[AuthguardAdminGuard]},
  {path: "customer", component:DashboardCustomerComponent, canActivate:[AuthguardGuard]},
  {path: "forgetPassword", component:ForgetpasswordComponent},
  {path: "customerCart", component:CartCustomerComponent,canActivate:[AuthguardGuard]},
  {path: "invoice", component:InvoicesComponent,canActivate:[AuthguardGuard]},
  {path: "orderHistory", component:OrderHistoryComponent,canActivate:[AuthguardGuard]},







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
