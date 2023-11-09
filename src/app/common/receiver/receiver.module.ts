import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReceiverComponent} from "./receiver.component";



@NgModule({
  declarations: [ReceiverComponent],
  imports: [
    CommonModule
  ],
  exports: [ReceiverComponent]
})
export class ReceiverModule { }
