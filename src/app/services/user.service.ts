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
  user:any;
  
  constructor(public http:HttpClient) { }

  baseurl = "http://api-gateway-webservice:9000/api/user-service";

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
    let api = this.baseurl + "/user";
    return this.http.post<Response>(api, myUser, {responseType:'json'});    
  }

  getAllUsers():Observable<User[]>
  {
    let api = this.baseurl + "/user";
    return this.http.get<User[]>(api, {responseType:'json'});
  }

  deleteUser(userId:String):Observable<Response>
  {
    let api = this.baseurl + "/user/" + userId;
    return this.http.delete<Response>(api);
  }

  updateUser(myUser:User):Observable<Response>
  {
    let api = this.baseurl + "/user";
    return this.http.put<Response>(api, myUser);
  }

  shareUser(sharedUser:User)
  {
    this.user = sharedUser;
  }

  getSharedUser()
  {
    return this.user;
  }
}