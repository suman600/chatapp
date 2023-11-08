import {Injectable, NgZone} from '@angular/core';
import {Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any;

  constructor(
    private auth:Auth,
    private router:Router,
    public ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth,(user:any)=>{
      if(user){
        console.log(this.userData);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  getAuthFromFire(){
    return this.auth.currentUser;
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

  logout() {
    signOut(this.auth).then(()=>this.router.navigate(['/login']))

  }
  googleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

   loginWithPopup(provider :any) {
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['/dashboard']);
    });
  }

}
