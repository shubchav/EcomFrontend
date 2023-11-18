import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  repeatPassword:any
  selectedValue:any;
  getbyidDiscount:any=[{
    discountId: '',
  discountName: '',
  discountRate: '',
  status: ''
  }]
  DiscountData:any;
  getbyid: any = [{
    productId:0,
    productName: '',
    productCode: '',
    productImage:'',
    category: '',
    brand: '',
    sellingPrice: '',
    purchasePrice: '',
    sellingDate:'',
    stock:0
  }]
  //   getProduct() variable
  productData: any;
//get all discount
getAllDiscountList:any;
  //get all product variable
  allProducts:any;
// purchase prise
purchasePrice:any
// password data 
passwordData:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  //user data
  userdata: any;
  getUserbyid: any=[{
    userId: '',
  firstname: '',
  lastname: '',
  email: '',
  userType: '',
  dob: '',
  username: '',
  mobileNumber: '',
  address: '',
  zipcode:'',
  profileImage: '',
  country: '',
  state: ''
  }];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.function (); 
    this.getAllProducts();
    this.getAllDiscount();
    this.getUser(); 
    
  }


// Adding New Products
onSubmitProduct(productform: any) {
 
  this.userService.addProducts(productform).subscribe(res=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Product Added.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      location.reload()
    }, 1500);
  })

}

// get all products

getAllProducts() {
  this.userService.getAllProducts().subscribe((data):any=> {
    this.allProducts = data;
    console.log(data)
  });
}



// get product by product id


  // get Products by id
  getProduct(id: number) {
    this.userService.getProduct(id).subscribe(data => {
      this.getbyid = data;
      this.productData = data;
      console.log(data);
    })
  }

  // update Product 
  onUpdateProduct(updateForm: any) {

    console.log("updateForm")
    console.log(updateForm)
    this.userService.updateProduct(this.getbyid.productId, updateForm).subscribe(res => {
      console.log(res);
      //this.userdata();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product Updated Successfully.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        location.reload()
      }, 1500);
    

    })
  }


   //delete policy by policy id
   deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProduct(id).subscribe(res=>{
          setTimeout(() => {
            location.reload()
          }, 2000);
          
      
        })
        Swal.fire(
          'Deleted!',
          'Your Product has been deleted.',
          'success'
        )
      }
    })
   
          
         
    
 }

onTableDataChange(event: any) {
  this.page = event;
  this.getAllProducts();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.getAllProducts();
}


logout(){
  localStorage.clear();
  localStorage.clear();
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Logout Sucessfully !',
    showConfirmButton: false,
    timer: 1500
  })
}


// method to write a selling price is greater than purchase price



// get user by userid
 
 getUser() {
  let userId = localStorage.getItem("UserId");
  this.userService.getUser(userId).subscribe(data => {
    this.getUserbyid = data;
    this.userdata = data;
    console.log(data);
  })
}

// update user details
onUpdateUser(updateFormUser: any) {

  
  let userId = localStorage.getItem("UserId");
  this.userService.updateUser(userId, updateFormUser).subscribe(res => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User Updated Successfully.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      location.reload()
    }, 1500);
  

  })
}

//change Password

ChangePassword(){
//debugger
if(this.passwordData != this.repeatPassword){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!, Both Password Unmatched',
   
  })
}else
{
  let userId = localStorage.getItem("UserId");
  //let newPassword = JSON.stringify(this.passwordData);
  let dataq={
    Password: this.passwordData
  }

  this.userService.changePaaswod(userId,dataq).subscribe((res:any)=>{
    //alert("updated.")
   swal("Password Updated Sucessfully !", "", "success");
    
   //console.log(res);


  //     this.router.navigate(['/admin']);

    

  });
}
}

// Adding a Discount table
onSubmitDiacount(discountForm:any){
 // debugger
  this.userService.addDiscount(discountForm).subscribe(res=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Discount Added Successfully.',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      location.reload()
    }, 1500);
  
  })
 
}



getAllDiscount() {
  debugger
  this.userService.getAllDiscount().subscribe((data):any=> {
    this.getAllDiscountList = data;
    console.log(data)
  });
}

getDiscount(id: number) {
  this.userService.getDiscount(id).subscribe(data => {
    this.getbyidDiscount = data;
    this.DiscountData = data;
    console.log(data);
  })
}
deleteDiscount(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteDiscount(id).subscribe(res=>{
        setTimeout(() => {
          location.reload()
        }, 2000);
      })
      Swal.fire(
        'Deleted!',
        'Your Discount has been deleted.',
        'success'
      )
    }
  })
  
  
      
}

  // update discount 
  onUpdateDiscount(updateForm: any) {
    //debugger
    this.userService.updateDiscount(this.getbyidDiscount.discountId, updateForm).subscribe(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Discount Updated Successfully.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        location.reload()
      }, 1500);
    
    })
    //  
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
