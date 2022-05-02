import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirQualityInfoPopPageRoutingModule } from './air-quality-info-pop-routing.module';

import { AirQualityInfoPopPage } from './air-quality-info-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirQualityInfoPopPageRoutingModule
  ],
  declarations: [AirQualityInfoPopPage]
})
export class AirQualityInfoPopPageModule {}
