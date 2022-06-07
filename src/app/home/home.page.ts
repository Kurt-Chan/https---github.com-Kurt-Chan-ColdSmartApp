import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { LoadingController, AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service'
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { format, parseISO } from 'date-fns';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { EditAirconModalPage } from '../modals/edit-aircon-modal/edit-aircon-modal.page';
import { flatMap } from 'rxjs/operators';



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
  air_quality_message: string;

  aqNum: number;
  aqNum10: number;
  temp: any;
  humid: any;
  motionSens: number;
  carbonSens: number;

  current_temp: number
  aircon: boolean;

  activeIndex: any

  loadContent: boolean = false;

  city: string;
  weather: string;
  cityTemp: number;
  cityHumid: number;
  currentDayTab: any;
  acBrand: string;
  minTemp: number;
  maxTemp: number;
  remoteModel: string;
  formattedTime: any;
  roomOccupancy: string;

  userSched:any[] = [];

  day_schedules = [];

  airconList = []
  airconId: string;
  swing: boolean;
   
  hvac_alert_timeout: any;

  aq_messages = {
    'normal' :[
      {color: "green", status: "NORMAL"}
    ],

    'adequate' :[
      {color: "yellow", status: "ADEQUATE"}
    ],

    'unhealthy' :[
      {color: "orange", status: "UNHEALTHY"}
    ],

    'harmful' :[
      {color: "red", status: "HARMFUL"}
    ],

    'toxic' :[
      {color: "purple", status: "TOXIC"}
    ],

    'hazardous' :[
      {color: "maroon", status: "HAZARDOUS"}
    ],

  };

  schedDays: Array<string> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]



  @ViewChild('slide') slide: IonSlides;
  

  constructor(
    public platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private dataService: DataService,
    private firebaseService: FirebaseService,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

/* Getting the current temperature setting from the database. */
    // let acTemp = this.dataService.getCurrentAcSettings()
    // acTemp.subscribe((result: any)=>{
    //   this.platform.ready().then(()=>{
    //     this.rangeVal = result.temp_setting;
    //     this.current_temp = result.temp_setting;
    //   })  
    // })

    this.defaultDay = this.schedDays[0];
  }

   async ngOnInit(){ 

    let airconList = this.dataService.getOwnAirconList(await this.auth.getUid())
    airconList.subscribe((res:any) =>{
      // console.log(res)
      // if(res[0].uid == uid){
         this.airconList = res
         res.forEach(e => {
           this.airconId = e.id
           
         })
      //   console.log(res[0].uid)
      // }
    
      let selectedAircon = this.dataService.getSelectedAircon(this.airconId)
      selectedAircon.subscribe((ac:any)=>{
        
        let acData = this.dataService.getAirconData(this.airconId)
        acData.subscribe((result: any)=>{
          this.acBrand = result.brand.toUpperCase()
          this.minTemp = result.min_temp
          this.maxTemp = result.max_temp
        })

        let acTemp = this.dataService.getCurrentAcSettings(this.airconId)
        acTemp.subscribe((result: any)=>{
          this.platform.ready().then(()=>{
            this.rangeVal = result.temp_setting;
            this.current_temp = result.temp_setting;
          })  
        })

        let switchRef = this.dataService.getCurrentAcSettings(this.airconId)
        switchRef.subscribe((result: any)=>{
      /* Getting the current AC mode from the database. */
      let acMode = result.mode 
      if(acMode == "COOL"){
        this.acMode = "MODE_COOL"
      }
      else if(acMode == "FAN"){
        this.acMode = "MODE_FAN"
      }
      else if(acMode == "AUTO"){
        this.acMode = "MODE_AUTO"
      }

    let swingSwitch = result.swing
    if(swingSwitch == "ON"){
      this.swing = true
    }
    else if(swingSwitch == "OFF"){
      this.swing = false
    }
      

      /* Getting the current AC power status from the database. */
      let acPower = result.power 
      // console.log(acPower)
      if(acPower == "ON"){
        this.aircon = true
      }
      else if(acPower == "OFF"){
        this.aircon = false
      }

      /* Getting the current room occupancy status from the database. */
      let acOccupancy = result.occupied
      if(acOccupancy == true){
        this.roomOccupancy = "Occupied"
      }
      else if(acOccupancy == false){
        this.roomOccupancy = "Vacant"
        console.log('alert')
        clearTimeout(this.hvac_alert_timeout)
        this.hvac_alert_timeout = setTimeout(()=> this.occupancyAlert(), 1000);
        // this.occupancyAlert()
      }
    })
        
    })
      
    })

    /* This is getting the schedule from the database. */
    let schedRef = this.dataService.getSchedule()
      schedRef.subscribe((result: any)=>{
       this.userSched = result;
      })
      
    /* Getting the current AC settings from the database. */
    

      /* This is getting the air quality status from the database. */
      let aqRef = this.dataService.getAirQualityStat()
      aqRef.subscribe((result)=>{

        this.aqNum = result.aqi2_5;
        this.aqNum10 = result.aqi10
        var lastUpdate = result.last_updated;

        if(this.aqNum > this.aqNum10){
          // console.log(this.aqNum)
          if(this.aqNum >=0 && this.aqNum <=50){
            this.air_quality_message = "normal";

          }
          else if (this.aqNum >=51 && this.aqNum <=100){
            this.air_quality_message = "adequate";
          }
          else if (this.aqNum >=101 && this.aqNum <=150){
            this.air_quality_message = "unhealthy";
            this.presentAlert(this.air_quality_message)
          }
          else if (this.aqNum >=151 && this.aqNum <=200){
            this.air_quality_message = "harmful";
            this.presentAlert(this.air_quality_message)
          }
          else if (this.aqNum >=201 && this.aqNum <=300){
            this.air_quality_message = "toxic";
            this.presentAlert(this.air_quality_message)
          }
          else if (this.aqNum >=301 && this.aqNum <=500){
            this.air_quality_message = "hazardous";
            this.presentAlert(this.air_quality_message)
          }
        }
        else if(this.aqNum10 > this.aqNum){
          // console.log(this.aqNum10)
          if(this.aqNum10 >=0 && this.aqNum10 <=50){
            this.air_quality_message = "normal";
          }
          else if (this.aqNum10 >=51 && this.aqNum10 <=100){
            this.air_quality_message = "adequate";
          }
          else if (this.aqNum10 >=101 && this.aqNum10 <=150){
            this.air_quality_message = "unhealthy";
            this.presentAlert(this.air_quality_message);
            
          }
          else if (this.aqNum10 >=151 && this.aqNum10 <=200){
            this.air_quality_message = "harmful";
            this.presentAlert(this.air_quality_message)
          }
          else if (this.aqNum10 >=201 && this.aqNum10 <=300){
            this.air_quality_message = "toxic";
            this.presentAlert(this.air_quality_message)
          }
          else if (this.aqNum10 >=301 && this.aqNum10 <=500){
            this.air_quality_message = "hazardous";
            this.presentAlert(this.air_quality_message)
          }
        }
      })

      /* This is getting the temperature and humidity status from the database. */
      let tempHumidRef = this.dataService.getTempAndHumidityStat()
      tempHumidRef.subscribe((result)=>{
        this.temp = result.temperature
        this.humid = result.humidity
      })

      /* This is getting the current weather from the database. */
      let weatherRef = this.dataService.getCurrentWeather()
      weatherRef.subscribe((result)=>{
        this.city = result.name + ", " + result.sys.country
        this.weather = result.weather[0].description.toUpperCase()
        this.cityTemp = Math.round(result.main.temp - 273.15)
        this.cityHumid = result.main.humidity
      })
     
    
  }


  async segmentSelected(item: string, index: number){
    // console.log(item, index)
    let uid = await this.auth.getUid()
    this.slide.slideTo(index)
    this.day_schedules = [];
    this.userSched.forEach(i => {
      if(i.uid == uid){
        for (const k in i.days) {
          if(i.days[k] == item ) {
            this.day_schedules.push(i);
          }
        }
      }
    });
  }

  ionSlidesDidLoad(){
    // setTimeout(() => {
      this.slide.getActiveIndex().then( index =>{
        // console.log(index)
        if(index == 0){
          this.currentDayTab='Monday'
        }
        else if(index == 1){
          this.currentDayTab='Tuesday'
        }
        else if(index == 2){
          this.currentDayTab='Wednesday'
        }
        else if(index == 3){
          this.currentDayTab='Thursday'
        }
        else if(index == 4){
          this.currentDayTab='Friday'
        }
        else if(index == 5){
          this.currentDayTab='Saturday'
        }
        else if(index == 6){
          this.currentDayTab='Sunday'
        }
        this.segmentSelected(this.currentDayTab, index)
        this.loadContent = true
      })
    // }, 200);

  }
  
  ionSlideDidChange(){
    this.slide.getActiveIndex().then( index =>{
      // console.log(index)
      if(index == 0){
        this.currentDayTab='Monday'
      }
      else if(index == 1){
        this.currentDayTab='Tuesday'
      }
      else if(index == 2){
        this.currentDayTab='Wednesday'
      }
      else if(index == 3){
        this.currentDayTab='Thursday'
      }
      else if(index == 4){
        this.currentDayTab='Friday'
      }
      else if(index == 5){
        this.currentDayTab='Saturday'
      }
      else if(index == 6){
        this.currentDayTab='Sunday'
      }
      this.segmentSelected(this.currentDayTab, index)
      this.defaultDay = this.schedDays[index]

    })
  }

  async presentAlert(message) {
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
      // console.log('vibration...')
    };

    const alert = await this.alertCtrl.create({
      cssClass: '',
      backdropDismiss: false,
      header: 'You are at risk!',
      subHeader: 'Indoor air is '+ message + '.',
      message: 'It is not safe to inhale ' + message +' particles in the air. Open your windows now.',
      buttons: ['Okay'],
    });
    await alert.present();
    await hapticsVibrate();
  }

  async occupancyAlert() {
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
      // console.log('vibration...')
    };

    const alert = await this.alertCtrl.create({
      cssClass: '',
      backdropDismiss: true,
      header: 'HVAC Zoning',
      subHeader: 'Room is vacant',
      message: 'Your aircon automatically turned off because the room is vacant.',
      buttons: ['Okay'],
    });
    await alert.present();
    await hapticsVibrate();
  }




  

  async addAirconModal(){
    const modal = await this.modalCtrl.create({
      component: AddAirconModalPage,
      cssClass: 'small-modal',
    })
    await modal.present();
  }

  async editAirconModal(slidingItem, deviceId){
    const modal = await this.modalCtrl.create({
      component: EditAirconModalPage,
      cssClass: 'small-modal',
      componentProps:{
        deviceId: deviceId
      }
    })
    slidingItem.close()
    await modal.present();
  }


  async addSchedModal(){
    const modal = await this.modalCtrl.create({
      component: AddSchedModalPage,
      cssClass: 'small-modal',
    })
    await modal.present();
  }

  async editSchedModal(docId){
    const modal = await this.modalCtrl.create({
      component: EditSchedModalPage,
      cssClass: 'small-modal',
      componentProps:{
        schedId: docId
      }
    })
    await modal.present();
    console.log(docId)
  }

  async openMenuPopover(ev: any){
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: ev,
      cssClass: 'menuPopover'
    })
    await popover.present();
  }

  async airQualityInfoPop(ev: any){
    const modal = await this.modalCtrl.create({
      component: AirQualityInfoPopPage,
      cssClass: 'medium-modal',
      componentProps:{
        pm2_5: this.aqNum,
        pm10: this.aqNum10
      }
    })
    await modal.present();
  }

  addAircon(){
    console.log("add aircon");
  }

  rangeFocused(event){
    /* Getting the new value of the range slider. */
    var new_temp = event.detail.value
    
    if(new_temp && new_temp !=0){
      let prevTemp;
      let action;
      let change;
      prevTemp = this.current_temp;

      if(new_temp > prevTemp){
        change = new_temp - prevTemp;
        action = "TEMP_"+(this.current_temp + change);
      }
      else if(new_temp < prevTemp){
        change = prevTemp - new_temp;
        action = "TEMP_"+(this.current_temp - change);
      }
      this.current_temp = new_temp;
      
      if(!action) return;
      this.firebaseService.changeTemp(action)
      console.log(action)
    }
    
  }

  airconMode(value){
    console.log(value)
    this.firebaseService.changeMode(value)

  }

  switchPower(value){
    if(value == true){
      value = "PWR_OFF"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
    else if(value == false){
      value = "PWR_ON"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
  }

  setSwing(){
    this.firebaseService.setSwing('swing')
    
  }


}
