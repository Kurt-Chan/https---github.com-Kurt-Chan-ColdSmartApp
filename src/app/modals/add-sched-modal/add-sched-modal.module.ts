import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSchedModalPageRoutingModule } from './add-sched-modal-routing.module';

import { AddSchedModalPage } from './add-sched-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSchedModalPageRoutingModule
  ],
  declarations: [AddSchedModalPage]
})
export class AddSchedModalPageModule {}
