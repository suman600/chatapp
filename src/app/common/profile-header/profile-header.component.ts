import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent {
  currentUser:any;

  constructor(private service:AuthService) {
    this.currentUser =  this.service.getAuthFromLocal();
  }

  logout(){
    this.service.logout();
  }
}
