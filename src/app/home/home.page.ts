import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController } from '@ionic/angular';

import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectTabs = 'temperature';
  rangeVal: string;
  air_quality_message: string;
  aqNum: number;
  temp: any;
  humid: any;
  motionSens: number;
  carbonSens: number;
  current_temp: number = 24;

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

  public aircon: boolean = true;
  public fan: boolean = false;
  public eco: boolean = false;
  public auto: boolean = false;

  constructor(
    public platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private dataService: DataService,
    private angularFire: AngularFirestore
  ) {
    this.platform.ready().then(()=>{
      this.rangeVal = "24";
    })  
    
  }

  ngOnInit(){

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

      //temp and humidity
      let tempHumidRef = this.dataService.getTempAndHumidityStat()
      tempHumidRef.subscribe((result)=>{
        this.temp = result.temperature
        this.humid = result.humidity
        
        console.log('Temperature: ', this.temp)
        console.log('Humidity: ', this.humid)
        console.log('Last Updated: ', result.last_updated)
      })

      //motion sensor
      let motionSensRef = this.dataService.getMotionSensor()
      motionSensRef.subscribe((result)=>{
        this.motionSens = result.motion

        if (this.motionSens == 1){
          console.log("Room Occupied!")
        }
        else{
          console.log("Room Vacant!")
        }
      })

      //carbon sensor
      let carbonSensRef = this.dataService.getCarbonSensor()
      carbonSensRef.subscribe((result)=>{
        this.carbonSens = result.eco2
        console.log('ECO2: ', this.carbonSens)
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
        action = "TEMP_UP";
      }
      else if(new_temp < prevTemp){
        change = prevTemp - new_temp;
        action = "TEMP_DOWN";
      }
      for(let i = 1; i <= change; i++)
          console.log(action);

      this.current_temp = new_temp;
    }

    
  }




}
