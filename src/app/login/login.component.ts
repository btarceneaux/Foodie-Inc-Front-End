import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  constructor(public router:Router, private service:UserService){}

  ngOnInit(): void 
  {
  }

  loginFormGroup = new FormGroup
  (
    {
      emailAddress: new FormControl(''),
      password: new FormControl('')
    }
  );

  response:Response = new Response();

  successEnabled: boolean = false;
  errorEnabled: boolean = false;
  valueErrorEnabled: boolean = false;


loginUser()
{
  console.log('Inside the login user function');
  let email = this.loginFormGroup.get('emailAddress')?.value!;
  let password = this.loginFormGroup.get('password')?.value!;

  if((email.length > 0) &&
    (password.length > 0))
    {
      this.service.loginUser(email, password).subscribe(result=>
        {
            this.response = result;
            console.log(this.response);
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
                
                if(email === 'admin@foodie.inc')
                {
                  console.log('Inside the admin section');
                  this.router.navigate(['admin']);
                }
                else
                {
                  console.log('Outside the admin section')
                  this.router.navigate(['home']);
                }
            }
            else
            {
                this.errorEnabled = true;
            }

            this.loginFormGroup.reset();
        }
        )
     }
     else
     {
      this.valueErrorEnabled = true;
     }
    }
}