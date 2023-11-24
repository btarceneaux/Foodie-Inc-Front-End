import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Address } from '../user/address';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit
{
  successEnabled: any;
  errorEnabled: any;

  ngOnInit(): void 
  {
    this.getAllUsers();
  }

  userArray:User[] = [];
  response:Response = new Response();
  myUser!: User;

  

  constructor(private userService: UserService, private router:Router)
  {

  }

  openModal(user:User)
  {
    this.myUser = user;
    const modalId = 'updateUserModal-' + user.userId;

    const modalDiv = document.getElementById(modalId);
    
    if(modalDiv != null)
    {
      modalDiv.style.display = 'block';
    }
  }

  closeModal()
  {
    const modalDiv = document.getElementById("updateUserModal");
    if(modalDiv != null)
    {
      modalDiv.style.display = 'none';
    }
  }

  getAllUsers() 
  {
    this.userService.getAllUsers().subscribe(result =>
      {
        this.userArray = result;
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        console.log("Finished Loading Users");
      }
      )
  }

  deleteUser(id:number)
  {
    if(id != null)
    {
      this.userService.deleteUser(String(id)).subscribe(result =>
      {
        console.log(result);
      },
      error =>
      {
        console.log(error);
      },
      () =>
      {
        location.reload();
        console.log("Finished Loading Information.");
      }
        )
    }
  }

  updateUser(userToUpdate:User) 
  {
    this.userService.shareUser(userToUpdate);
    this.router.navigate(['updateUserDetails']);
  }
}