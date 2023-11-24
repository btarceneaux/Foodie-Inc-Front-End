import { Component, OnInit } from '@angular/core';
import { Dish } from '../restaurant/dish';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit
{

  dishArray:Dish[] = [];
  restaurantArray:Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router:Router)
  {

  }

  showMenu(restaurantId:number) 
  {
    
  }
    
  DeleteRestaurant(restaurantId:number) 
  {
    if(restaurantId != null)
    {
      this.restaurantService.deleteRestaurant(String(restaurantId)).subscribe(result =>
        {
          console.log(result);
        },
        error =>
        {
          console.log(error);
        },
        () =>
        {
          location.reload();
          console.log("Finished Loading Information.");
        }
        )
    }
  }

  ngOnInit(): void 
  {
     this.getAllRestaurants();
  }

  createRestaurant(id:number) 
  {

  }
  updateRestaurant(id:number) 
  {

  }

  getAllRestaurants() 
  {
    this.restaurantService.getAllRestaurants().subscribe(result =>
      {
        this.restaurantArray = result;
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        console.log("Finished Loading Restaurants");
      }
      )
  }
}
