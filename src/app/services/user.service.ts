import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../user/user';
import { Address } from '../user/address';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  
  constructor(public http:HttpClient) { }

  baseurl = "http://localhost:9000/api/user-service"

  loginUser(emailAddress:string, password:string):Observable<Response>
  {
    console.log("Username is : " + emailAddress);
    console.log("Password is : " + password);

    let myAddress = new Address("", "", "", "")

    let myUser = new User("", "", emailAddress, password, myAddress);

    let api = this.baseurl + "/user/login";
    return this.http.post<Response>(api, myUser, {responseType:'json'});
  }

  createUser(myUser:User) 
  {
    console.log("Inside of the user service: ")
    console.log(myUser);
    let api = this.baseurl + "/user";
    return this.http.post<Response>(api, myUser, {responseType:'json'});    
  }

}
