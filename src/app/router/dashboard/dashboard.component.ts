import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  userChats: any = {};
  chats: any[] = [];
  constructor(private auth: AuthService) {}

  user = {
    id: '',
    email:'',
    name: '',
   chat: [

   ]
  }

  ngOnInit() {
    this.auth.initChatData();
    // this.auth.checkChatExits(this.auth.getAuthFromLocal().userId);
  }
  getUserId(userId:any){
    this.auth.checkChatExits(userId);
    console.log(userId);
  }
}
