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

/* Getting the current temperature setting from the database. */
    let acTemp = this.dataService.getCurrentAcSettings()
    acTemp.subscribe((result: any)=>{
      this.platform.ready().then(()=>{
        this.rangeVal = result.temp_setting;
      })  
    })
    
    
  }

  ngOnInit(){
    
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
      console.log(acPower)
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

      /* This is getting the temperature and humidity status from the database. */
      let tempHumidRef = this.dataService.getTempAndHumidityStat()
      tempHumidRef.subscribe((result)=>{
        this.temp = result.temperature
        this.humid = result.humidity
        
        console.log('Temperature: ', this.temp)
        console.log('Humidity: ', this.humid)
        console.log('Last Updated: ', result.last_updated)
      })

      /* This is getting the current weather from the database. */
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

  /**
   * It takes the value of the selected radio button and passes it to the firebase service
   * @param value - The value of the selected option.
   */
  airconMode(value){
    console.log(value)
    this.firebaseService.changeMode(value)

  }

 /**
  * The function takes in a value, and if the aircon is on, it will send the value "SWITCH_ON" to the
  * firebase database, and if the aircon is off, it will send the value "SWITCH_OFF" to the firebase
  * database
  * @param value - the value that will be sent to the firebase database
  */
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
  }




}
