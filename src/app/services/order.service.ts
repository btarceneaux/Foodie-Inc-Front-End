import { Injectable } from '@angular/core';
import { Order } from '../home/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService 
{
  order:Order | undefined;

  constructor(public http:HttpClient) { }

  baseurl = "http://localhost:9000/api/order-service";

  //We need to pull the order up on the confirmation page.
  setOrder(myOrder:Order)
  {
    this.order = myOrder;
  }

  getOrder()
  {
    return this.order;
  }

}
