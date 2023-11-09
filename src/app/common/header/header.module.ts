import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {SettingModule} from "../setting/setting.module";
import {UserModule} from "../user/user.module";



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SettingModule,
    UserModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
