import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    
  ){}

  unsubscribeOnLogOut(){
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  changeTemp(value){
    this.afs.collection("devices").doc("testing00").collection("commands").doc("command")
    .set({
      command: value
    })
  }

  changeMode(value){
    this.afs.collection("devices").doc("testing00").collection("commands").doc("command")
    .set({
      command:value
    })
  }

  switchPower(value){
    this.afs.collection("devices").doc("testing00").collection("commands").doc("command")
    .set({
      command:value
    })
  }

  async addSchedule(value, time){ // add schedule to the firebase
    let uid = await this.auth.getUid()
    this.afs.collection("devices").doc("testing00").collection("smart_schedule")
    .add({
      uid: uid,
      days: {...value.setDays},
      time: time,
      type: value.type,
      value: value.type == 'PREFERRED_TEMP' ? value.prefTemp : (value.type == 'POWER' ? value.switch : (value.type == 'MODE' ? value.airconMode : value.ecoMode)) 
    })
  }



  editSchedule(){
    //obviously
  }
  

}