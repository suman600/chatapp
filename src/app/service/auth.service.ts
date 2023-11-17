import {Injectable, NgZone} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from "../modal/user";
import {HttpClient} from "@angular/common/http";
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:User = {
    userId:'',
    userName:'',
    userEmail:'',
    userPhoneNumber:'',
    userPhotoUrl:'',
    userEmailVerified:false,
    userPhoneVerified:false,
    userIsAnonymous:false
  }


  constructor(
    private auth:Auth,
    private router:Router,
    public ngZone: NgZone,
    private http: HttpClient,
    public firestore: Firestore
  ) {
    onAuthStateChanged(this.auth,(user:any)=>{
      if(user){
        this.userData.userId = user.uid || '';
        this.userData.userName =  user.displayName ||'';
        this.userData.userEmail = user.email || '';
        this.userData.userPhoneNumber = user.phoneNumber || '';
        this.userData.userPhotoUrl = user.photoURL || '';
        this.userData.userEmailVerified = user.emailVerified || false;
        this.userData.userPhoneVerified = user.userPhoneVerified || false;
        this.userData.userIsAnonymous = user.isAnonymous || false;

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  getAuthFromLocal(){
    const token = localStorage.getItem('user')
    return JSON.parse(token as string);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null;
  }

  register(email : string, password : string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.userData.userId = result.user.uid || '';
        this.userData.userName =  result.user.displayName ||'';
        this.userData.userEmail = result.user.email || '';
        this.userData.userPhoneNumber = result.user.phoneNumber || '';
        this.userData.userPhotoUrl = result.user.photoURL || '';
        this.userData.userEmailVerified = result.user.emailVerified || false;
        this.userData.userPhoneVerified = false;
        this.userData.userIsAnonymous = result.user.isAnonymous || false;
        this.addChatUser(this.userData);
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email : string, password : string){
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.userData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout() {
    signOut(this.auth).then(()=>this.router.navigate(['/login']))
  }

  googleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

  loginWithPopup(provider :any) {
    return signInWithPopup(this.auth, provider).then((result:any) => {
      if (result){
        this.addChatUser(result.user);
        this.router.navigate(['/dashboard']);
      }
      return false
    });
  }

  async getChatUsers() {
    return(
      await getDocs(query(collection(this.firestore, 'chat-user')))
    ).docs.map((user) => user.data())
  }
  // getChatUsers(collection: string): Observable<any[]> {
  //   return this.firestore.collection(collection).valueChanges();
  // }

  async addChatUser(param:User) {
    const docRef =
      await addDoc(collection(this.firestore, 'chat-user'), {
        // userId: param.userId,
        // userName: param.userName,
        // userEmail: param.userEmail,
        // userPhoneNumber: param.userPhoneNumber,
        // userPhotoUrl: param.userPhotoUrl,
        // userEmailVerified:param.userEmailVerified,
        // userPhoneVerified:param.userPhoneVerified,
        // userIsAnonymous:param.userIsAnonymous
    });
    console.log("Document written with ID: ", docRef.id);
  }

}
