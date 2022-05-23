import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController } from '@ionic/angular';

import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service'
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectTabs = 'temperature';
  acMode: string;

  rangeVal: number;
  air_quality_message: string;

  aqNum: number;
  temp: any;
  humid: any;
  motionSens: number;
  carbonSens: number;

  current_temp: number = 24;
  aircon: boolean;

  city: string;
  weather: string;
  cityTemp: number;
  cityHumid: number;
   

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



  constructor(
    public platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private dataService: DataService,
    private firebaseService: FirebaseService
  ) {
    let acTemp = this.dataService.getCurrentAcSettings()
    acTemp.subscribe((result: any)=>{
      this.platform.ready().then(()=>{
        this.rangeVal = result.temp_setting;
      })  
    })
    
    
  }

  ngOnInit(){

    
    let switchRef = this.dataService.getCurrentAcSettings()
    switchRef.subscribe((result: any)=>{
      // this.acMode = result.mode
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




      let acPower = result.power //gets the current ac power(on/off)

      console.log(acPower)
      if(acPower == "ON"){
        this.aircon = true
      }
      else if(acPower == "OFF"){
        this.aircon = false
      }
    })

    //air Quality status
      
      let aqRef = this.dataService.getAirQualityStat()
      aqRef.subscribe((result)=>{

        this.aqNum = result.aqi2_5;
        var lastUpdate = result.last_updated;
        console.log("Air Quality: ", this.aqNum)
        console.log("Last updated: ", lastUpdate)

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

      //room temp and humidity
      let tempHumidRef = this.dataService.getTempAndHumidityStat()
      tempHumidRef.subscribe((result)=>{
        this.temp = result.temperature
        this.humid = result.humidity
        
        console.log('Temperature: ', this.temp)
        console.log('Humidity: ', this.humid)
        console.log('Last Updated: ', result.last_updated)
      })

      //weather forecast
      let weatherRef = this.dataService.getCurrentWeather()
      weatherRef.subscribe((result)=>{
        this.city = result.name + ", " + result.sys.country
        this.weather = result.weather[0].description
        this.cityTemp = Math.round(result.main.temp - 273.15)
        this.cityHumid = result.main.humidity

        console.log(this.city)
        console.log(this.weather)
        console.log(this.cityTemp)
        console.log(this.cityHumid)
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

  async editSchedModal(){
    const modal = await this.modalCtrl.create({
      component: EditSchedModalPage,
      cssClass: 'small-modal',
    })
    await modal.present();
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
    // console.log(event.detail.value)
    var new_temp = event.detail.value
    // console.log(event)
    
    if(new_temp !=0){
      let prevTemp;
      let action;
      let change;
      prevTemp = this.current_temp;

      // console.log('prev temp:',prevTemp);

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
    if(this.aircon == true){
      value = "SWITCH_ON"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
    else if(this.aircon == false){
      value = "SWITCH_OFF"
      console.log(value)
      this.firebaseService.switchPower(value)
    }
    // let switchRef = this.dataService.getCurrentPower()
    // switchRef.subscribe((result: any)=>{
    //   let acPower = result.power
    //   console.log(acPower)
      
    //   if(acPower == "ON"){
    //     value = "SWITCH_ON"
    //     this.aircon = true
    //     this.firebaseService.switchPower(value)
    //   }
    //   else if(acPower == "OFF"){
    //     value = "SWITCH_OFF"
    //     this.aircon = false
    //     this.firebaseService.switchPower(value)
    //   }
    // })


    // if(value == true){
    //   value = "SWITCH_ON"
    //   console.log(value)
    //   this.firebaseService.switchPower(value)
    // }
    // else if(value == false)
    // {
    //   value = "SWITCH_OFF"
    //   console.log(value)
    //   this.firebaseService.switchPower(value)
    // }
  }




}
