import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainViewComponent} from "./main-view.component";
import {ReceiverModule} from "../receiver/receiver.module";
import {SenderComponent} from "../sender/sender.component";



@NgModule({
  declarations: [MainViewComponent, SenderComponent],
  imports: [
    CommonModule,
    ReceiverModule
  ],
  exports: [MainViewComponent]
})
export class MainViewModule { }
