import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { SalesService } from 'src/app/Services/sales.service';
import { UserService } from 'src/app/Services/user.service';

import swal from 'sweetalert';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart-customer',
  templateUrl: './cart-customer.component.html',
  styleUrls: ['./cart-customer.component.scss']
})
export class CartCustomerComponent implements OnInit {
  subtotalIsZero:any;
  QuantityList: any;
  QuantityListByMasterId:any;
  ProductQty:any;
  cartDetailList: any;
  masterDetails: any;
  // cartDetailListProduct:any = [{
  //   productId:'',
  //   productName: '',
  //   productCode: '',
  //   productImage:'',
  //   category: '',
  //   brand: '',
  //   sellingPrice: '',
  //   purchasePrice: '',
  //   sellingDate:'',
  //   stock:''
  // }];
  cartDetailListProduct: any = [];
  pId: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvv: any;



  constructor(private userService: UserService, private router: Router, private cartService: CartService, private saleService: SalesService) { }




  ngOnInit(): void {
    this.cartDetailListProduct
    this.getByUserIdCart();
    this.getMasterdetailbyUserId();
    this.getMSalesDByUId();
    this.getQuantityByMid();
   //this.cartDetailList
   //this.cartDetailListProduct
  }



  getbyProductId(id: any) {
    this.userService.getProduct(id).subscribe((res: any) => {
      console.log(res);
      // this.cartService.getQuantityBYUID().subscribe((res: any) => {
      //   this.QuantityList = res;
      //   console.log(res);

      // })

      // let data = {
      //   productId: '',
      //   productName: res.productName,
      //   productImage: '',
      //   category: '',
      //   brand: '',
      //   sellingPrice: '',
      //   purchasePrice: '',
      //   sellingDate: '',
      //   Qnt: this.QuantityList[0].quantity

      // }


      // this.cartDetailListProduct.push(data);
      // debugger
      //console.log(this.cartDetailListProduct)
    })

  }

  getMasterdetailbyUserId() {
    this.cartService.getMCartByUserId().subscribe((res: any) => {
      this.masterDetails = res
      this.masterDetails.cartId
      localStorage.setItem("MasterCartid", this.masterDetails.cartId)
      //console.log(this.masterDetails.cartId )
    })
  }




  getByUserIdCart() {
    let masterId = localStorage.getItem("MasterCartid")
    this.cartService.getCartDetailsBymasterCartId(masterId).subscribe(res => {

      this.cartDetailList = res;

      this.getbyProductId(this.cartDetailList.productId);
      // this.cartDetailList.productId

      //console.log("CartListIs",this.cartDetailList)
      //debugger
      this.cartDetailList.map((e1: any, index: any) => {
        e1.productId
        //this.getbyProductId( e1.productId);
        this.userService.getProduct(e1.productId).subscribe((res: any) => {
          console.log(res);
          //new part addded for quantity validation
          this.ProductQty = res.stock;



          this.cartService.getQuantityBYMCartId().subscribe((res: any) => {
            //debugger
            this.QuantityList = res;
            console.log(res);
            
          })

          let data = {
            productId: res.productId,
            productName: res.productName,
            productImage: res.productImage,
            category: res.category,
            brand: res.brand,
            sellingPrice: res.sellingPrice,
            Qnt: this.QuantityList[index].quantity,
            cartdetailId:this.QuantityList[index].cartDetailId

          }

         
          this.cartDetailListProduct.push(data);
          // debugger
          //console.log(this.cartDetailListProduct)
        })

      })

      
    })
  }



  //delete policy by policy id
  deleteProductInCartDetails(id: number) {
  debugger

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
      this.cartService.deleteProductInCartDetail(id).subscribe(res => {
        let userId = localStorage.getItem("UserId");
        let masterId = localStorage.getItem("MasterCartid")
        let salesdata = {
          saleMasterId: 0,
          invoiceId: "string",
          userId: userId,
          masterCartId: masterId,
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
       // this.getMSalesDByUId()
      })
  
      
 
      Swal.fire(
        'Deleted!',
        'Your Product has been deleted.',
        'success'
      )
  setTimeout(() => {
    location.reload()
  }, 2000);

    }

  } )
   
  }


// creating new method for delete a cart details 

//deleteProductInCartDetailBCartDetailID
deleteProductInCartDetailsByCartDID(id: number) {
  //debugger

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
      this.cartService.deleteProductInCartDetailBCartDetailID(id).subscribe(res => {
  
      })
  
      let userId = localStorage.getItem("UserId");
      let masterId = localStorage.getItem("MasterCartid")
      let salesdata = {
        saleMasterId: 0,
        invoiceId: "string",
        userId: userId,
        masterCartId: masterId,
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
      this.getMSalesDByUId()
 
      Swal.fire(
        'Deleted!',
        'Your Product has been deleted.',
        'success'
      )
  setTimeout(() => {
    location.reload()
  }, 2000);

    }

  } )
   
  }





//add salesmaster method
addSalemaster(){
 // debugger
  let userId = localStorage.getItem("UserId");
  let masterId = localStorage.getItem("MasterCartid")
  let salesdata = {
    saleMasterId: 0,
    invoiceId: "string",
    userId: userId,
    masterCartId: masterId,
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
} 

// add sales details 
AddSalesDetals(){
  //debugger
  let userId = localStorage.getItem("UserId");
  let masterId = localStorage.getItem("MasterCartid");
  let data ={
    
      userId:userId,
      masterCartId: masterId
    
  }
  this.saleService.addSalesdetail(data).subscribe(res=>{
  })
}


  verifyPaymentDebitcard() {
   // debugger
    let data: any = {
      cardNumber: this.cardNumber,
      expiryDate: this.cardExpiry,
      cvv: this.cardCvv
    }
    if (this.cardNumber == null || this.cardExpiry == null || this.cardCvv== null ) {
      swal("Please Provide Card Details.")
    }
    this.cartService.verifyCardDetail(data).subscribe((res: any) => {
     
      if (res == "Invalid Card.") {
        swal("Failed", "Please provide valid card details",);

       
      } else {
        let userId = localStorage.getItem("UserId");
        let masterId = localStorage.getItem("MasterCartid")
        let newdata = {
          userId: userId,
          isPaymentDone: true
        }
        //debugger
        swal("Payment Sucessfull!", "Happy Shopping", "success")
        // call the update method for payment success payment.
        this.AddSalesDetals();
        this.onUpdateMasterCart();
        //this.addSalemaster();


        //debugger
        let Orderdata = {
          "userId": userId,
          "masterCartId": masterId
        }

        this.saleService.addOrderHistory(Orderdata).subscribe((res: any) => {

        });
      //debugger
        this.cartService.addMasterCart(newdata).subscribe((response: any) => {
         
         //debugger
          let masterId = localStorage.setItem("MasterCartid", response.cartId);
          this.addSalemaster()
          // add pert route for invoices
          //this.addSalemaster()
          
          this.router.navigate(['/invoice']);
         setTimeout(() => {
          location.reload();
         }, 1200);
        })
       //debugger
//////problem are here 
       //this.onUpdateMasterSalesByUserId()
      }

    })
  }

  onUpdateMasterCart() {
    let masterId = localStorage.getItem("MasterCartid")
    let userId = localStorage.getItem("UserId");
    let data = {
      cartId: masterId,
      userId: userId,
      isPaymentDone: true
    }

    this.cartService.updateMasterCart(masterId, data).subscribe(res => {
      //console.log(res);

      //swal("Updated Successfully!", "", "success");

    })
  }



  // update a mastersales
  onUpdateMasterSalesByUserId() {

    let userId = localStorage.getItem("UserId");
    let data = {
      saleMasterId: 0,
      invoiceId: "",
      userId: 0,
      invoiceDate: "2022-11-10T08:09:20.179Z",
      subtotal: 0,
      deliveryAddress: "string",
      deliveryZipcode: "string",
      deliveryCountry: "string",
      deliveryState: "string"
    }


    this.saleService.updateSalesMasterByuserId(userId, data).subscribe(res => {
      //console.log(res);

      //swal("Updated Successfully!", "", "success");

    })
  }

  // counProduct(){
  //   this.cartDetailListProduct
  // }



  // counProduct(){
  //   this.cartDetailListProduct
  // }

  MsaleDataByUId: any;
  // get sales detail by userid
  getMSalesDByUId() {
    this.saleService.getMSalesDByUserId().subscribe((res: any) => {
      // debugger
      this.MsaleDataByUId = res

      //console.log(this.MsaleDataByUId)
    })
  }


  // getting a all quantity by userid

  getQuantityByMid() {
    //debugger
    this.cartService.getQuantityBYMCartId().subscribe((res: any) => {
      this.QuantityList = res;
      //console.log(this.QuantityList)
    })
  }
// increase Qty in cart
  increaseQty(id:any){
    //debugger
    let data={
      quantity: 0
    }
    this.cartService.IncreasupdateQty(id,data).subscribe((res:any)=>{
      if(res == 'Stock is not Available'){
        swal("Stock is not available.")
      }else{
        this.addSalemaster()  
        location.reload()
      }
     
    })
   
    
  }


  // decrease Qty in cart
  decreaseQty(id:any){
    let data={
      quantity: 0
    }
    this.cartService.DecreaseupdateQty(id,data).subscribe((res:any)=>{
      if(res == 'Stock is not Available'){
        swal("Stock is not available.")
      }else{
        this.addSalemaster()
        location.reload()
      }
      
    })
    
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
  condition(){
    if(this.MsaleDataByUId.subtotal == 0){
      this.subtotalIsZero = true
      return true
    }
    else{
      this.subtotalIsZero = false
      return true
    }
  }
}
