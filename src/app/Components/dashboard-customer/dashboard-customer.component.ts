import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';


import { CartService } from 'src/app/Services/cart.service';
import { SalesService } from 'src/app/Services/sales.service';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss']
})
export class DashboardCustomerComponent implements OnInit {
 // @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  // quantity varuable
  MsaleDataByUId: any;
  repeatPassword:any
  qty:number=0;
  allProducts: any;
  paymentDone:any;
  paymentStatus:any;
// discount variable
IsDiscount:any;
DiscountRate:any
getAllDiscountList:any;
DiscountStatusName:any;
  //user data
  passwordData:any;
  passwordData2:any;
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
  // stock variable
  stockCal: any;
  constructor(private userService: UserService, private router: Router, private cartService: CartService , private saleService : SalesService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.statusCheckMcart();
    this.getUser();
    this.function ();
    //this.showDiscount()
    this.getAllDiscount();
    this.getMSalesDByUId();
    this.checkDiscount();
  }


  getAllProducts() {
    this.userService.getAllProducts().subscribe((data): any => {
      this.allProducts = data;
      console.log(data)
    });
  }

// get discount

getAllDiscount() {
  //debugger
  this.userService.getAllDiscount().subscribe((data):any=> {
    this.getAllDiscountList = data;
    console.log(data)
    for (let i = 0; i < this.getAllDiscountList.length; i++) {
      if(this.getAllDiscountList[i].status =='Active'){
       this.DiscountStatusName = this.getAllDiscountList[i].discountName;
       this.DiscountRate =  this.getAllDiscountList[i].discountRate;
     }
    }
  });
}

checkDiscount(){
  if (this.DiscountStatusName == null){
    this.IsDiscount = false;
  }
 else{
  this.IsDiscount = true;
 }
}
// showDiscount(){
//   debugger
//   for (let i = 0; i < this.getAllDiscountList.length; i++) {
//     if(this.getAllDiscountList[i].status =='Active'){
//      this.DiscountStatusName = this.getAllDiscountList[i].discountName;
//    }
//   }
// }


// create a method for generating the cart id

masterCartGenerate(){
  let userId = localStorage.getItem("UserId");

  let data ={
    userId: userId,
    isPaymentDone: false

  }

  this.cartService.addMasterCart(data).subscribe((res:any)=>{
    this.masterDetails= res
    this.masterDetails.cartId
    localStorage.setItem("MasterCartid",this.masterDetails.cartId)
  })

}

addMasterSales(){
  let userId = localStorage.getItem("UserId");

  let masterId = localStorage.getItem("MasterCartid")
  let salesdata ={
  saleMasterId: 0,
  invoiceId: "string",
  userId: userId,
  masterCartId:masterId,
  invoiceDate: "2022-11-02T07:17:27.924Z",
  subtotal: 0,
  deliveryAddress: "string",
  deliveryZipcode: "string",
  deliveryCountry: "string",
deliveryState: "string"
}
this.saleService.addSalesMaster(salesdata).subscribe(res=>{
  console.log(res);
})
}


  Addtocart(id: any, stock:any) {
    //debugger


    let userId = localStorage.getItem("UserId");

      let masterdata ={
        userId: userId,
        isPaymentDone: false
      }

      this.cartService.addMasterCart(masterdata).subscribe((res:any)=>{
        //debugger
        this.masterDetails= res
        this.masterDetails.cartId
        localStorage.setItem("MasterCartid",this.masterDetails.cartId)

      })

    //let userId = localStorage.getItem("UserId");
    let cartmasterId  = localStorage.getItem("MasterCartid");
    let data ={

      cartId: cartmasterId ,
      userId: userId,
      productId: Number(id),
      // here we have to put quantity by user
      //quantity: Number(stock)
      quantity: 1
    }

      this.cartService.addCartDetails(data).subscribe(res=>{
        console.log(res);
        let salesdata = {
          saleMasterId: 0,
          invoiceId: "string",
          userId: userId,
          masterCartId: cartmasterId,
          invoiceDate: "2022-11-02T07:17:27.924Z",
          subtotal: 0,
          deliveryAddress: "string",
          deliveryZipcode: "string",
          deliveryCountry: "string",
          deliveryState: "string"
        }
        this.saleService.addSalesMaster(salesdata).subscribe(res => {
          //console.log(res);
        })
       // this.addMasterSales()
      })
    //debugger
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added To Cart',
      showConfirmButton: false,
      timer: 1500
    })
  }

// get master cart detail by user id
  getMSalesDByUId() {
    this.saleService.getMSalesDByUserId().subscribe((res: any) => {
      // debugger
      this.MsaleDataByUId = res

      //console.log(this.MsaleDataByUId)
    })
  }


  masterDetails:any
  statusCheckMcart(){
    let userId = localStorage.getItem("UserId");

    let data ={
      userId: userId,
      isPaymentDone: false

    }

    // this.cartService.addMasterCart(data).subscribe((res:any)=>{
    //   this.masterDetails= res
    //   this.masterDetails.cartId
    //   localStorage.setItem("MasterCartid",this.masterDetails.cartId)
    // })
    this.cartService.getMCartByUserId().subscribe((res:any)=>{
      this.paymentStatus = res.isPaymentDone;

      if (this.paymentStatus || this.paymentDone == 'true')
      {
       // alert ("your payment is done.")
       //localStorage.setItem("MasterCartid",this.paymentStatus.cartId)
        //this.cartService.addMasterCart(data)
      }
      else{
        //alert("Your are something left in the cart.");

      }


    })
    //this.cartService.addMasterCart
  }

// navigator for a go to cart
  goToCart(){

    this.router.navigate(['/customerCart']);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
  logout(){
    localStorage.clear();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Sucessfully !',
      showConfirmButton: false,
      timer: 1500
    })
    //swal("Logout Sucessfull !", "", "success");

    //this.router.navigate(['/login']);
  }

// user related

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
    console.log(res);
    //this.userdata();
    swal("Updated Successfully!", "", "success");

  })
}

//change Password

ChangePassword(){
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
     swal("Password Updated Sucessfully !", "", "success");

    });
  }
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


cartPage(){
  this.router.navigateByUrl('/customer', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/customerCart'] );
    setTimeout(() => {
      location.reload();
     }, 10);

});
  //this.router.navigate(['/customerCart']);
   //window.location.reload();
}
  }





