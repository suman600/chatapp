import {Component, HostListener} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  showDropdown:boolean = false;

  constructor(
    private authService:AuthService) {
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
