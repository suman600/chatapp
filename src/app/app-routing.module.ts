import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guard/auth-gaurd";

const routes: Routes = [
  {
    path: 'login',
    loadChildren:()=> import('./router/login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'register',
    loadChildren:()=> import('./router/signup/signup.module').then(m=>m.SignupModule)
  },
  {
    path: 'dashboard',
    loadChildren:()=> import('./router/dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:[AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
