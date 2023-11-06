import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './router/login/login.component';
import { SignupComponent } from './router/signup/signup.component';
import { DashboardComponent } from './router/dashboard/dashboard.component';
import {AuthGuard} from "./guard/auth-gaurd";

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'register', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], pathMatch: 'full' },
  { path: '**', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
