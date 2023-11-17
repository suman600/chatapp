import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  currentUser:any;

  constructor(private service:AuthService) {
    this.currentUser =  this.service.getAuthFromLocal();
  }
}
