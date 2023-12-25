import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { DetailedOrder } from '../detailedOrder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Orders } from '../Orders';
import { LineItem } from 'app/LineItem';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit
{
  myOrder:DetailedOrder | undefined;
  total:number = 0;
  error:boolean = false;
  response:Response = new Response();

  constructor(private orderService:OrderService, private router:Router)
  {

  }

  orderFormGroup = new FormGroup
  (
    {
      firstName: new FormControl<string>('', [Validators.min(1), Validators.required]),
      lastName: new FormControl<string>('', [Validators.min(1), Validators.required]),
      address: new FormControl<string>('', [Validators.min(1), Validators.required]),
      city: new FormControl<string>('', [Validators.min(1), Validators.required]),
      state: new FormControl<string>(''),
      zip: new FormControl<string>('', [Validators.min(1), Validators.required]),
      nameOnCard: new FormControl<string>('', [Validators.min(1), Validators.required]),
      creditCardNumber: new FormControl<string>('', [Validators.min(1), Validators.required]),
      expiration: new FormControl<string>('', [Validators.min(1), Validators.required]),
      cvv: new FormControl<string>('', [Validators.min(1), Validators.required])
    }
  );

  states = [
  { name: 'Alabama', abbrev: 'AL' },
  { name: 'Alaska', abbrev: 'AK' },
  { name: 'Arizona', abbrev: 'AZ' },
  { name: 'Arkansas', abbrev: 'AR' },
  { name: 'California', abbrev: 'CA' },
  { name: 'Colorado', abbrev: 'CO' },
  { name: 'Connecticut', abbrev: 'CT' },
  { name: 'Delaware', abbrev: 'DE' },
  { name: 'Florida', abbrev: 'FL' },
  { name: 'Georgia', abbrev: 'GA' },
  { name: 'Hawaii', abbrev: 'HI' },
  { name: 'Idaho', abbrev: 'ID' },
  { name: 'Illinois', abbrev: 'IL' },
  { name: 'Indiana', abbrev: 'IN' },
  { name: 'Iowa', abbrev: 'IA' },
  { name: 'Kansas', abbrev: 'KS' },
  { name: 'Kentucky', abbrev: 'KY' },
  { name: 'Louisiana', abbrev: 'LA' },
  { name: 'Maine', abbrev: 'ME' },
  { name: 'Maryland', abbrev: 'MD' },
  { name: 'Massachusetts', abbrev: 'MA' },
  { name: 'Michigan', abbrev: 'MI' },
  { name: 'Minnesota', abbrev: 'MN' },
  { name: 'Mississippi', abbrev: 'MS' },
  { name: 'Missouri', abbrev: 'MO' },
  { name: 'Montana', abbrev: 'MT' },
  { name: 'Nebraska', abbrev: 'NE' },
  { name: 'Nevada', abbrev: 'NV' },
  { name: 'New Hampshire', abbrev: 'NH' },
  { name: 'New Jersey', abbrev: 'NJ' },
  { name: 'New Mexico', abbrev: 'NM' },
  { name: 'New York', abbrev: 'NY' },
  { name: 'North Carolina', abbrev: 'NC' },
  { name: 'North Dakota', abbrev: 'ND' },
  { name: 'Ohio', abbrev: 'OH' },
  { name: 'Oklahoma', abbrev: 'OK' },
  { name: 'Oregon', abbrev: 'OR' },
  { name: 'Pennsylvania', abbrev: 'PA' },
  { name: 'Rhode Island', abbrev: 'RI' },
  { name: 'South Carolina', abbrev: 'SC' },
  { name: 'South Dakota', abbrev: 'SD' },
  { name: 'Tennessee', abbrev: 'TN' },
  { name: 'Texas', abbrev: 'TX' },
  { name: 'Utah', abbrev: 'UT' },
  { name: 'Vermont', abbrev: 'VT' },
  { name: 'Virginia', abbrev: 'VA' },
  { name: 'Washington', abbrev: 'WA' },
  { name: 'West Virginia', abbrev: 'WV' },
  { name: 'Wisconsin', abbrev: 'WI' },
  { name: 'Wyoming', abbrev: 'WY' }
];

  placeOrder()
  {
    let firstName = this.orderFormGroup.get('firstName')?.value!;
    let lastName = this.orderFormGroup.get('lastName')?.value!;
    let address = this.orderFormGroup.get('address')?.value!;
    let city = this.orderFormGroup.get('city')?.value!;
    let state = this.orderFormGroup.get('state')?.value!;
    let zip = this.orderFormGroup.get('zip')?.value!;
    let nameOnCard = this.orderFormGroup.get('nameOnCard')?.value!;
    let creditCardNumber = this.orderFormGroup.get('creditCardNumber')?.value!;
    let expiration = this.orderFormGroup.get('expiration')?.value!;
    let cvv = this.orderFormGroup.get('cvv')?.value!;

    let tempOrder = new Orders();

    tempOrder.orderTotal = this.myOrder?.orderTotal!;

    for(var item of this.myOrder?.orderItems!)
    {
      let restaurantId = item.restaurantId;
      let quantity = item.quantity;
      let myDishId = item.dish?.dishId!;

      //Construct an item
      let myItem = new LineItem(restaurantId, myDishId, quantity);

      tempOrder.orderItems.push(myItem);
    }
    
    this.orderService.placeOrder(tempOrder!).subscribe(result =>
      {
        this.response = result;
      },
      error =>
      {
        console.log(error);
      },
      ()=>
      {
        this.router.navigate(['orderPlaced']);
      }
      )
    
  }

  ngOnInit(): void 
  {
    this.getOrder();

    for(var item of this.myOrder?.orderItems!)
    {
      this.total += (item.dish?.cost! * item.quantity)
    }

    this.total = Number(this.total.toFixed(2));
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