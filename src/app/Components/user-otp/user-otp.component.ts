import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-otp',
  templateUrl: './user-otp.component.html',
  styleUrls: ['./user-otp.component.scss']
})
export class UserOtpComponent implements OnInit {
  OtpData:any;
  masterDetails:any;
otp: any;
  constructor(private userService: UserService , private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.function();
  }

 ////otp verification code //////
OnOtpSubmit(){


  this.userService.tokenGenerate(this.otp).subscribe((res:any)=>{
    this.OtpData = res;
   //debugger 
    if(this.OtpData == 'Otp is wrong'){
      swal('Otp is wrong')
    }
   else{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login Sucessfull !',
      showConfirmButton: false,
      timer: 1500
    })
  // swal("Login Sucessfull !", "", "success");

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
      // let userId = localStorage.getItem("UserId");

      // let data ={
      //   userId: userId,
      //   isPaymentDone: false
      
      // }
      
      // this.cartService.addMasterCart(data).subscribe((res:any)=>{
      //   this.masterDetails= res
      //   this.masterDetails.cartId
      //   localStorage.setItem("MasterCartid",this.masterDetails.cartId)
      // })

    }

  });
}
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

