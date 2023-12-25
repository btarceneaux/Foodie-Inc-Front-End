import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailedOrder } from '../detailedOrder';
import { Orders } from '../Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService 
{
  order:DetailedOrder | undefined;

  constructor(public http:HttpClient) { }

  baseurl = "http://localhost:9000/api/order-service";

  //We need to pull the order up on the confirmation page.
  setOrder(myOrder:DetailedOrder)
  {
    this.order = myOrder;
  }

  getOrder()
  {
    return this.order;
  }

  placeOrder(myOrder:Orders)
  {
    let api = this.baseurl + "/order";
    return this.http.post<Response>(api, myOrder, {responseType:'json'});
  }

}
