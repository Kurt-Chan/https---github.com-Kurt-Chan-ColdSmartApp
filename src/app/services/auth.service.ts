import { Injectable } from "@angular/core";
import firebase from 'firebase/compat/app'
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
   
    public afAuth: AngularFireAuth
  ){}

  isLoggedIn() { //checks if the user has logged in
    return this.afAuth.authState.pipe(first()).toPromise();
 }

  async getUid() { //get the currently logged in user
    const user = await this.isLoggedIn()
    if (user) {
      const uid = user.uid
      return uid;
       //console.log(user.uid, user.email)
    } else {
      // do something else
   }
 }


  doRegister(value){
    return new Promise<any>((resolve, reject) => {
     this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
    this.afAuth.signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
    })
  }

  doLogout(){
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            //this.firebaseservice.unsubscribeOnLogOut();
            console.log("Sign out successful");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }



}