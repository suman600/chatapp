import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileDashboardComponent} from "./profile-dashboard.component";



@NgModule({
  declarations: [ProfileDashboardComponent],
  imports: [
    CommonModule
  ],
  exports: [ProfileDashboardComponent]
})
export class ProfileDashboardModule { }
