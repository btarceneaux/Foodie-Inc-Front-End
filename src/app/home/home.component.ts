import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../manage-restaurant/restaurant';
import { Dish } from '../manage-restaurant/dish';
import { FormControl, FormGroup } from '@angular/forms';
import { LineItem } from './lineItem';
import { Order } from './order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{
  restaurantArray:Restaurant[] = [];
  orderTotal:number = 0;
  selectedDishId:number = 0;
  selectedDishCost:number = 0;
  selectedDishQuantity:number = 0;
  selectedRestaurantId:number = 0;
  mySelectedRestaurant:Restaurant = new Restaurant("");
  myOrder:Order = new Order();
  lineItemArray:LineItem[] = [];
  
  restaurantFormGroup = new FormGroup
  (
    {
      restaurantId: new FormControl('')
    }
  )

  itemFormGroup = new FormGroup
  (
    {
      quantity: new FormControl('')
    }
  )

  ngOnInit(): void 
  {
    this.getAllRestaurants();
  }

  constructor(private orderService:OrderService, private restaurantService:RestaurantService, private router:Router)
  {

  };

  selectItemFromRestaurant(dish:Dish)
  {
    
    this.selectedDishQuantity = Number(this.itemFormGroup.get('quantity')?.value!);
    
    if(this.selectedDishQuantity > 0)
    {
      let myLineItem = new LineItem(this.selectedRestaurantId, this.selectedDishQuantity);
      myLineItem.dish = dish;
      this.lineItemArray.push(myLineItem);

      this.myOrder.orderItems = this.lineItemArray;

      this.myOrder.orderTotal += this.selectedDishQuantity * dish.cost;

      this.orderTotal = Number(this.myOrder.orderTotal.toFixed(2));
    }

  }

  selectRestaurant()
  {
    //Reset the order if someone chooses a different restaurant.
    this.myOrder.orderTotal = 0;

    //Remove the items
    for(var item in this.myOrder.orderItems)
    {
      this.myOrder.orderItems.pop();
    }

    this.selectedRestaurantId = Number(this.restaurantFormGroup.get('restaurantId')?.value!);

    this.getAllDishesFromRestaurant();
  }
  
  setRestaurantId(restaurantId:number) 
  {
    this.selectedRestaurantId = restaurantId;
    console.log("The restaurant ID being set is " + restaurantId);
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

  getAllDishesFromRestaurant()
  {
    //Get the selected restaurant
    const restaurantObject = this.restaurantArray.find(obj => obj.restaurantId === this.selectedRestaurantId);
    this.mySelectedRestaurant = restaurantObject!;
  }

  checkOut()
  {
    //We need to remove the order ID because it interferes with hibernate.
    this.myOrder.orderId = null;
    this.orderService.setOrder(this.myOrder);

    this.router.navigate(['checkout']);
  }
}
