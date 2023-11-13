import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingComponent} from "./setting.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [SettingComponent],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [SettingComponent]
})
export class SettingModule { }
