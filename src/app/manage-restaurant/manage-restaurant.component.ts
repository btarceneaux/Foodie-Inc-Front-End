import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Dish } from './dish';
import { Restaurant } from './restaurant';
import { FileHandle } from './file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-restaurant',
  templateUrl: './manage-restaurant.component.html',
  styleUrls: ['./manage-restaurant.component.css']
})
export class ManageRestaurantComponent implements OnInit
{
  restaurantArray:Restaurant[] = [];
  userFormGroup: any;
  selectedRestaurantId:number = 0;
  response:Response = new Response();
  myDish:Dish = new Dish('', '', 0, '');
  fileHandle:any;
  mySelectedRestaurant:Restaurant = new Restaurant("");
  restaurantName:String = "";
  


  constructor(private restaurantService: RestaurantService, private router:Router, private sanitizer: DomSanitizer)
  {

  }
  
  setRestaurantDetails(restaurantId:number, restaurantName:string)
  {
    this.mySelectedRestaurant.setRestaurantId(restaurantId);
    this.mySelectedRestaurant.restaurantName = restaurantName;

    console.log("My restaurant is : ");
    console.log(this.mySelectedRestaurant);
  }

  setRestaurantId(restaurantId:number) 
  {
    this.selectedRestaurantId = restaurantId;
    console.log("The restaurant ID being set is " + restaurantId);
  }

  dishFormGroup = new FormGroup
  (
    {
      dishName: new FormControl(''),
      dishImages: new FormControl(''),
      dishCategory: new FormControl(''),
      cost: new FormControl('')
    }
  )

  updateRestaurantFormGroup = new FormGroup
  (
    {
      restaurantId: new FormControl(''),
      restaurantName: new FormControl('')
    }
  )


  updateDishFormGroup = new FormGroup
  (
    {
      dishId: new FormControl(''),
      dishName: new FormControl(''),
      dishCategory: new FormControl(''),
      cost: new FormControl('')
    }
  )

  openModal(modalName:string) 
  {
    const modelDiv = document.getElementById(modalName);

    if(modelDiv != null)
    {
      modelDiv.style.display = 'block';
    }
    
  }

  closeModal(modalName:string) 
  {
    const modelDiv = document.getElementById(modalName);

    if(modelDiv != null)
    {
      modelDiv.style.display = 'none';
    }
    
  }

  onFileSelected(event: any) 
  {
    if(event.target.files)
    {
      const file = event.target.files[0];

      const fileHandle :FileHandle =
      {
        file: file, 
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.fileHandle = fileHandle;
    }
    
    
  }

  prepareFormData(restaurantId:number, dish:Dish): FormData
  {
    let formData = new FormData();
    formData.append
    (
      'restaurantId', 
      restaurantId.toString()
    );

    formData.append
    (
      'dish',
      new Blob([JSON.stringify(dish)], {type:'application/json'})
    );

    formData.append
    (
      'file',
      this.fileHandle?.file
    )


    return formData;
  }
  
  createDish()
  {
    let dishName = this.dishFormGroup.get('dishName')?.value!;
    let dishCategory = this.dishFormGroup.get('dishCategory')?.value!;
    let cost = this.dishFormGroup.get('cost')?.value!;


    this.myDish.dishName = dishName;
    this.myDish.dishCategory = dishCategory;
    this.myDish.cost = Number(cost);

    
    const dishFormData = this.prepareFormData(this.selectedRestaurantId, this.myDish);
    console.log("Now printing form data");
    const entries = dishFormData.entries();

    for(let entry of entries)
    {
      const key = entry[0];
      const val = entry[1];
      console.log(key, val);
    }

    //Now that we have the restaurant id and the dish, let's call the api.
    this.restaurantService.createDish(dishFormData).subscribe(result =>
      {
        this.response = result;
        console.log(this.response);
      },
      error =>
      {
        console.log(error);
      },
      ()=>
      {
        console.log(this.response.status);
        if(this.response.status === 200)
        {
            // this.successEnabled = true;
            console.log("Everything worked");
            this.dishFormGroup.reset();
            this.fileHandle = null;
            location.reload();
        }
        else
        {
            // this.errorEnabled = true;
            console.log(this.response);
            console.log("Uh oh! Something happened!");
        }
  
        // this.userFormGroup.reset();
      }
      )
  }
    
  deleteRestaurant(restaurantId:number) 
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

  updateRestaurant() 
  {
    let restuarantId = this.updateRestaurantFormGroup.get('restaurantId')?.value!;
    let restaurantName = this.updateRestaurantFormGroup.get('restaurantName')?.value!;

    //Sync data with backend
    this.restaurantService.updateRestaurant(Number(restuarantId), restaurantName).subscribe(result=>
      {
        this.response = result;
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        console.log(this.response);
        location.reload();
      }
    )
  }

  deleteDishFromRestaurant(restaurantId:number, dishId:number)
  {
    //Sync data with backend
    this.restaurantService.deleteDish(restaurantId, dishId).subscribe(result =>
      {
        this.response = result;
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        console.log(this.response);
        location.reload();
      }
    )
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

  deleteDish(dishId:number)
  {
    //Get the selected restaurant
    const restaurantObject = this.restaurantArray.find(obj => obj.restaurantId === this.selectedRestaurantId);
    this.mySelectedRestaurant = restaurantObject!;


    //Next, find the element in the dishes array then remove the selected dish
    let count = 0;

    for(var dish of this.mySelectedRestaurant.dishes )
    {
      if(dish.dishId === dishId)
      {
        //Now that we know where in the array the element is that needs to be deleted, we can easily splice it.
        // this.mySelectedRestaurant.dishes.splice(count, 1);

        //Unfortunately sending over the object isn't working so I have to send over the restaurant id and the dish id
        //Finally sync the data with the back end.
        this.deleteDishFromRestaurant(this.mySelectedRestaurant.restaurantId, count);

        break;
      }

      count ++;
    }
  }

  updateDish()
  {
    let dishId = this.updateDishFormGroup.get('dishId')?.value!;
    let dishName = this.updateDishFormGroup.get('dishName')?.value!;
    let dishCategory = this.updateDishFormGroup.get('dishCategory')?.value!;
    let cost = this.updateDishFormGroup.get('cost')?.value!;

    this.myDish.dishId = Number(dishId);
    this.myDish.dishName = dishName;
    this.myDish.dishCategory = dishCategory;
    this.myDish.cost = Number(cost);

    this.restaurantService.updateDish(this.selectedRestaurantId, this.myDish).subscribe(result =>
      {
        let response = result;
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        console.log(this.response);
        location.reload();
      }
      )
  }

  populateDish(dishId:number)
  {
    //Get the selected restaurant
    const restaurantObject = this.restaurantArray.find(obj => obj.restaurantId === this.selectedRestaurantId);
    this.mySelectedRestaurant = restaurantObject!;


    //Next, find the element in the dishes array then remove the selected dish
    let count = 0;

    for(var dish of this.mySelectedRestaurant.dishes )
    {
      if(dish.dishId === dishId)
      {
        this.myDish = dish;
        break;
      }

      count ++;
    }
  }

}