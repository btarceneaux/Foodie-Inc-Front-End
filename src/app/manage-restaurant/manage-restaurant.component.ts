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

  dishArray:Dish[] = [];
  restaurantArray:Restaurant[] = [];
  userFormGroup: any;
  selectedRestaurantId:number = 0;
  response:Response = new Response();
  myDish:Dish = new Dish('', '', 0);
  


  constructor(private restaurantService: RestaurantService, private router:Router, private sanitizer: DomSanitizer)
  {

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

  openModal() 
  {
    const modelDiv = document.getElementById('addDishModal');

    if(modelDiv != null)
    {
      modelDiv.style.display = 'block';
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

      //Add the pictures in the object.
      this.myDish.dishImages.push(fileHandle);
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

    for(var i = 0; i < dish.dishImages.length; i++)
    {
      formData.append
    (
      'imageFile',
      dish.dishImages[i].file,
      dish.dishImages[i].file.name
    );
    } 

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
        console.log("Incoming response status");
        console.log(this.response.status);
        if(this.response.status === 200)
        {
            // this.successEnabled = true;
            console.log("Everything worked");
            this.dishFormGroup.reset();
        }
        else
        {
            // this.errorEnabled = true;
            console.log("Uh oh! Something happened!");
        }
  
        // this.userFormGroup.reset();
      }
      )
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