import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  formData: any;
  allCountries:any;
  statedata:any;
  registrationData:any;

  selectedValue:any;
  constructor( private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCountries();
    this.function () ;
  }
  onSubmit(registrationForm:any){
    this.formData = registrationForm;
    this.userService.registration(this.formData).subscribe((res:any)=>{
      this.registrationData= res;
      swal("Registration Sucessfull!", "Check Your Mail for Username And Password", "success");
     // alert("Your UserName is: "+this.registrationData.username)
      console.log(res);
    this.router.navigate(['/login']);

    }); 

  }


  LoginCall(){
    this.router.navigate(['/login']);
  }



  // states and country

  getAllCountries() {
    this.userService.allCoutries().subscribe((data):any=> {
      this.allCountries = data;
      console.log(data)
    });
  }
  
  
  // get Products by id
  getStatesbycID() {
    this.userService.getStatesbyCountryId(this.selectedValue).subscribe(data => {
      
    
      this.statedata = data;
      console.log(data);
    })
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
