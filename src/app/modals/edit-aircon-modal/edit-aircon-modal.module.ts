import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAirconModalPageRoutingModule } from './edit-aircon-modal-routing.module';

import { EditAirconModalPage } from './edit-aircon-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditAirconModalPageRoutingModule
  ],
  declarations: [EditAirconModalPage]
})
export class EditAirconModalPageModule {}
