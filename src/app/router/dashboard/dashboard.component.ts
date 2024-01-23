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
  currentUserId:string='';

  constructor(private auth: AuthService) {
  }

  user = {
    id: '',
    email:'',
    name: '',
   chat: [
   ]
  }

  ngOnInit() {
    debugger
    this.auth.initChatData();
  }
  getUserId(userId:any){
    this.currentUserId = userId;
    this.auth.checkChatExits(userId);
  }
  getFirstId(userId:any){
    this.currentUserId  = userId;
  }
}
