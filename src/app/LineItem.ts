export class LineItem
{
    restaurantId:number;
    quantity:number;
    dishNumber:number;
    lineItemId:number | null = null;

    constructor(restaurantId:number, dishId:number, quantity:number)
    {
        this.restaurantId = restaurantId;
        this.dishNumber = dishId;
        this.quantity = quantity;
    }
}