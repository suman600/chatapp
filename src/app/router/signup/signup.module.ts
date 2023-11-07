import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupComponent} from "./signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SignupRoutingModule} from "./signup-routing.module";

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
