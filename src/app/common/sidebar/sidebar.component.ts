import {Component, OnInit} from '@angular/core';
import {User} from "../../modal/user";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  allUsers:User[] = []
  constructor(
    private service:AuthService
  ) {
  }

  ngOnInit() {
    this.service.getChatUsers().subscribe((res:any)=>{
      this.allUsers = res;
    })
  }
}
