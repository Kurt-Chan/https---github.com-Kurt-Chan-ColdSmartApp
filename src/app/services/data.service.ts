import { Injectable } from '@angular/core';
import {collection,Firestore,collectionData,where,query,doc,docData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class DataService {
  aqNum: number;

  schedules: any = {
    'Mon':[{
      id: 1,
      time: "10:00 PM",
      type: "MODE",
      value: "COOL"
    },
    {
      id: 2,
      time: "12:00 AM",
      type: "MODE",
      value: "DRY"
    }],
    'Tue':[{
      id: 1,
      time: "8:45 PM",
      type: "MODE",
      value: "AUTO"
    },
    {
      id: 2,
      time: "1:30 AM",
      type: "MODE",
      value: "FAN"
    }],
    'Wed':[{
      id: 1,
      time: "10:35 PM",
      type: "MODE",
      value: "DRY"
    }],
    'Thu':[{
      id: 1,
      time: "3:15 AM",
      type: "MODE",
      value: "DRY"
    },
    {
      id: 2,
      time: "11:45 AM",
      type: "MODE",
      value: "FAN"
    }],
    'Fri':[{
      id: 1,
      time: "4:00 AM",
      type: "MODE",
      value: "COOL"
    }],
    'Sat':[{
      id: 1,
      time: "12:30 PM",
      type: "MODE",
      value: "DRY"
    },
    {
      id: 2,
      time: "6:50 AM",
      type: "MODE",
      value: "AUTO"
    }],
    'Sun':[{
      id: 1,
      time: "9:55 PM",
      type: "MODE",
      value: "FAN"
    }],
  }

  
  constructor(private firestore: Firestore) {}
  
  getSmartSchedule(day: string){
    const getSched = this.schedules;

    if(day == 'Mon'){
      return getSched['Mon']
    }
    else if(day == 'Tue'){
      return getSched['Tue']
    }
    else if(day == 'Wed'){
      return getSched['Wed']
    }
    else if(day == 'Thu'){
      return getSched['Thu']
    }
    else if(day == 'Fri'){
      return getSched['Fri']
    }
    else if(day == 'Sat'){
      return getSched['Sat']
    }
    else if(day == 'Sun'){
      return getSched['Sun']
    }
  }


  getAirconList() {
    //   let path = this.angularFire.collection('devices').valueChanges();
    //   return path;
    const devicesRef = collection(this.firestore, 'devices');
    return collectionData(devicesRef, { idField: 'id' });
  }

  getOwnAirconList(uid: string) {
    // let path = this.angularFire
    //   .collection('devices', (ref) => ref.where('uid', '==', uid))
    //   .valueChanges();
    // return path;
    const devicesCollectionRef = collection(this.firestore, 'devices');
    const q = query(devicesCollectionRef, where('uid', '==', uid));
    return collectionData(devicesCollectionRef, { idField: 'id' });
  }

  getSelectedAircon(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc(deviceId)
    //   .valueChanges();
    // return path;
    const selectedAirconRef = doc(this.firestore, `/devices/${deviceId}`);
    return docData(selectedAirconRef, { idField: 'id' });
  }

  getSelectedAirconInfo(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('configs')
    //   .doc('config')
    //   .valueChanges();
    // return path;
    const selectedAirconRef = doc(
      this.firestore,
      `/devices/${deviceId}/configs/config`
    );
    return docData(selectedAirconRef, { idField: 'id' });
  }

  getAirQualityStat(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('sds011')
    //   .valueChanges();
    // return path;
    const airQualityRef = doc(
      this.firestore,
      `/devices/${deviceId}/data/sds011`
    );
    return docData(airQualityRef, { idField: 'id' });
  }

  getTempAndHumidityStat(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('dht11')
    //   .valueChanges();
    // return path;
    const tempHumidRef = doc(this.firestore, `/devices/${deviceId}/data/dht11`);
    return docData(tempHumidRef, { idField: 'id' });
  }

  getMotionSensor(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('hc_sr501')
    //   .valueChanges();
    // return path;
    const motionSensorRef = doc(
      this.firestore,
      `/devices/${deviceId}/data/hc_sr501`
    );
    return docData(motionSensorRef, { idField: 'id' });
  }

  getCarbonSensor(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('ccs811')
    //   .valueChanges();
    // return path;
    const carbonSensorRef = doc(
      this.firestore,
      `/devices/${deviceId}/data/ccs811`
    );
    return docData(carbonSensorRef, { idField: 'id' });
  }

  getCurrentWeather(){
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('weather_api')
    //   .valueChanges();
    // return path;
    // const weatherApiRef = doc(
    //   this.firestore,
    //   `/devices/${deviceId}/data/weather_api`
    // );
    // return docData(weatherApiRef, { idField: 'id' });
    const getCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?lat=17.6132&lon=121.7270&appid=29153b3fe5c6f5d991a1766efe37abaa&units=metric"
    let weather = fetch(getCurrentWeather).then(res=> res.json())
    return weather
  }

  getCurrentAcSettings(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc(airconId)
    //   .valueChanges();
    // return path;
    const currentAcSettingRef = doc(this.firestore, `/devices/${deviceId}`);
    return docData(currentAcSettingRef, { idField: 'id' });
  }

  getAirconData(deviceId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc(airconId)
    //   .collection('configs')
    //   .doc('config')
    //   .valueChanges();
    // return path;
    const airconConfigRef = doc(
      this.firestore,
      `/devices/${deviceId}/configs/config`
    );
    return docData(airconConfigRef, { idField: 'id' });
  }

  getSchedule(deviceId) {
    // let uid = await this.auth.getUid()
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('smart_schedule')
    //   .valueChanges({ idField: 'schedId' });
    // return path;

    const schedulesRef = collection(
      this.firestore,
      `/devices/${deviceId}/smart_schedule`
    );
    return collectionData(schedulesRef, { idField: 'id' });
  }

  getSelectedSchedule(deviceId, schedId) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('smart_schedule')
    //   .doc(schedId)
    //   .valueChanges();
    // return path;
    const schedulesRef = doc(
      this.firestore,
      `/devices/${deviceId}/smart_schedule/${schedId}`
    );
    return docData(schedulesRef, { idField: 'id' });
  }
}
