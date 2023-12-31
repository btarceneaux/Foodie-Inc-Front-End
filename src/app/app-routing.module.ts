import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ManageRestaurantComponent } from './manage-restaurant/manage-restaurant.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

const routes: Routes = 
[
  {path:"", component:LoginComponent},
  {path:"createUser", component:UserComponent},
  {path:"home", component:HomeComponent},
  {path:"admin", component:AdminComponent},
  {path:"addRestaurant", component:RestaurantComponent},
  {path:"manageRestaurants",component:ManageRestaurantComponent},
  {path:"manageUsers", component:ManageUsersComponent},
  {path:"updateUserDetails", component:UpdateUserComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"orderPlaced", component:OrderPlacedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
