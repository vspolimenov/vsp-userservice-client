import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  userToken: string | null = null; // Store the user token here
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      console.log("loging problem...")
      if (user) {

        this.userData = user;
        if (user.emailVerified) {
          user.getIdToken().then(token => {
            console.log("luserrrr" + token)
            this.userToken = token;
          });
        }

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '{}');
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    });
  }
  checkAutoLogin() {
    console.log(this.userToken + "token");
    if (this.userToken) {
      // The user is authenticated. You can make authenticated requests to Firebase or your server.
      // Redirect to the dashboard or home page
      // Do something before delay

      this.router.navigate(['home']);
    } else {
      // The user needs to log in.
      // Redirect to the login page
      this.router.navigate(['login']);
    }
  }

  async SignUp(email: any, password: any){
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);

  }
  async getIdToken() {
    return this.userData ? await this.userData.getIdToken() : null;
  }
  // Login in with email/password
  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }
  // Recover password
  PasswordRecover(passwordResetEmail: any) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider: any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          localStorage.setItem("user", result?.user ? JSON.stringify(result?.user) : "{}");
            this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage

  // Store user in localStorage

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.userToken = null;
    });
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user !== null && user.email != null && user.emailVerified !== false;
  }
}
