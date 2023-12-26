import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './user';
import { Address } from './address';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit
{
  constructor(public router:Router, private service:UserService) {}

  ngOnInit(): void 
  {
    console.log("In CustomerComponent");
  }

  response:Response = new Response();

  successEnabled: any;
  errorEnabled: any;
  valueErrorEnabled: boolean = false;

  userFormGroup = new FormGroup
  (
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      emailAddress: new FormControl(''),
      password: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl('')
    }
  )

  createUser() 
  {
    let fName = this.userFormGroup.get('firstName')?.value!;
    let lName = this.userFormGroup.get('lastName')?.value!;
    let emailAddress = this.userFormGroup.get('emailAddress')?.value!;
    let password = this.userFormGroup.get('password')?.value!;
    let street = this.userFormGroup.get('street')?.value!;
    let city = this.userFormGroup.get('city')?.value!;
    let state = this.userFormGroup.get('state')?.value!;
    let zipCode = this.userFormGroup.get('zipCode')?.value!;

    let address = new Address(street, city, state, zipCode);
    let user = new User(fName, lName, emailAddress, password, address);

    if((fName.length > 0) &&
    (lName.length > 0) &&
    (emailAddress.length > 0) &&
    (password.length > 0) &&
    (street.length > 0) &&
    (state.length > 0) &&
    (zipCode.length > 0))
    {
      this.service.createUser(user).subscribe(result=>
        {
          this.response = result;
        },
        error=>
        {
          console.log(error);
        },
        ()=>
        {
          console.log("Incoming response status");
          console.log(this.response.status);
          if(this.response.status === 200)
          {
              this.successEnabled = true;
          }
          else
          {
              this.errorEnabled = true;
          }
  
          this.userFormGroup.reset();
          if(user.emailAddress = "admin@foodie.inc")
          {
            this.router.navigate(["/"]);
          }
          else
          {
            this.router.navigate(["/home"]);
          }
        } 
        )
    }
    else
    {
      this.valueErrorEnabled = true;
    }
  }
}