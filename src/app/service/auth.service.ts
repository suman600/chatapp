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
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:User = {
    userName:'',
    userEmail:'',
    userPhoneNumber:'',
    userPhotoUrl:'',
    userEmailVerified:false,
    userPhoneVerified:false,
    userIsAnonymous:false
  }

  private dataCollection: AngularFirestoreCollection<any>;


  constructor(
    private auth:Auth,
    private router:Router,
    public ngZone: NgZone,
    public firestore: AngularFirestore,
  ) {
    onAuthStateChanged(this.auth,(user:any)=>{
      let setStorage = {};
      if(user){
        this.userData.userName =  user.displayName ||'';
        this.userData.userEmail = user.email || '';
        this.userData.userPhoneNumber = user.phoneNumber || '';
        this.userData.userPhotoUrl = user.photoURL || '';
        this.userData.userEmailVerified = user.emailVerified || false;
        this.userData.userPhoneVerified = user.userPhoneVerified || false;
        this.userData.userIsAnonymous = user.isAnonymous || false;
        setStorage = {userId: user.uid, ...this.userData}
        localStorage.setItem('user', JSON.stringify(setStorage));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })

    this.dataCollection = this.firestore.collection('chat-users');
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
        if(result){
          this.addChatUser(result.user.uid, this.userData);
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          });
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  login(email : string, password : string){
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        if (result){
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          });
        }
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
        this.addChatUser(result.user.userId, this.userData);
        this.router.navigate(['/dashboard']);
      }
      return false
    });
  }

  getChatUsers(){
    console.log(this.auth.currentUser)
    return this.dataCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addChatUser(customId: string, data: any): Promise<void> {
    return this.dataCollection.doc(customId).set(data);
  }

}
