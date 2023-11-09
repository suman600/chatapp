import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";
import {PageGuard} from "./guard/page.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren:()=> import('./router/login/login.module').then(m=>m.LoginModule),
  },
  {
    path: 'register',
    loadChildren:()=> import('./router/signup/signup.module').then(m=>m.SignupModule),
  },
  {
    path: 'dashboard',
    loadChildren:()=> import('./router/dashboard/dashboard.module').then(m=>m.DashboardModule),
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
