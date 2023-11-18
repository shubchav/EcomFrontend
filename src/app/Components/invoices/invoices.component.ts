import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/Services/cart.service';
import { SalesService } from 'src/app/Services/sales.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private cartService: CartService, private saleService: SalesService) { }
  salesDetailList:any;
  NewsalesDetailList:any;
  MsaleDataByInvoice:any;
  uInvoiceId: any;
  subtsrct:any;
  ngOnInit(): void {
    this.getMSalesDByUId();
    //this.getMSalesDByInvoiceID()
 //  this. getByUserIdCart();
  //this.getSalesDetailbyInvoiceId();
  }
  MsaleDataByUId:any;
// get sales detail by userid
getMSalesDByUId(){
  this.saleService.getMSalesDByUserId().subscribe((res:any)=>{
   debugger
    this.MsaleDataByUId = res
    localStorage.setItem("InvoiceId",this.MsaleDataByUId.invoiceId)
    console.log(this.MsaleDataByUId);
    //debugger
    //this.AddSalesDetals();
  })
  
 // this.onUpdateMasterSalesByUserId()
}
getMSalesDByInvoiceID(){
  debugger
  let invoiceId  = localStorage.getItem("InvoiceId");
     this.uInvoiceId = invoiceId;
     var subOrderId : string = this.uInvoiceId .substring(0,9);
     var subOrder: any =  this.uInvoiceId .substring(10,9);
      this. subtsrct = (subOrder - 1) 
   var newOrderId:string = subOrderId +  this. subtsrct
    console.log(newOrderId)
    this.saleService.getMSalesDByInvoiceID(newOrderId).subscribe((res:any)=>{
   // debugger
    this.MsaleDataByInvoice = res
    localStorage.setItem("InvoiceId",this.MsaleDataByUId.invoiceId)
    console.log(this.MsaleDataByUId);
    //debugger
    //this.AddSalesDetals();
  })
  
 // this.onUpdateMasterSalesByUserId()
}


onUpdateMasterSalesByUserId() {
    
  let userId = localStorage.getItem("UserId");
  
  let data= {
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
  
 
    this.saleService.updateSalesMasterByuserId(userId,data).subscribe(res => {
      console.log(res);
      
      //swal("Updated Successfully!", "", "success");

    })
  }

  // AddSalesDetals(){
  //   debugger
  //   let userId = localStorage.getItem("UserId");
  //   let masterId = localStorage.getItem("MasterCartid");
  //   let data ={
      
  //       userId:userId,
  //       masterCartId: masterId
      
  //   }
  //   this.saleService.addSalesdetail(data).subscribe(res=>{
  //   })
  // }

  getSalesDetailbyInvoiceId(){
    debugger
    let invoiceId  = localStorage.getItem("InvoiceId");
     this.uInvoiceId = invoiceId;
     var subOrderId : string = this.uInvoiceId .substring(0,9);
     var subOrder: any =  this.uInvoiceId .substring(10,9);
      this. subtsrct = (subOrder - 1) 
 var newOrderId:string = subOrderId +  this. subtsrct
console.log(newOrderId)
    debugger

    this.saleService.getSalesDetailByInvoiceId(newOrderId).subscribe((res):any=>{
      this.salesDetailList = res;
      
    })
  }
// trial 

  // getByUserIdCart() {
  //   debugger
  //   let invoiceId = localStorage.getItem("InvoiceId");
  //   this.saleService.getSalesDetailByInvoiceId(invoiceId).subscribe((res:any) => {

  //     this.salesDetailList = res;

      
  //     debugger
  //     this.salesDetailList.map((e1: any, index: any) => {
  //       e1.productId
        
  //       this.userService.getProduct(e1.productId).subscribe((res: any) => {
  //         console.log(res);

  //         let data = {
  //           productId: this.salesDetailList[index].productId,
  //           productName: this.salesDetailList[index].productName,
  //           productImage: this.salesDetailList[index].productImage,
  //           category: this.salesDetailList[index].category,
  //           brand: this.salesDetailList[index].brand,
  //           sellingPrice: this.salesDetailList[index].sellingPrice,
           
  //         }


  //         this.NewsalesDetailList.push(data);
  //         // debugger
  //         //console.log(this.cartDetailListProduct)
  //       })

  //     })

      
  //   })
  // }

}
