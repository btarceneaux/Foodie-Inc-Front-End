import { Component, OnInit } from '@angular/core';
import { Dish } from '../manage-restaurant/dish';
import { Restaurant } from '../manage-restaurant/restaurant'
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit
{


  dishArray:Dish[] = [];
  restaurantArray:Restaurant[] = [];
  response:Response = new Response();
  successEnabled: any;
  errorEnabled: any;

  restaurantFormGroup = new FormGroup
  (
    {
      restaurantName: new FormControl('')
    }
  )

  constructor(private restaurantService: RestaurantService, private router:Router)
  {

  }

  ngOnInit(): void 
  {
     
  }

  createRestaurant() 
  {
    let restaurantName = this.restaurantFormGroup.get('restaurantName')?.value!;

    // let restaurant = new Restaurant(restaurantName);

    if(restaurantName.length > 0)
    {
      this.restaurantService.createRestaurant(restaurantName).subscribe(result=>
        {
          this.response = result;
        },
        error =>
        {
          console.log(error);
        },
        ()=>
        {
          if(this.response.status === 200)
          {
              this.successEnabled = true;
          }
          else
          {
              this.errorEnabled = true;
          }
  
          this.restaurantFormGroup.reset();
          this.router.navigate(["/manageRestaurants"]);
        }
        )
    }
  }
}