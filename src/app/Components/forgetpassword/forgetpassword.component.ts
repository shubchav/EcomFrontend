import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  fogetemail:any;
  frogetEmail:any;
  constructor( private userService:UserService) { }

  ngOnInit(): void {
    this.function();
  }

   // forget password 

   forgetPassword(){
    
    this.userService.forgetPassword(this.frogetEmail).subscribe((res:any)=>{
      this.fogetemail = res;
      console.log(this.fogetemail);
      if(this.fogetemail=='Email is wrong'){
        swal('Email is wrong')
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Password Send to Your Mail Id.',
          showConfirmButton: false,
          timer: 1500
        })
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
