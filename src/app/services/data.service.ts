import { Injectable } from "@angular/core";
import firebase from 'firebase/compat/app'
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  aqNum: number

  constructor(
    private firebaseService: FirebaseService,
    private angularFire: AngularFirestore,
    private auth: AuthService,
  ){}

  getAirconList(){
    let path = this.angularFire.collection("devices").valueChanges()
   return path
  }

  getOwnAirconList(uid: string){
    let path = this.angularFire.collection("devices" , ref => ref.where('uid', '==', uid)).valueChanges();
   return path
  }

  getSelectedAircon(deviceId){
   let path = this.angularFire.collection("devices").doc(deviceId).valueChanges()
   return path
  }

  getSelectedAirconInfo(){
    let path = this.angularFire.collection("devices").doc("testing00").collection('configs').doc('config').valueChanges()
    return path
   }


  getAirQualityStat(){
      let path = this.angularFire.collection('devices').doc('testing00').collection('data').doc('sds011').valueChanges()
      return path
  }


  getTempAndHumidityStat(){
    let path = this.angularFire.collection('devices').doc('testing00').collection('data').doc('dht11').valueChanges()
      return path
  }

  getMotionSensor(){
    let path = this.angularFire.collection('devices').doc('testing00').collection('data').doc('hc_sr501').valueChanges()
    return path
  }

  getCarbonSensor(){
    let path = this.angularFire.collection('devices').doc('testing00').collection('data').doc('ccs811').valueChanges()
    return path
  }

  getCurrentWeather(){
    let path = this.angularFire.collection('devices').doc('testing00').collection('data').doc('weather_api').valueChanges()
    return path
  }

  getCurrentAcSettings(airconId){
    let path = this.angularFire.collection('devices').doc(airconId).valueChanges()
    return path
  }

  getAirconData(airconId){
    let path = this.angularFire.collection('devices').doc(airconId).collection('configs').doc('config').valueChanges()
    return path
  }

   getSchedule(){
    // let uid = await this.auth.getUid()
   let path = this.angularFire.collection("devices").doc("testing00").collection("smart_schedule").valueChanges({idField: 'schedId'})
   return path
  }

  getSelectedSchedule(schedId){
    let path = this.angularFire.collection("devices").doc("testing00").collection("smart_schedule").doc(schedId).valueChanges()
   return path
  }


}