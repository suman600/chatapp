import {Component, HostListener} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  showDropdown:boolean = false;
  loggedInUser:any = {};
  constructor(
    private authService:AuthService) {
    let userId = this.authService.getAuthFromLocal().userId;
    this.authService.getUserById(userId).subscribe(user=>{
      this.loggedInUser = user;
    });
  }
  showSetting(){
    this.showDropdown = !this.showDropdown
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:click', ['$event'])
  onClick(event: Event) {
    if (this.showDropdown && !(event.target as HTMLElement).closest('.setting')) {
      this.showDropdown = false;
    }
  }


}
