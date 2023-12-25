import { LineItem } from "./LineItem";

export class Orders
{
    orderId:number | null = null;
    orderDateAndTime:Date | undefined;
    orderTotal:number = 0;
    orderItems:LineItem[] = [];
}