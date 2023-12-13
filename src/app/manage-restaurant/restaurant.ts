import { Dish } from "./dish";

export class Restaurant
{
    restaurantId:number = 0;
    restaurantName:string;
    dishes:Dish[] = [];

    constructor(restaurantName:string)
    {
        this.restaurantName = restaurantName;
    }

    setRestaurantId(restaurantId:number)
    {
        this.restaurantId = restaurantId;
    }

    setDishes(dishArray:Dish[])
    {
        this.dishes = dishArray;
    }
}