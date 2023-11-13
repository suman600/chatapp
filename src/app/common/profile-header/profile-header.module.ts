import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileHeaderComponent} from "./profile-header.component";
import {UserModule} from "../user/user.module";



@NgModule({
  declarations: [ProfileHeaderComponent],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [ProfileHeaderComponent]
})
export class ProfileHeaderModule { }
