import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../home/order';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit
{ 
  myOrder:Order | undefined;
  total:number = 0;

  constructor(private orderService:OrderService, private router:Router)
  {

  }

  ngOnInit(): void 
  {
    this.getOrder();

    for(var item of this.myOrder?.orderItems!)
    {
      this.total += (item.dish?.cost! * item.quantity)
    }
  }

  getOrder()
  {
    this.myOrder = this.orderService.getOrder();
  }

  deleteItem(i:number)
  {
    console.log(i);
    this.myOrder?.orderItems.splice(i, 1);
    
    for(var item of this.myOrder?.orderItems!)
    {
      this.total = this.total - (item.dish?.cost! * item.quantity);
    }

    this.total = Number(this.total.toFixed(2));
  }

}