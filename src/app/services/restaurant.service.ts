import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService 
{  
  restaurant:any;

  constructor(public http:HttpClient) { }

  baseurl = "http://localhost:9000/api/restaurant-service";

  createRestaurant(myRestaurant:Restaurant) 
  {
    let api = this.baseurl + "/restaurant";
    return this.http.post<Response>(api, myRestaurant, {responseType:'json'});    
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

  updateRestaurant(myRestaurant:Restaurant):Observable<Response>
  {
    let api = this.baseurl + "/restaurant";
    return this.http.put<Response>(api, myRestaurant);
  }

  shareRestaurant(sharedRestaurant:Restaurant)
  {
    this.restaurant = sharedRestaurant;
  }

  getSharedUser()
  {
    return this.restaurant;
  }
}