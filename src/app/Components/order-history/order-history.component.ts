import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { SalesService } from 'src/app/Services/sales.service';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  
  constructor(private userService: UserService, private router: Router, private cartService: CartService,private saleService : SalesService) { }

  ngOnInit(): void {
    //this.getAllOrderDataByInvoiceId()
    this.getAllOrderDataByUserId()
  }
  OrderDetailList:any;
  //OrderDetailListByUserid:any;


  // getAllOrderDataByInvoiceId(){
  //   let invoiceId = localStorage.getItem("InvoiceId");
  //   this.saleService.getOrderDetailsByInvoiceId().subscribe((res):any=>{
  //     this.OrderDetailList = res
  //     console.log(res)
  //   })
  // }

  

  getAllOrderDataByUserId(){
    debugger
    let userId = localStorage.getItem("UserId");
    this.saleService.getOrderDetailsByUserId(userId).subscribe((res)=>{
      this.OrderDetailList = res;
    })
   
  }

  deleteHistoryOrder(id:number){
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
        this.saleService.deleteOrderHistroy(id).subscribe(res=>{
         
         setTimeout(() => {
          location.reload();
         }, 2000);
        });
        Swal.fire(
          'Deleted!',
          'Your Order has been deleted.',
          'success'
        )
      }
    })
   

  // method for cancel buttom
    
  }

}
