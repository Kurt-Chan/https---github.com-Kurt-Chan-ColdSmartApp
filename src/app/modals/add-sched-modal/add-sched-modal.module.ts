import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSchedModalPageRoutingModule } from './add-sched-modal-routing.module';

import { AddSchedModalPage } from './add-sched-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSchedModalPageRoutingModule
  ],
  declarations: [AddSchedModalPage]
})
export class AddSchedModalPageModule {}
