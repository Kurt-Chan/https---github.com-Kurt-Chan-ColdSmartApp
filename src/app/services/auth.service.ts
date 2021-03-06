import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {}

  isLoggedIn() {
    //checks if the user has logged in
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async getUid() {
    //get the currently logged in user
    const user = await this.isLoggedIn();
    if (user) {
      const uid = user.uid;
      return uid;
      //console.log(user.uid, user.email)
    } else {
      // do something else
    }
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }

  doLogout() {
    return new Promise<void>((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth
          .signOut()
          .then(() => {
            //this.firebaseservice.unsubscribeOnLogOut();
            console.log('Sign out successful');
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
  }
}
