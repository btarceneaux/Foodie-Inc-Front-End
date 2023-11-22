import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = 
[
  {path:"", component:LoginComponent},
  {path:"createUser", component:UserComponent},
  {path:"home", component:HomeComponent},
  {path:"admin", component:AdminComponent},
  {path:"addRestaurant", component:RestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
