import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  //Master cart Api
  //add api

  addMasterCart(data: any) {
    //debugger
    let ab = localStorage.getItem('Token');
    //alert(ab);
    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/MasterCart';
    return this.http.post(url, data, { headers: header });
  }


  // get cart master table details by userId


  getMCartByUserId() {
    let ab = localStorage.getItem('Token');
    //alert(ab);
    let userId = localStorage.getItem("UserId");
    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/MasterCart/' + userId;
    return this.http.get(url, { headers: header });
  }

  // update  Mastercart data

  //http://localhost:7000/api/MasterCart?cartMId=3

  updateMasterCart(id:any,data:any){
    let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/MasterCart?cartMId='+id;
    return this.http.put(url,data,{headers:header});
  }











  ///////////////////////Cart Detail Tables/////////////////////


  ////Add cartDetails

  addCartDetails(data: any) {
    let ab = localStorage.getItem('Token');
    //alert(ab);
    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/CartDetails';
    return this.http.post(url, data, { headers: header });
  }

  // get cart details by userid
  // http://localhost:7000/api/CartDetails/GetCartDetailByUserId/1


  getCartDetailsByUserId() {
    let ab = localStorage.getItem('Token');
    //alert(ab);
    let userId = localStorage.getItem("UserId");
    var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
    console.log(localStorage.getItem("Token"));
    let url = 'http://localhost:7000/api/CartDetails/GetCartDetailByUserId/' + userId;
    return this.http.get(url, { headers: header });
  }

    //get cart detailby master cart id
    
    getCartDetailsBymasterCartId(id:any) {
      let ab = localStorage.getItem('Token');
      //alert(ab);
      let userId = localStorage.getItem("UserId");
      var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
      console.log(localStorage.getItem("Token"));
      let url = 'http://localhost:7000/api/CartDetails/GetCartDetailByCartId/' +id;
      return this.http.get(url, { headers: header });

//http://localhost:7000/api/CartDetails/GetCartDetailByCartId/1
  }

// delete by product id 
  // http://localhost:7000/api/CartDetails/productId?productId=2

  deleteProductInCartDetail(id:number){
    let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
    let url = 'http://localhost:7000/api/CartDetails/productId?productId='+id;
    return this.http.delete(url,{headers:header})
  
}

// delete carddetail data by cartdetail id 
// api : http://localhost:7000/api/CartDetails/DeleteProduct/3174 

deleteProductInCartDetailBCartDetailID(id:number){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  let url = 'http://localhost:7000/api/CartDetails/DeleteProduct/3174 '+id;
  return this.http.delete(url,{headers:header})

}







// get quantity by userid
getQuantityBYUID() {
  let ab = localStorage.getItem('Token');
  //alert(ab);
  let userId = localStorage.getItem("UserId");
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/CartDetails/GetQuantityCartDetailByUserId/' +userId;
  return this.http.get(url, { headers: header });


}
// http://localhost:7000/api/CartDetails/GetQuantityCartDetailByMCartId/2023

// get all quantity by Master cart Id
getQuantityBYMCartId() {
  let ab = localStorage.getItem('Token');
  //alert(ab);
  //debugger
  let masterId = localStorage.getItem("MasterCartid");
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/CartDetails/GetQuantityCartDetailByMCartId/' +masterId;
  return this.http.get(url, { headers: header });


}

///////////////////////////Card Payment ////////////////////////////

//http://localhost:7000/api/PaymentCard/verifyCard

verifyCardDetail(data: any) {
 
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization", "Bearer " + ab);
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/PaymentCard/verifyCard';
  return this.http.post(url, data, {responseType:"text"});
  
}

// get the all list of cart table by user id
// api : http://localhost:7000/api/CartDetails/GetAllRelatedCartDetailByUserId/1009



// update increase the cart quantity
IncreasupdateQty(id:any,data:any){
 // debugger
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/CartDetails/IncreaseUpdateQty?cartDId='+id;
  return this.http.put(url,data,{responseType:"text"});
} 

// update decrease the cart quantity
DecreaseupdateQty(id:any,data:any){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/CartDetails/SubtractUpdateQty?cartDId='+id;
  return this.http.put(url,data,{responseType:"text"});
} 






}
