import { Component, OnInit } from '@angular/core';
import { Dish } from '../restaurant/dish';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit
{

  dishArray:Dish[] = [];
  restaurantArray:Restaurant[] = [];
  userFormGroup: any;


  constructor(private restaurantService: RestaurantService, private router:Router)
  {

  }

  dishFormGroup = new FormGroup
  (
    {
      dishName: new FormControl('')
      // ,
      // dishCategory: new FormControl(''),
      // cost: new FormControl('')
    }
  )

  openModal(restaurantId:number) 
  {
    const modelDiv = document.getElementById('addDishModal');

    if(modelDiv != null)
    {
      modelDiv.style.display = 'block';
    }
    
  }

  closeModal() 
  {
    const modelDiv = document.getElementById('addDishModal');

    if(modelDiv != null)
    {
      modelDiv.style.display = 'none';
    }
    
  }
  
  createDish()
  {
    let dishName = this.userFormGroup.get('dishName')?.value!;
    // let dishCategory = this.userFormGroup.get('dishCategory')?.value!;
    // let cost = this.userFormGroup.get('cost')?.value!;

    // console.log(dishName);
    // let myDish = new Dish(dishName, dishCategory, cost);
    // console.log(myDish);

    console.log('dishName');
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
