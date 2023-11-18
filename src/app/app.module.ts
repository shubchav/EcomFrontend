import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './Components/user-registration/user-registration.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './Services/user.service';
import { UserOtpComponent } from './Components/user-otp/user-otp.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { DashboardCustomerComponent } from './Components/dashboard-customer/dashboard-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { CartCustomerComponent } from './Components/cart-customer/cart-customer.component';
import { CartService } from './Services/cart.service';
import { SalesService } from './Services/sales.service';
import { InvoicesComponent } from './Components/invoices/invoices.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserOtpComponent,
    DashboardAdminComponent,
    DashboardCustomerComponent,
    ForgetpasswordComponent,
    CartCustomerComponent,
    InvoicesComponent,
    OrderHistoryComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
     
  ],
  providers: [UserService,CartService,SalesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
