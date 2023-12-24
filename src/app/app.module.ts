import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ManageRestaurantComponent } from './manage-restaurant/manage-restaurant.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    AdminComponent,
    HeaderAdminComponent,
    RestaurantComponent,
    ManageUsersComponent,
    UpdateUserComponent,
    ManageRestaurantComponent,
    CheckoutComponent,
    OrderPlacedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
