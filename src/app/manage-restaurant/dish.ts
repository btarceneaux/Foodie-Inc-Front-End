import { FileHandle } from "./file-handle";

export class Dish
{
    dishId:number | null = null;
    dishName:string;
    dishCategory:string;
    cost:number;
    imageURL:string;

    constructor(dishName:string, dishCategory:string, cost:number, url:string)
    {
        this.dishName = dishName;
        this.dishCategory = dishCategory;
        this.cost = cost;
        this.imageURL = url;
    }

    setDishId(dishId:number)
    {
        this.dishId = dishId;
    }
}