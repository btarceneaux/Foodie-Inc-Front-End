import { LineItem } from "./lineItem";

export class Order 
{
    orderId:number | null = null;
    orderDateAndTime:Date | undefined;
    orderTotal:number = 0;
    orderItems:LineItem[] = [];
}