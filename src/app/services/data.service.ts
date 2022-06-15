import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  where,
  query,
  doc,
  docData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  aqNum: number;

  constructor(private firestore: Firestore) {}

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

  getCurrentWeather(deviceId: string) {
    // let path = this.angularFire
    //   .collection('devices')
    //   .doc('testing00')
    //   .collection('data')
    //   .doc('weather_api')
    //   .valueChanges();
    // return path;
    const weatherApiRef = doc(
      this.firestore,
      `/devices/${deviceId}/data/weather_api`
    );
    return docData(weatherApiRef, { idField: 'id' });
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
