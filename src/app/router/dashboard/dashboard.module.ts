import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SidebarModule} from "../../common/sidebar/sidebar.module";
import {MainViewModule} from "../../common/main-view/main-view.module";
import {HeaderModule} from "../../common/header/header.module";
import {FooterModule} from "../../common/footer/footer.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    SidebarModule,
    MainViewModule,
    HeaderModule,
    FooterModule
  ]
})
export class DashboardModule { }
