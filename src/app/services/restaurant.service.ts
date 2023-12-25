import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../manage-restaurant/restaurant';
import { Dish } from '../manage-restaurant/dish';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService 
{  
  restaurant:any;

  constructor(public http:HttpClient) { }

  baseurl = "http://api-gateway-webservice:9000/api/restaurant-service";

  createRestaurant(restaurantName:string) 
  {
    let api = this.baseurl + "/restaurant";
    return this.http.post<Response>(api, restaurantName, {responseType:'json'});    
  }

  updateRestaurant(restaurantId:number, restaurantName:string) 
  {
    let api = this.baseurl + "/restaurant/updateRestaurant/" + restaurantId;
    return this.http.put<Response>(api, restaurantName, {responseType:'json'});    
  }


  getAllRestaurants():Observable<Restaurant[]> 
  {
    let api = this.baseurl + "/restaurant";
    return this.http.get<Restaurant[]>(api, {responseType:'json'});
  }

  deleteRestaurant(restaurantId:string):Observable<Response>
  {
    let api = this.baseurl + "/restaurant/" + restaurantId;
    return this.http.delete<Response>(api);
  }

  deleteDish(restaurantId:number, dishId:number):Observable<Response>
  {
    let api = this.baseurl + "/restaurant/deleteDish/" + restaurantId + "/" + dishId;
    return this.http.delete<Response>(api);
  }

  shareRestaurant(sharedRestaurant:Restaurant)
  {
    this.restaurant = sharedRestaurant;
  }

  getSharedUser()
  {
    return this.restaurant;
  }

  createDish(dishFormData: FormData)
  {
    let api = this.baseurl + "/restaurant/addDish";
    
    return this.http.post<Response>(api, dishFormData, {responseType:'json'});    
  }

  updateDish(restaurantId:number, dish:Dish)
  {
    let api = this.baseurl + "/restaurant/updateDish/" + restaurantId;

    return this.http.put<Response>(api, dish, {responseType:'json'});
  }

}