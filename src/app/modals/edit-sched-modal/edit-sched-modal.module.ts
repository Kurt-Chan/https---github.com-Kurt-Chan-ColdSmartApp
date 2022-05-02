import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSchedModalPageRoutingModule } from './edit-sched-modal-routing.module';

import { EditSchedModalPage } from './edit-sched-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditSchedModalPageRoutingModule
  ],
  declarations: [EditSchedModalPage]
})
export class EditSchedModalPageModule {}
