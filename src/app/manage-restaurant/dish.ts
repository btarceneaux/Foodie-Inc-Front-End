import { FileHandle } from "./file-handle";

export class Dish
{
    dishId:number = 0;
    dishName:string;
    dishCategory:string;
    cost:number;
    dishImages:FileHandle[] = [];

    constructor(dishName:string, dishCategory:string, cost:number)
    {
        this.dishName = dishName;
        this.dishCategory = dishCategory;
        this.cost = cost;
    }

    setDishId(dishId:number)
    {
        this.dishId = dishId;
    }
}