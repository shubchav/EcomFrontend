import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

//import swal from 'sweetalert';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  // login data property
  loginData: any;
  // token data property
  tokenData: any;

// otp variables
OtpData:any;
otp: any;
  fogetemail:any;
  constructor(private userService: UserService , private router: Router , private cartService: CartService) { }

  ngOnInit(): void {
    this.function()
  }



  OnLoginSubmit(loginForm:any){


    this.userService.login(loginForm).subscribe((res:any)=>{
      this.loginData = res;
      
      if(res=='User Not Found.'){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid Credential!',
          })
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Otp Sent to mobile number',
          showConfirmButton: false,
          timer: 1500
        })
      //swal("", "Otp Sent to mobile number", "success");
        
        this.router.navigate(['/conformLogin']);
      }
      console.log(this.loginData);
      
      // localStorage.setItem("Token",res);

      // const healper  = new JwtHelperService();
      // const decoded = healper.decodeToken(this.loginData);
      
      // console.log(decoded.Id);
      // localStorage.setItem("UserId",decoded.Id)
    });
  }
  masterDetails:any

////otp verification code //////
OnOtpSubmit(){


  this.userService.tokenGenerate(this.otp).subscribe((res:any)=>{
    this.OtpData = res;
   //debugger 
    if(this.OtpData == 'Otp is wrong'){
      swal('Otp is wrong')
    }
   else{

   swal("Login Sucessfull !", "", "success");

  //     this.router.navigate(['/admin']);
    }
    console.log(this.OtpData);
    
    localStorage.setItem("Token",res);

    const healper  = new JwtHelperService();
    const decoded = healper.decodeToken(this.OtpData);
    
    console.log(decoded.Id);
    localStorage.setItem("UserId",decoded.Id)
    console.log(decoded.UserRole);
    localStorage.setItem("UserType",decoded.UserRole);

    let userType = localStorage.getItem("UserType")

    if (userType == 'Admin'){
      this.router.navigate(['/admin']);
    }
    else{
      this.router.navigate(['/customer']);
     
    }

  });
}
// for a validation
function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event:any) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}
 
}
