import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  allUsers:any = [];
  selectedItem:number = 0;
  @Output() chatEventEmitter:EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private service:AuthService
  ) {
  }

  ngOnInit() {
    this.service.getChatUsers().subscribe((res:any)=>{
      this.allUserFun(res);
    })
  }

  allUserFun(param:any):any{
    param.forEach((item:any)=>{
      if (item.userId !== this.service.getAuthFromLocal().userId){
        this.allUsers.push(item);
      }
    })
  }

  clickToChat(param:any, index:number){
    this.selectedItem = index;
    this.chatEventEmitter.emit(param.userId);
  }
}
