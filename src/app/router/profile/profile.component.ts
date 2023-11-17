import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {User} from "../../modal/user";
import {catchError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  allUsers:User[] = [];

  constructor(private s:AuthService) {}

  ngOnInit() {
   this.getAllUser().then((res:any)=>{
      this.allUsers = res;
    }).catch(err=>{
     console.log(err);
   })
  }

  async getAllUser(){
    return await this.s.getChatUsers();
  }
}
