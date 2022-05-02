import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAirconModalPageRoutingModule } from './add-aircon-modal-routing.module';

import { AddAirconModalPage } from './add-aircon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAirconModalPageRoutingModule
  ],
  declarations: [AddAirconModalPage]
})
export class AddAirconModalPageModule {}
