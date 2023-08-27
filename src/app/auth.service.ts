import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { UserService } from './user.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userObj = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) {
    //onAuthStateChanged()
  }

  logIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.userObj = result.user;
        console.log('user', this.userObj);
        this.user.saveUser(this.userObj);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        let returnUrl = localStorage.getItem('returnUrl');
        returnUrl
          ? this.router.navigateByUrl(returnUrl)
          : this.router.navigate(['home']);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.userObj = {};
        this.router.navigate(['home']);
        localStorage.setItem('returnUrl', '/');
      })
      .catch((error) => {
        // An error happened.
      });
  }
}
