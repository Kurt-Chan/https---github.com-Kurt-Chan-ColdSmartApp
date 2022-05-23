import { Injectable } from "@angular/core";
import firebase from 'firebase/compat/app'
import { FirebaseService } from './firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { first } from 'rxjs/operators';
import { observable, Observable } from "rxjs";
import { runInThisContext } from "vm";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  aqNum: number

  constructor(
    private firebaseService: FirebaseService,
    private angularFire: AngularFirestore,
  ){}


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

  getCurrentAcSettings(){
    let path = this.angularFire.collection('devices').doc('testing00').valueChanges()
    return path
  }


}