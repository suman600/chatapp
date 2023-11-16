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
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }else {
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
        this.userData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
        this.addUserData(this.userData);
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
        this.addUserData(this.userData);
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
    return signInWithPopup(this.auth, provider).then((res:any) => {
      this.router.navigate(['/dashboard']);
      this.addUserData(res.user)
    });
  }

  addUserData(user:any){
    const userData: User = {
      useId: user.uid,
      userEmail: user.email,
      userName: user.displayName || '',
      userPhoto: user.photoURL || '',
      userEmailVerified: user.emailVerified || false,
      userIsAnonymous: user.isAnonymous || false
    }
    return userData;
  }
}
