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
  @Output() chatIDEventEmitter:EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private service:AuthService
  ) {
  }

  ngOnInit() {
    this.service.getChatUsers().subscribe((res:any)=>{
      this.allUserFun(res);
      this.chatIDEventEmitter.emit(this.allUsers[0].userId);
    })
  }

  allUserFun(param: any): any {
    const authUserId = this.service.getAuthFromLocal().userId;
    const userIdSet = new Set([authUserId]);
    userIdSet.add(authUserId);
    const filteredArray = param.filter((item: any) => !userIdSet.has(item.userId));
    this.allUsers = [];
    this.allUsers.push(...filteredArray);
  }

  clickToChat(param:any, index:number){
    this.selectedItem = index;
    this.chatEventEmitter.emit(param.userId);
  }
}
