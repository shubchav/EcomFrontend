import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) { }

  //////////////// sales Master Apis ////////////////////

  // add sales master details
  addSalesMaster(data:any){
    let ab = localStorage.getItem('Token');
    //alert(ab);
    var header = new HttpHeaders().set("Authorization","Bearer "+ab);
    console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/SalesMaster';
  return this.http.post(url,data,{headers:header});
  }
  

  // getting sales master details by user id 
  // api http://localhost:7000/api/SalesMaster/3
  getMSalesDByUserId() {
    let ab = localStorage.getItem('Token');
    //alert(ab);
    let userId = localStorage.getItem("UserId");
    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/SalesMaster/' + userId;
    return this.http.get(url, { headers: header });
    
  }

  // getting a mastersales detail by invoiceID
  // api http://localhost:7000/api/SalesMaster/GetSalesMasterByInvoice/-ORD%20-%20875
  getMSalesDByInvoiceID(id:any) {
    let ab = localStorage.getItem('Token');
    //alert(ab);

    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/SalesMaster/GetSalesMasterByInvoice/' + id;
    return this.http.get(url, { headers: header });
    
  }

  // update the sale master subtotal
  // api http://localhost:7000/api/SalesMaster?userId=1011


  updateSalesMasterByuserId(id:any,data:any){
    let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/SalesMaster?userId='+id;
    return this.http.put(url,data,{headers:header});
  }


  //////////////Order History Apis /////////////////////
// add order 
// api http://localhost:7000/api/SalesMaster/AddOrderHistory
  addOrderHistory(data:any){
    //debugger
    //let userId = localStorage.getItem("UserId");
    
    let ab = localStorage.getItem('Token');
    //alert(ab);
    var header = new HttpHeaders().set("Authorization","Bearer "+ab);
    console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/SalesMaster/AddOrderHistory';
  return this.http.post(url, data, {headers:header});
  }
  
// get all order by invoice id 
// api : http://localhost:7000/api/SalesMaster/GetOrderByInvoice/-ORD%20-%20079

getOrderDetailsByInvoiceId() {
  //debugger
  let ab = localStorage.getItem('Token');
  //alert(ab);
  let invoiceId = localStorage.getItem("InvoiceId");
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/SalesMaster/GetOrderByInvoice/' + invoiceId ;
  return this.http.get(url, { headers: header });
  
}


// get order by UserId 
// api: http://localhost:7000/api/SalesMaster/GetAllOrderByUserId/1011

getOrderDetailsByUserId(id:any) {
 // debugger
  let ab = localStorage.getItem('Token');
  //alert(ab);
  let userId = localStorage.getItem("UserId");
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/SalesMaster/GetAllOrderByUserId/' + userId ;
  return this.http.get(url);
  
}


// delete order by orderId
// api : http://localhost:7000/api/SalesMaster/6


deleteOrderHistroy(id:number){
  //debugger
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  let url = 'http://localhost:7000/api/SalesMaster/'+id;
  return this.http.delete(url,{headers:header})
}


// sales detail tables ///////////////////////////////////////////////////////////////////
// add sales detail tables

addSalesdetail(data:any){
  let ab = localStorage.getItem('Token');
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
let url = 'http://localhost:7000/api/SalesDetails';
return this.http.post(url, data,{headers:header});
}

// get sales details by invoice id

getSalesDetailByInvoiceId(id:any) {
  //debugger
  let ab = localStorage.getItem('Token');
  //alert(ab);
  let invoiceId = localStorage.getItem("InvoiceId");
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/SalesDetails?invoiceId=' + id ;
  return this.http.get(url, { headers: header });
  
}
}
