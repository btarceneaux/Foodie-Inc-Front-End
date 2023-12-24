import { DetailedLineItem } from "./detailedLineItem";

export class DetailedOrder 
{
    orderId:number | null = null;
    orderDateAndTime:Date | undefined;
    orderTotal:number = 0;
    orderItems:DetailedLineItem[] = [];
}