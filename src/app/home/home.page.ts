import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service'
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { format, parseISO } from 'date-fns';



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

  formattedTime: any;


  userSched:any[] = [];

  day_schedules = [];
   

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
    public loadingCtrl: LoadingController
  ) {

/* Getting the current temperature setting from the database. */
    let acTemp = this.dataService.getCurrentAcSettings()
    acTemp.subscribe((result: any)=>{
      this.platform.ready().then(()=>{
        this.rangeVal = result.temp_setting;
        this.current_temp = result.temp_setting;
      })  
    })

    this.defaultDay = this.schedDays[0];
    
  }

  ngOnInit(){
    
    /* This is getting the schedule from the database. */
    let schedRef = this.dataService.getSchedule()
      schedRef.subscribe((result: any)=>{
       this.userSched = result;

      })
  
    
    
    /* Getting the current AC settings from the database. */
    let switchRef = this.dataService.getCurrentAcSettings()
    switchRef.subscribe((result: any)=>{
      /* Getting the current AC mode from the database. */
      let acMode = result.mode 
      if(acMode == "COOL"){
        this.acMode = "MODE_COOL"
      }
      else if(acMode == "FAN"){
        this.acMode = "MODE_FAN"
      }
      else if(acMode == "ECO" || acMode == "AUTO"){
        this.acMode == "MODE_AUTO"
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
    })

      /* This is getting the air quality status from the database. */
      let aqRef = this.dataService.getAirQualityStat()
      aqRef.subscribe((result)=>{

        this.aqNum = result.aqi2_5;
        var lastUpdate = result.last_updated;

        if(this.aqNum >=0 && this.aqNum <=50){
          this.air_quality_message = "normal";
        }
        else if (this.aqNum >=51 && this.aqNum <=100){
          this.air_quality_message = "adequate";
        }
        else if (this.aqNum >=101 && this.aqNum <=150){
          this.air_quality_message = "unhealthy";
        }
        else if (this.aqNum >=151 && this.aqNum <=200){
          this.air_quality_message = "harmful";
        }
        else if (this.aqNum >=201 && this.aqNum <=300){
          this.air_quality_message = "toxic";
        }
        else if (this.aqNum >=301 && this.aqNum <=500){
          this.air_quality_message = "hazardous";
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
        this.weather = result.weather[0].description
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

  

  async addAirconModal(){
    const modal = await this.modalCtrl.create({
      component: AddAirconModalPage,
      cssClass: 'small-modal',
    })
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
      cssClass: 'medium-modal'
    })
    await modal.present();
  }

  addAircon(){
    console.log("add aircon");
  }

  rangeFocused(event){
    /* Getting the new value of the range slider. */
    var new_temp = event.detail.value
    
    if(new_temp !=0){
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
      console.log(action)
      this.firebaseService.changeTemp(action)
    }
    
  }

  airconMode(value){
    console.log(value)
    this.firebaseService.changeMode(value)

  }

  switchPower(value){
    if(value == true){
      value = "SWITCH_ON"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
    else if(value == false){
      value = "SWITCH_OFF"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
  }


}
