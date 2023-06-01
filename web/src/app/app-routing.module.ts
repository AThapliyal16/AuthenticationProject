import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { UsersComponent } from './users/users.component';
const routes: Routes = [
  
  {path:'home', component: HomeComponent , canActivate:[AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path:'Edit-user/:id',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
