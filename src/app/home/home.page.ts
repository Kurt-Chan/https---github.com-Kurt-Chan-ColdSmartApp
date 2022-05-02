import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AddSchedModalPage } from '../modals/add-sched-modal/add-sched-modal.page';
import { AddAirconModalPage } from '../modals/add-aircon-modal/add-aircon-modal.page';
import { EditSchedModalPage } from '../modals/edit-sched-modal/edit-sched-modal.page';
import { PopoverPage } from '../modals/popover/popover.page';
import { AirQualityInfoPopPage } from '../modals/air-quality-info-pop/air-quality-info-pop.page';
import { ModalController, PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectTabs = 'temperature';
  rangeVal: string;
  air_quality: string;
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
  ) {
    this.platform.ready().then(()=>{
      this.rangeVal = "24";
    })

    
      //air quality msgs
      let aqNum = 88; //this will be changed event

      if(aqNum >=0 && aqNum <=50){
        this.air_quality = "normal";
      }
      else if (aqNum >=51 && aqNum <=100){
        this.air_quality = "adequate";
      }
      else if (aqNum >=101 && aqNum <=150){
        this.air_quality = "unhealthy";
      }
      else if (aqNum >=151 && aqNum <=200){
        this.air_quality = "harmful";
      }
      else if (aqNum >=201 && aqNum <=300){
        this.air_quality = "toxic";
      }
      else if (aqNum >=301 && aqNum <=500){
        this.air_quality = "hazardous";
      }
  
    
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
