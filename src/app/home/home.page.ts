import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';

import { LoadingController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { format, parseISO } from 'date-fns';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { EditAirconModalPage } from '../modals/edit-aircon-modal/edit-aircon-modal.page';
import { flatMap } from 'rxjs/operators';
import { Console, error } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectTabs = 'temperature';
  statusTabs = 'room_status';
  defaultDay: string;
  acMode: string;

  rangeVal: number;
  fanVal: number
  fanValWord: string
  air_quality_message: string;

  aqNum: 10;
  aqNum10: 10;
  temp: any;
  humid: any;
  motionSens: number;
  carbonSens: number;

  current_temp: number;
  aircon: boolean = true;

  activeIndex: any;

  loadContent: boolean = false;

  city: string;
  weather: string;
  cityTemp: number;
  cityHumid: number;
  currentDayTab: any;
  acBrand: string;
  remoteModel: string;
  formattedTime: any;
  roomOccupancy: "Occupied";

  userSched: any[] = [];

  day_schedules = [];

  airconList = [];
  airconId: string;
  swing: boolean;

  hvac_alert_timeout: any;
  temp_change_timeout: any;

  aq_messages = {
    normal: [{ color: 'green', status: 'NORMAL' }],

    adequate: [{ color: 'yellow', status: 'ADEQUATE' }],

    unhealthy: [{ color: 'orange', status: 'UNHEALTHY' }],

    harmful: [{ color: 'red', status: 'HARMFUL' }],

    toxic: [{ color: 'purple', status: 'TOXIC' }],

    hazardous: [{ color: 'maroon', status: 'HAZARDOUS' }],
  };

  schedDays: Array<string> = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];

  smartSchedules = [];

  alertShown = false;

  

  @ViewChild('slide') slide: IonSlides;

  constructor(
    public platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private dataService: DataService,
    private firebaseService: FirebaseService,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastController: ToastController
  ) {
  

    this.acMode = "MODE_COOL"

    this.platform.ready().then(()=>{
      this.rangeVal = 17,
      this.fanVal = 1,
      this.defaultDay = "Mon"
    })

    // get the weather API
    this.dataService.getCurrentWeather()
    .then(data => {
      // console.log(data)
      this.city = data.name
      this.cityHumid = data.main.humidity
      this.cityTemp = parseInt(data.main.temp)
      this.weather = data.weather[0].description
      this.temp = parseInt(data.main.temp) - 3;
      this.humid = this.cityHumid - 3;
    })

    //Air Quality
    this.air_quality_message = "adequate"
  }

  ionViewDidEnter(){
    /* Calling the function `presentAlert()` */
    // this.presentAlert();
  }

  rangeFocused(event) {
    let fanValue = event.detail.value

    if( fanValue == 1){
      this.fanValWord = "LOW"
    }
    else if (fanValue == 2){
      this.fanValWord = "MID"
    }
    else if (fanValue == 3){
      this.fanValWord = "HIGH"
    }
  }

  async airQualityInfoPop() {
    const modal = await this.modalCtrl.create({
      component: AirQualityInfoPopPage,
      cssClass: 'medium-modal',
      componentProps: {
        pm2_5: this.aqNum,
        pm10: this.aqNum10,
      },
    });
    await modal.present();
  }

  airconMode(mode : any){
    this.acMode = mode
  }

  segmentSelected(day: string){
    this.smartSchedules = this.dataService.getSmartSchedule(day)
    
  }

  async toggleToast(aircon: any) {
    if (aircon == false) {
      var message = "Aircon turned on";
    } else {
      var message = "Aircon turned off";
    }
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    });

    await toast.present();
  }

  async presentAlert() {
    /* Checking if the alert is shown. If it is shown, it will return. */
    if(this.alertShown){
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Feel free to explore the ColdSmart App!',
      subHeader: '',
      message: 'This is application is for demonstration purposes only. <br>For use to improve the app, please leave a feedback.',
      buttons: ['OK'],
      backdropDismiss: false
    });
    
    await alert.present();

    this.alertShown = true;
  }

  settingsClick(id: number){
    console.log(id)
  }

  
}
