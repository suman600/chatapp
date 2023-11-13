import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileDashboardModule} from "../../common/profile-dashboard/profile-dashboard.module";
import {UserModule} from "../../common/user/user.module";
import {ProfileHeaderModule} from "../../common/profile-header/profile-header.module";


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    ProfileDashboardModule,
    UserModule,
    ProfileHeaderModule
  ]
})
export class ProfileModule { }
