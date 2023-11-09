import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./sidebar.component";
import {ProfileModule} from "../profile/profile.module";



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    ProfileModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
