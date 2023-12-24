import { Dish } from "../manage-restaurant/dish";

export class DetailedLineItem
{
    lineItemId:number | null = null;
    restaurantId:number = 0;
    quantity:number = 0;
    dish:Dish | undefined;

    constructor(restaurantId:number, quantity:number)
    {
        this.restaurantId = restaurantId;
        this.quantity = quantity;
    }
}