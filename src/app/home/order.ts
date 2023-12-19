import { LineItem } from "./lineItem";

export class Order 
{
    orderId:number = 0;
    orderDateAndTime:Date | undefined;
    orderTotal:number = 0;
    orderItems:LineItem[] = [];
}