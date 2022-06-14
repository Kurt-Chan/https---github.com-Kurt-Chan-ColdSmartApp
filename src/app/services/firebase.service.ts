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

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    
  ){}

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
      days: value.setDays,
      time: time,
      type: value.type,
      value: value.type == 'PREFERRED_TEMP' ? value.prefTemp : (value.type == 'POWER' ? value.switch : (value.type == 'MODE' ? value.airconMode : value.ecoMode)) 
    })
  }

  async addAircon(value){ // add schedule to the firebase
    let uid = await this.auth.getUid()
    this.afs.collection("devices", ref => ref.where("id", "==", value.id).where("password", "==", value.password)).snapshotChanges().subscribe((res) => {
      if(res.length == 1) {
        // the id and password is correct, set config and add uid on device
        this.afs.collection('devices').doc(value.id).collection('configs').doc('config').update({
          brand: value.brand,
          remote_model: value.remote_model,
          min_temp: value.min_temp,
          max_temp: value.max_temp
        });
        this.afs.collection('devices').doc(value.id).update({
          uid: uid
        })
      }
    });
  }

  editSchedule(){
    //obviously
  }

  deleteSchedule(schedId){
    this.afs.collection("devices").doc("testing00").collection("smart_schedule").doc(schedId).delete()
  }

  sendFeedback(value, uid){
    return this.afs.collection('messages').add({
      uid: uid,
      name: value.name,
      email: value.email,
      message: value.message
    })
  }
  
  setSwing(value){
    this.afs.collection("devices").doc("testing00").collection("commands").doc("command")
    .set({
      command:value
    })
  }


}