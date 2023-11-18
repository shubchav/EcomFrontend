import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

// registration api
registration(data:any){
  let url = 'http://localhost:7000/api/User/Registration';
  return this.http.post(url,data);
}


// login api 

//otp generation api

login(data:any)
{

  let url = 'http://localhost:7000/api/User/Login';
  
  return this.http.post(url,data,{responseType:"text"});

}


// token creation api

tokenGenerate(data:any)
{

  let url = 'http://localhost:7000/api/User/otpName?otpName='+data;
  
  return this.http.post(url,data,{responseType:"text"});

}

// get user details by userId
// api : http://localhost:7000/api/User?userId=3

getUser(id:any){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
  let url ='http://localhost:7000/api/User?userId='+ id;
  return this.http.get(url,{headers:header});
}


//// User Update ////
//api: http://localhost:7000/api/User?userId=4

updateUser(id:any,data:any){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/User?userId='+id;
  return this.http.put(url,data,{headers:header});
}


// change password 
//api : http://localhost:7000/api/User/changePassword?userId=4
changePaaswod(id:any,data:any){
  let ab = localStorage.getItem('Token');
//alert(ab);
//debugger
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/User/changePassword?userId='+id;
  return this.http.put(url,data,{responseType:"text"});
}


//////////////////////////////Product Admin/////

addProducts(data:any){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
let url = 'http://localhost:7000/api/Product';
return this.http.post(url,data,{headers:header});
}

// get all product data


getAllProducts(){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/Product';
  return this.http.get(url,{headers:header});
}


//delete api
//http://localhost:7000/api/Product?productId=3

// get product data by product id 
// http://localhost:7000/api/Product/1


getProduct(id:number){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
  let url ='http://localhost:7000/api/Product/'+ id;
  return this.http.get(url,{headers:header});
}

// update policy using Product id 
updateProduct(id:any,data:any){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/Product?productId='+id;
  return this.http.put(url,data,{headers:header});
}


//delete Product data

deleteProduct(id:number){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  let url = 'http://localhost:7000/api/Product?productId='+id;
  return this.http.delete(url,{headers:header})
}

// country and states api calling
allCoutries(){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/User/countries';
  return this.http.get(url,{headers:header});
}


//getStatesbyCountryId
getStatesbyCountryId(id:number){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
  let url ='http://localhost:7000/api/User/states/'+ id;
  return this.http.get(url,{headers:header});
}




/// update password 

forgetPassword(data:any)
{
  let dataq={
    Password:'we'
  }
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  let url = 'http://localhost:7000/api/User/'+data;
  
  return this.http.put(url,dataq,{headers:header});

}


// auth guard related 

//localStorage.setItem("UserType",decoded.UserRole);
isCustomer():any{
  let userType = localStorage.getItem("UserType");
  if (userType == 'Customer'){
    return true;
  }

}
isAdmin():any{
  let userType = localStorage.getItem("UserType");
  if (userType == 'Admin'){
    return true;
  }

}
// discount table 

// adding a discount ////////////////////////////////////////////////////////////////////////////////////////////////////////////

addDiscount(data:any){
  //debugger
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
let url = 'http://localhost:7000/api/Product/AddDiscount';
return this.http.post(url,data,{headers:header});
}

// get all discount
getAllDiscount(){
 // debugger
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  
  console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/Product/GetAllDiscount';
  return this.http.get(url,{headers:header});
}

// get discount by Id
getDiscount(id:number){
  let ab = localStorage.getItem('Token');
  //alert(ab);
  var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  console.log(localStorage.getItem("Token"));
  let url ='http://localhost:7000/api/Product/GetDiscount/'+ id;
  return this.http.get(url,{headers:header});
}

deleteDiscount(id:number){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
  let url = 'http://localhost:7000/api/Product/DeleteDiscount?dicountId='+id;
  return this.http.delete(url,{headers:header})
}

// =update discount
updateDiscount(id:any,data:any){
  let ab = localStorage.getItem('Token');
//alert(ab);
var header = new HttpHeaders().set("Authorization","Bearer "+ab);
console.log(localStorage.getItem("Token"));
  let url = 'http://localhost:7000/api/Product/UpdateDiscount?dicountId='+id;
  return this.http.put(url,data,{headers:header});
}

}
