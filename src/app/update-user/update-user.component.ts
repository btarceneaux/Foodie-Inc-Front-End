import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Address } from '../user/address';
import { User } from '../user/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit
{
  user:any;
  constructor(private userService: UserService, private router:Router){}
  
  ngOnInit(): void 
  {
    this.user = this.userService.getSharedUser();
  }
  
  response:Response = new Response();
  successEnabled: any;
  errorEnabled: any;

  userFormGroup = new FormGroup 
    (
      {
        userId: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        emailAddress: new FormControl(''),
        password: new FormControl(''),
        addressId: new FormControl(''),
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl('')
      }
    )
  
    updateUser() 
    {
      let userId = this.userFormGroup.get('userId')?.value!;
      let fName = this.userFormGroup.get('firstName')?.value!;
      let lName = this.userFormGroup.get('lastName')?.value!;
      let emailAddress = this.userFormGroup.get('emailAddress')?.value!;
      let password = this.userFormGroup.get('password')?.value!;
      let addressId = this.userFormGroup.get('addressId')?.value!;
      let street = this.userFormGroup.get('street')?.value!;
      let city = this.userFormGroup.get('city')?.value!;
      let state = this.userFormGroup.get('state')?.value!;
      let zipCode = this.userFormGroup.get('zipCode')?.value!;

      let address = new Address(street, city, state, zipCode);
      address.addressId = Number(addressId);

      let user = new User(fName, lName, emailAddress, password, address);
      user.userId = Number(userId);

      console.log("Updated user : " + user.firstName);

      this.userService.updateUser(user).subscribe(result=>
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
          this.router.navigate(["/manageUsers"])
          
        } 
        )
    }
}